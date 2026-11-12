"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  blendStage,
  calculateResult,
  calculateStage,
  DirectionKey,
  questions,
  readings,
  resultMap,
  StageKey,
  stageMeta,
  stageQuestions,
} from "./quiz-data";
import { needsCrisisSupport, STORY_MAX_LENGTH } from "../lib/safety";
import ResultReveal from "../components/ResultReveal";
import CompassMark from "../components/CompassMark";

type Step = "landing" | "quiz" | "stage" | "story" | "capture" | "support" | "result";

type Session = {
  firstName?: string;
  email?: string;
  answers?: DirectionKey[];
  stageAnswers?: StageKey[];
  stage?: StageKey;
  personalLine?: string | null;
};

const SESSION_KEY = "vortexCompassSession";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<DirectionKey[]>([]);
  const [stageIndex, setStageIndex] = useState(0);
  const [stageAnswers, setStageAnswers] = useState<StageKey[]>([]);
  const [story, setStory] = useState("");
  const [finalStage, setFinalStage] = useState<StageKey | null>(null);
  const [personalLine, setPersonalLine] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitted = useRef(false);

  const result = answers.length === questions.length ? calculateResult(answers) : null;

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(SESSION_KEY);
        if (!saved) return;
        const session = JSON.parse(saved) as Session;
        if (session.answers?.length !== questions.length || !session.stage) return;
        setFirstName(session.firstName || "");
        setEmail(session.email || "");
        setAnswers(session.answers);
        setStageAnswers(session.stageAnswers || []);
        setFinalStage(session.stage);
        setPersonalLine(session.personalLine || null);
        setStep("result");
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  function scrollTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function startQuiz() {
    localStorage.removeItem("vortexResultRevealed");
    localStorage.removeItem(SESSION_KEY);
    submitted.current = false;
    setAnswers([]);
    setStageAnswers([]);
    setStory("");
    setFinalStage(null);
    setPersonalLine(null);
    setQuestionIndex(0);
    setStageIndex(0);
    setStep("quiz");
    scrollTop();
  }

  function answerQuestion(answer: DirectionKey) {
    setAnswers((current) => [...current, answer]);
    if (questionIndex === questions.length - 1) setStep("stage");
    else setQuestionIndex((index) => index + 1);
    scrollTop();
  }

  function answerStage(answer: StageKey) {
    setStageAnswers((current) => [...current, answer]);
    if (stageIndex === stageQuestions.length - 1) setStep("story");
    else setStageIndex((index) => index + 1);
    scrollTop();
  }

  function goBack() {
    if (step === "story") {
      setStageAnswers((current) => current.slice(0, -1));
      setStep("stage");
      return;
    }
    if (step === "stage") {
      if (stageIndex === 0) {
        setAnswers((current) => current.slice(0, -1));
        setStep("quiz");
        return;
      }
      setStageAnswers((current) => current.slice(0, -1));
      setStageIndex((index) => index - 1);
      return;
    }
    if (questionIndex === 0) {
      setStep("landing");
      return;
    }
    setAnswers((current) => current.slice(0, -1));
    setQuestionIndex((index) => index - 1);
  }

  function finishStory(skip: boolean) {
    if (skip) setStory("");
    setStep("capture");
    scrollTop();
  }

  /** Reads the optional story. Their words go to the reading only; they're never saved or sent to GoHighLevel. */
  async function readStory(direction: DirectionKey, answerStage: StageKey) {
    const text = story.trim();
    if (!text) return { crisis: false, stage: answerStage, personalLine: null as string | null };
    if (needsCrisisSupport(text)) return { crisis: true, stage: answerStage, personalLine: null };
    try {
      const response = await fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction, stage: answerStage, story: text }),
      });
      if (!response.ok) throw new Error("reading unavailable");
      const data = (await response.json()) as { crisis?: boolean; stage?: StageKey | null; personalLine?: string | null };
      return { crisis: Boolean(data.crisis), stage: blendStage(answerStage, data.stage), personalLine: data.personalLine || null };
    } catch {
      return { crisis: false, stage: answerStage, personalLine: null };
    }
  }

  async function revealResult(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result || submitted.current) return;
    submitted.current = true;
    setIsSubmitting(true);

    const answerStage = calculateStage(stageAnswers);
    const reading = await readStory(result.primary, answerStage);
    setFinalStage(reading.stage);
    setPersonalLine(reading.personalLine);
    setStory("");

    const primary = resultMap[result.primary];
    const supporting = resultMap[result.supporting];
    const stage = stageMeta[reading.stage];
    const payload = {
      firstName,
      email,
      primaryDirection: primary.direction,
      primaryArchetype: primary.archetype,
      primaryResult: `${primary.direction} | ${primary.archetype}`,
      primaryStage: stage.latin,
      primaryStageName: stage.plain,
      fullReading: `${primary.archetype} | ${stage.plain} (${stage.latin})`,
      supportingDirection: supporting.direction,
      supportingArchetype: supporting.archetype,
      quizAnswers: answers.map((answer, index) => ({ question: index + 1, answer })),
      stageAnswers: stageAnswers.map((answer, index) => ({ question: index + 1, answer })),
      source: "vortex-compass-quiz",
      submittedAt: new Date().toISOString(),
    };

    const session: Session = { firstName, email, answers, stageAnswers, stage: reading.stage, personalLine: reading.personalLine };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));

    const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      } catch (error) {
        if (process.env.NODE_ENV === "development") console.info("Vortex Compass webhook could not be reached.", error);
      }
    } else {
      localStorage.setItem("vortexCompassResult", JSON.stringify(payload));
      if (process.env.NODE_ENV === "development") console.info("Vortex Compass: webhook is not configured; result saved locally.");
    }

    setIsSubmitting(false);
    setStep(reading.crisis ? "support" : "result");
    scrollTop();
  }

  const totalSteps = questions.length + stageQuestions.length;
  const currentStep = step === "stage" ? questions.length + stageIndex + 1 : questionIndex + 1;
  const isVisual = step === "quiz" && questions[questionIndex].options.some((item) => item.image);

  return (
    <main>
      <nav className="nav" aria-label="Main navigation">
        <a className="brand-link" href="https://gajaboheme.com" aria-label="Visit the Gaja Bohème website">
          <Image src="/brand/gaja-logo-forest.png" alt="Gaja Bohème" width={104} height={104} style={{ width: "auto", height: "100%" }} priority />
        </a>
        <span className="nav-mark" aria-hidden="true">✦</span>
      </nav>

      {step === "landing" && (
        <section className="hero screen">
          <CompassMark className="hero-compass" />
          <p className="eyebrow">THE VORTEX COMPASS</p>
          <h1>What Is This Season<br />Asking of You?</h1>
          <p className="lede">A gentle reflection to show you which Alchemist you&apos;re working with right now, and how far that work has already moved.</p>
          <button className="primary-button" onClick={startQuiz}>Begin the Compass <span>→</span></button>
          <p className="microcopy">Twelve questions · About 3 minutes</p>
        </section>
      )}

      {(step === "quiz" || step === "stage") && (
        <section className={`quiz screen ${isVisual ? "visual-question" : ""}`}>
          <div className="progress-meta"><span>QUESTION {currentStep} OF {totalSteps}</span><span>{Math.round((currentStep / totalSteps) * 100)}%</span></div>
          <div className="progress"><span style={{ width: `${(currentStep / totalSteps) * 100}%` }} /></div>

          {step === "quiz" ? (
            <>
              <p className="eyebrow">LISTEN FOR WHAT FEELS TRUE</p>
              <h2>{questions[questionIndex].prompt}</h2>
              <div className={`answers ${isVisual ? "visual-answers" : ""}`}>
                {questions[questionIndex].options.map((item, index) => (
                  <button
                    key={item.direction}
                    className={`answer ${item.image ? "image-answer" : ""}`}
                    aria-label={item.image ? `Image ${String.fromCharCode(65 + index)}: ${item.label}` : undefined}
                    onClick={() => answerQuestion(item.direction)}
                  >
                    {item.image ? (
                      <>
                        <Image className="answer-image" src={item.image} alt="" width={480} height={480} />
                        <span className="image-letter" aria-hidden="true">{String.fromCharCode(65 + index)}</span>
                      </>
                    ) : (
                      <>
                        <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                        <span>{item.label}</span><span className="answer-arrow">→</span>
                      </>
                    )}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <>
              <p className="eyebrow">NOW, HOW FAR ALONG IT IS</p>
              <h2>{stageQuestions[stageIndex].prompt}</h2>
              <div className="answers">
                {stageQuestions[stageIndex].options.map((item, index) => (
                  <button key={item.stage} className="answer" onClick={() => answerStage(item.stage)}>
                    <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                    <span>{item.label}</span><span className="answer-arrow">→</span>
                  </button>
                ))}
              </div>
            </>
          )}
          <button className="back" onClick={goBack}>← Back</button>
        </section>
      )}

      {step === "story" && (
        <section className="story screen">
          <div className="small-orb" aria-hidden="true">✦</div>
          <p className="eyebrow">ONLY IF YOU WANT TO</p>
          <h2>What&apos;s going on in your life right now?</h2>
          <p className="lede">A few words is plenty. It helps your reading speak to your real life. Your words aren&apos;t saved anywhere.</p>
          <label className="story-field">
            <span className="visually-hidden">What&apos;s going on in your life right now</span>
            <textarea
              value={story}
              maxLength={STORY_MAX_LENGTH}
              onChange={(event) => setStory(event.target.value)}
              placeholder="I've been feeling…"
              rows={5}
            />
          </label>
          <div className="story-actions">
            <button className="primary-button" onClick={() => finishStory(false)} disabled={!story.trim()}>Continue <span>→</span></button>
            <button className="text-button" onClick={() => finishStory(true)}>Skip this step</button>
          </div>
          <button className="back" onClick={goBack}>← Back</button>
        </section>
      )}

      {step === "capture" && (
        <section className="capture screen">
          <div className="small-orb" aria-hidden="true">✦</div>
          <p className="eyebrow">YOUR READING IS READY</p>
          <h2>Find Out Where You Are</h2>
          <p className="lede">Enter your details to see your Alchemist, your stage and your next step.</p>
          <form onSubmit={revealResult}>
            <label>First name<input required autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Your first name" /></label>
            <label>Email address<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label>
            <label className="consent"><input required type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /><span>I agree to receive my result and occasional emails from Gaja Bohème. I can unsubscribe at any time.</span></label>
            <button className="primary-button full" disabled={isSubmitting}>{isSubmitting ? "Reading your Compass…" : "Reveal My Reading"} <span>→</span></button>
          </form>
        </section>
      )}

      {step === "support" && (
        <section className="support screen">
          <p className="eyebrow">BEFORE YOUR READING</p>
          <h2>Thank you for telling me.</h2>
          <p className="lede">What you shared sounds really heavy. Your reading can wait. You matter more than any result.</p>
          <p className="lede">If you&apos;re thinking about ending your life or hurting yourself, please reach out to someone right now. You don&apos;t have to carry this alone.</p>
          <ul className="support-list">
            <li><strong>Call or text 988</strong> to reach the Suicide &amp; Crisis Lifeline (US)</li>
            <li><strong>Text HOME to 741741</strong> to reach the Crisis Text Line (US)</li>
            <li><strong>Call 911</strong> if you&apos;re in danger right now</li>
            <li>Outside the US, <a href="https://findahelpline.com" target="_blank" rel="noreferrer">findahelpline.com</a> lists free support near you</li>
          </ul>
          <button className="text-button" onClick={() => { setStep("result"); scrollTop(); }}>Continue to my reading when you&apos;re ready</button>
        </section>
      )}

      {step === "result" && result && finalStage && (
        <Result
          primaryKey={result.primary}
          supportingKey={result.supporting}
          stageKey={finalStage}
          personalLine={personalLine}
          firstName={firstName}
          onRetake={startQuiz}
        />
      )}
    </main>
  );
}

type ResultProps = {
  primaryKey: DirectionKey;
  supportingKey: DirectionKey;
  stageKey: StageKey;
  personalLine: string | null;
  firstName: string;
  onRetake: () => void;
};

function Result({ primaryKey, supportingKey, stageKey, personalLine, firstName, onRetake }: ResultProps) {
  const primary = resultMap[primaryKey];
  const supporting = resultMap[supportingKey];
  const stage = stageMeta[stageKey];
  const reading = readings[primaryKey][stageKey];
  const [exportMessage, setExportMessage] = useState("");
  const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || process.env.NEXT_PUBLIC_EXPERIENCES_URL || "https://gajaboheme.com/experiences";
  const shareText = `${primary.archetype}\n${stage.plain} · ${stage.latin}\n${reading.opening[0]}`;

  async function shareResult() {
    try {
      if (navigator.share) await navigator.share({ title: "My Vortex Compass", text: shareText });
      else {
        await navigator.clipboard.writeText(shareText);
        setExportMessage("Your result has been copied.");
      }
    } catch {
      /* the person closed the share sheet */
    }
  }

  async function downloadShareImage() {
    await document.fonts.ready;
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "#F5F1EA";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#BB9E51";
    context.lineWidth = 2;
    context.strokeRect(48, 48, 984, 1254);

    const plate = new window.Image();
    plate.src = primary.plate;
    await new Promise((resolve) => { plate.onload = resolve; plate.onerror = resolve; });
    if (plate.complete && plate.naturalWidth) context.drawImage(plate, 370, 120, 340, 340);

    context.textAlign = "center";
    context.fillStyle = "#601010";
    context.font = "600 24px Cinzel, serif";
    context.fillText(primary.direction.toUpperCase(), 540, 540);
    context.font = "64px 'IM Fell English', Georgia, serif";
    context.fillText(primary.archetype, 540, 630);

    context.fillStyle = stage.color;
    context.fillRect(340, 680, 400, 88);
    context.strokeStyle = "#BB9E51";
    context.strokeRect(340, 680, 400, 88);
    context.fillStyle = stage.ink;
    context.font = "40px 'IM Fell English', Georgia, serif";
    context.fillText(stage.plain, 540, 728);
    context.font = "600 16px Cinzel, serif";
    context.fillText(stage.latin.toUpperCase(), 540, 754);

    context.font = "italic 42px 'Cormorant Garamond', Georgia, serif";
    context.fillStyle = "#3A332F";
    const words = reading.opening[0].split(" ");
    const lines: string[] = [];
    let line = "";
    for (const word of words) {
      const candidate = line ? `${line} ${word}` : word;
      if (context.measureText(candidate).width > 820 && line) {
        lines.push(line);
        line = word;
      } else line = candidate;
    }
    if (line) lines.push(line);
    lines.forEach((text, index) => context.fillText(text, 540, 880 + index * 56));

    context.fillStyle = "#601010";
    context.font = "600 22px Cinzel, serif";
    context.fillText("GAJA BOHÈME · THE VORTEX COMPASS", 540, 1200);
    context.fillStyle = "#3A332F";
    context.font = "400 22px Montserrat, sans-serif";
    context.fillText("compass.gajaboheme.com", 540, 1245);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `vortex-compass-${primaryKey}-${stageKey}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setExportMessage("Your image has been downloaded.");
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  }

  return (
    <div className="result-page">
      <ResultReveal resultKey={primaryKey} result={primary} stage={stage} firstName={firstName} />

      <section id="full-reading" className="reading content-width" style={{ ["--stage" as string]: stage.color }}>
        <Image className="reading-plate" src={primary.plate} alt={`Engraving for ${primary.archetype}`} width={240} height={240} />

        <div className="reading-opening">
          <p className="opening-line">{reading.opening[0]}</p>
          <p>{reading.opening[1]}</p>
          {personalLine && <p className="personal-line">{personalLine}</p>}
        </div>

        <ReadingStep label="Here's where you are" text={reading.whereYouAre} />
        <ReadingStep label="Here's what's really happening" text={reading.happening} />
        <ReadingStep label="Meet your Alchemist" text={reading.alchemist} />
        <ReadingStep label="Your next step" text={reading.nextStep} highlight />
        <ReadingStep label="Where this is going" text={reading.goingTo} />

        <blockquote className="reflection">
          <p className="eyebrow">SIT WITH THIS</p>
          <p>{reading.sitWith}</p>
        </blockquote>

        <p className="closing-line">You might come back to this place someday, with something new. That isn&apos;t going backwards. That&apos;s how the work moves.</p>

        {primary.guideAvailable ? (
          <a className="text-button download" href={primary.pdf} download>Download your full Compass guide ↓</a>
        ) : process.env.NODE_ENV === "development" ? (
          <p className="guide-placeholder">Your full Compass guide will appear here when the final PDF is added.</p>
        ) : null}

        <div className="result-actions">
          <button className="text-button" onClick={shareResult}>Share my result</button>
          <button className="text-button" onClick={downloadShareImage}>Download image</button>
          <button className="text-button" onClick={() => window.print()}>Save as PDF</button>
          <button className="text-button" onClick={onRetake}>Retake the Compass</button>
        </div>
        {exportMessage && <p className="export-message" role="status">{exportMessage}</p>}
      </section>

      <section className="supporting content-width">
        <p className="eyebrow">ALSO WORKING IN THE BACKGROUND</p>
        <h2>{supporting.archetype}</h2>
        <p className="supporting-archetype">{supporting.direction}</p>
        <p>{supporting.supporting}</p>
      </section>

      <section className="final-cta">
        <p className="eyebrow">YOU DON&apos;T HAVE TO WALK THIS ALONE</p>
        <h2>If you&apos;d like company while you walk through this, I&apos;d love to sit with you.</h2>
        <a className="light-button" href={bookingUrl}>Book a Session <span>→</span></a>
        <p className="method-note">The Vortex uses the four alchemical colors as a modern map for change. The old texts never agreed on one fixed order, and your life won&apos;t follow one either.</p>
      </section>
    </div>
  );
}

function ReadingStep({ label, text, highlight = false }: { label: string; text: string; highlight?: boolean }) {
  return (
    <article className={`reading-step ${highlight ? "is-highlight" : ""}`}>
      <p className="eyebrow">{label.toUpperCase()}</p>
      <p>{text}</p>
    </article>
  );
}
