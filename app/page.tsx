"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { calculateResult, DirectionKey, questions, resultMap } from "./quiz-data";
import ResultReveal from "../components/ResultReveal";

type Step = "landing" | "quiz" | "capture" | "result";

export default function Home() {
  const [step, setStep] = useState<Step>("landing");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<DirectionKey[]>([]);
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const submitted = useRef(false);

  const result = answers.length === questions.length ? calculateResult(answers) : null;

  useEffect(() => {
    const restore = window.setTimeout(() => {
      try {
        const saved = localStorage.getItem("vortexCompassSession");
        if (!saved) return;
        const session = JSON.parse(saved) as { firstName?: string; email?: string; answers?: DirectionKey[] };
        if (session.answers?.length !== questions.length) return;
        setFirstName(session.firstName || "");
        setEmail(session.email || "");
        setAnswers(session.answers);
        setStep("result");
      } catch {
        localStorage.removeItem("vortexCompassSession");
      }
    }, 0);
    return () => window.clearTimeout(restore);
  }, []);

  function startQuiz() {
    localStorage.removeItem("vortexResultRevealed");
    localStorage.removeItem("vortexCompassSession");
    setAnswers([]);
    setQuestionIndex(0);
    setStep("quiz");
  }

  function answerQuestion(answer: DirectionKey) {
    const next = [...answers, answer];
    setAnswers(next);
    if (questionIndex === questions.length - 1) setStep("capture");
    else setQuestionIndex((index) => index + 1);
  }

  function goBack() {
    if (questionIndex === 0) {
      setStep("landing");
      return;
    }
    setAnswers((current) => current.slice(0, -1));
    setQuestionIndex((index) => index - 1);
  }

  async function revealResult(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!result || submitted.current) return;
    submitted.current = true;
    setIsSubmitting(true);

    const primary = resultMap[result.primary];
    const supporting = resultMap[result.supporting];
    const payload = {
      firstName,
      email,
      primaryDirection: primary.direction,
      primaryArchetype: primary.archetype,
      primaryResult: `${primary.direction} | ${primary.archetype}`,
      supportingDirection: supporting.direction,
      supportingArchetype: supporting.archetype,
      quizAnswers: answers.map((answer, index) => ({ question: index + 1, answer })),
      source: "vortex-compass-quiz",
      submittedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
    localStorage.setItem("vortexCompassSession", JSON.stringify({ firstName, email, answers }));
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        if (process.env.NODE_ENV === "development") console.info("Vortex Compass webhook could not be reached.", error);
      }
    } else {
      localStorage.setItem("vortexCompassResult", JSON.stringify(payload));
      if (process.env.NODE_ENV === "development") console.info("Vortex Compass: webhook is not configured; result saved locally.");
    }

    setIsSubmitting(false);
    setStep("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

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
          <div className="hero-compass" role="img" aria-label="A decorative Vortex Compass">
            <svg viewBox="0 0 220 220" aria-hidden="true">
              <circle className="hero-compass-outer" cx="110" cy="110" r="94" />
              <circle className="hero-compass-ring" cx="110" cy="110" r="75" />
              <path className="hero-compass-cross" d="M110 25v170M25 110h170" />
              <text x="110" y="45">N</text>
              <text x="178" y="115">E</text>
              <text x="110" y="183">S</text>
              <text x="42" y="115">W</text>
              <g className="hero-compass-needle">
                <path d="M110 48l10 62h-20z" />
                <path className="hero-needle-tail" d="M110 172l-8-62h16z" />
              </g>
              <circle className="hero-compass-center" cx="110" cy="110" r="11" />
              <circle className="hero-compass-pin" cx="110" cy="110" r="4" />
            </svg>
          </div>
          <p className="eyebrow">THE VORTEX COMPASS</p>
          <h1>What Is This Season<br />Asking of You?</h1>
          <p className="lede">A gentle nine-question reflection to reveal the direction calling for your attention right now.</p>
          <button className="primary-button" onClick={startQuiz}>Begin the Compass <span>→</span></button>
          <p className="microcopy">Takes about 2 minutes</p>
        </section>
      )}

      {step === "quiz" && (
        <section className={`quiz screen ${questions[questionIndex].options.some((item) => item.image) ? "visual-question" : ""}`}>
          <div className="progress-meta"><span>QUESTION {questionIndex + 1} OF {questions.length}</span><span>{Math.round(((questionIndex + 1) / questions.length) * 100)}%</span></div>
          <div className="progress"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
          <p className="eyebrow">LISTEN FOR WHAT FEELS TRUE</p>
          <h2>{questions[questionIndex].prompt}</h2>
          <div className={`answers ${questions[questionIndex].options.some((item) => item.image) ? "visual-answers" : ""}`}>
            {questions[questionIndex].options.map((item, index) => (
              <button
                key={item.direction}
                className={`answer ${item.image ? "image-answer" : ""}`}
                aria-label={item.image ? `Choose image ${String.fromCharCode(65 + index)}` : undefined}
                onClick={() => answerQuestion(item.direction)}
              >
                {item.image ? (
                  <>
                    <Image className="answer-image" src={item.image} alt="" width={480} height={320} />
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
          <button className="back" onClick={goBack}>← Back</button>
        </section>
      )}

      {step === "capture" && (
        <section className="capture screen">
          <div className="small-orb" aria-hidden="true">✦</div>
          <p className="eyebrow">YOUR COMPASS RESULT IS READY</p>
          <h2>Discover What This Season Is Asking of You</h2>
          <p className="lede">Enter your details to reveal your Vortex direction and download your personalized guide.</p>
          <form onSubmit={revealResult}>
            <label>First name<input required autoComplete="given-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Your first name" /></label>
            <label>Email address<input required type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" /></label>
            <label className="consent"><input required type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} /><span>I agree to receive my result and occasional emails from Gaja Bohème. I can unsubscribe at any time.</span></label>
            <button className="primary-button full" disabled={isSubmitting}>{isSubmitting ? "Revealing…" : "Reveal My Direction"} <span>→</span></button>
          </form>
        </section>
      )}

      {step === "result" && result && <Result primaryKey={result.primary} supportingKey={result.supporting} firstName={firstName} onRetake={startQuiz} />}
    </main>
  );
}

function Result({ primaryKey, supportingKey, firstName, onRetake }: { primaryKey: DirectionKey; supportingKey: DirectionKey; firstName: string; onRetake: () => void }) {
  const primary = resultMap[primaryKey];
  const supporting = resultMap[supportingKey];
  const [exportMessage, setExportMessage] = useState("");
  const experiencesUrl = process.env.NEXT_PUBLIC_EXPERIENCES_URL || "https://gajaboheme.com/services";

  async function shareResult() {
    if (navigator.share) {
      await navigator.share({ title: "My Vortex Compass", text: primary.shareText });
    } else {
      await navigator.clipboard.writeText(primary.shareText);
    }
  }

  async function downloadShareImage() {
    await document.fonts.ready;
    const canvas = document.createElement("canvas");
    canvas.width = 1080;
    canvas.height = 1350;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.fillStyle = "#F3EBDD";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = "#672F3C";
    context.lineWidth = 3;
    context.beginPath();
    context.arc(540, 315, 165, 0, Math.PI * 2);
    context.stroke();
    context.beginPath();
    context.arc(540, 315, 122, 0, Math.PI * 2);
    context.strokeStyle = "#DCCDBB";
    context.stroke();
    context.fillStyle = "#B8654A";
    context.beginPath();
    context.arc(540, 315, 18, 0, Math.PI * 2);
    context.fill();

    context.textAlign = "center";
    context.fillStyle = "#672F3C";
    context.font = "600 24px Montserrat, sans-serif";
    context.fillText("MY VORTEX DIRECTION", 540, 555);
    context.fillStyle = "#263A35";
    context.font = "500 86px 'Cormorant Garamond', Georgia, serif";
    context.fillText(primary.direction, 540, 650);
    context.fillStyle = "#672F3C";
    context.font = "600 24px Montserrat, sans-serif";
    context.fillText("MY CURRENT ARCHETYPE", 540, 735);
    context.fillStyle = "#302925";
    context.font = "500 55px 'Cormorant Garamond', Georgia, serif";
    context.fillText(primary.archetype, 540, 815);

    const shareLine = primary.shareText.split("\n")[2];
    context.font = "italic 40px 'Cormorant Garamond', Georgia, serif";
    context.fillStyle = "#302925";
    const words = shareLine.split(" ");
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
    lines.forEach((text, index) => context.fillText(text, 540, 940 + index * 54));

    context.strokeStyle = "#DCCDBB";
    context.beginPath();
    context.moveTo(210, 1135);
    context.lineTo(870, 1135);
    context.stroke();
    context.fillStyle = "#672F3C";
    context.font = "600 25px Montserrat, sans-serif";
    context.fillText("GAJA BOHÈME · THE VORTEX COMPASS", 540, 1210);
    context.fillStyle = "#73745A";
    context.font = "400 22px Montserrat, sans-serif";
    context.fillText("gajaboheme.com", 540, 1260);

    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `vortex-compass-${primaryKey}.png`;
      document.body.appendChild(link);
      link.click();
      link.remove();
      setExportMessage("Your social image has been downloaded.");
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    }, "image/png");
  }

  return (
    <div className="result-page">
      <ResultReveal resultKey={primaryKey} result={primary} firstName={firstName} />

      <section id="full-reading" className="result-details content-width">
        <article className="editorial-section editorial-opening">
          <p className="eyebrow">WHY YOU MAY HAVE RECEIVED THIS RESULT</p>
          <p>{primary.why}</p>
        </article>
        <article className="editorial-section">
          <p className="eyebrow">YOU MAY NOTICE</p>
          <ol>{primary.signs.map((sign) => <li key={sign}>{sign}</li>)}</ol>
        </article>
        <article className="editorial-section practice">
          <p className="eyebrow">YOUR STRENGTHS</p>
          <p>{primary.gift}</p>
        </article>
        <article className="editorial-section">
          <p className="eyebrow">WHAT CAN GET IN THE WAY</p>
          <p>{primary.overextended}</p>
        </article>
        <article className="editorial-section">
          <p className="eyebrow">WHAT THIS SEASON MAY BE ASKING OF YOU</p>
          <p>{primary.invitation}</p>
        </article>
        <article className="editorial-section practices-list">
          <p className="eyebrow">TRY THIS THIS WEEK</p>
          <ol>{primary.practices.map((practice) => <li key={practice}>{practice}</li>)}</ol>
        </article>
        <blockquote className="reflection">
          <p className="eyebrow">A QUESTION TO REFLECT ON</p>
          <p>“{primary.reflection}”</p>
        </blockquote>
        <p className="season-note">This is not a permanent identity. It reflects what may need your attention right now. As your life and needs change, your Compass may point somewhere new.</p>
        <div className="guide-heading">
          <p className="eyebrow">YOUR FULL COMPASS GUIDE</p>
          <p>Your guide for {primary.direction} and {primary.archetype} offers a deeper reading and practices for this season.</p>
        </div>
        {primary.guideAvailable ? (
          <a className="primary-button download" href={primary.pdf} download>Download My Full Compass Guide <span>↓</span></a>
        ) : process.env.NODE_ENV === "development" ? (
          <p className="guide-placeholder">Your full Compass guide will appear here when the final PDF is added.</p>
        ) : null}
        <div className="result-actions">
          <button className="text-button" onClick={shareResult}>Share My Result</button>
          <button className="text-button" onClick={downloadShareImage}>Download Social Image</button>
          <button className="text-button" onClick={() => window.print()}>Save Result as PDF</button>
          <button className="text-button" onClick={onRetake}>Retake the Compass</button>
        </div>
        {exportMessage && <p className="export-message" role="status">{exportMessage}</p>}
      </section>

      <section className="supporting content-width">
        <p className="eyebrow">YOUR SUPPORTING DIRECTION</p>
        <h2>{supporting.direction}</h2>
        <p className="supporting-archetype">{supporting.archetype}</p>
        <p>{supporting.supporting}</p>
      </section>

      <section className="final-cta">
        <p className="eyebrow">THE JOURNEY CONTINUES</p>
        <h2>Continue Your Journey<br />With Gaja Bohème</h2>
        <p>Your Compass result offers a place to begin. Gaja Bohème experiences are designed to help you slow down, reconnect with your body, and receive the kind of care your current season is asking for.</p>
        <a className="light-button" href={experiencesUrl}>Explore the Experiences <span>→</span></a>
      </section>
    </div>
  );
}
