"use client";

import { FormEvent, useRef, useState } from "react";
import Image from "next/image";
import { calculateResult, DirectionKey, questions, resultMap } from "./quiz-data";

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
      quizAnswers: answers.map((answer, index) => ({ question: index + 1, answer })),
      source: "vortex-compass-quiz",
      submittedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL;
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
          <Image src="/brand/gaja-logo-forest.png" alt="Gaja Bohème" width={104} height={104} priority />
        </a>
        <span className="nav-mark" aria-hidden="true">✦</span>
      </nav>

      {step === "landing" && (
        <section className="hero screen">
          <div className="orb" aria-hidden="true"><span>✦</span></div>
          <p className="eyebrow">THE VORTEX COMPASS</p>
          <h1>What Is This Season<br />Asking of You?</h1>
          <p className="lede">A gentle nine-question reflection to reveal the direction calling for your attention right now.</p>
          <button className="primary-button" onClick={() => setStep("quiz")}>Begin the Compass <span>→</span></button>
          <p className="microcopy">Takes about 2 minutes</p>
        </section>
      )}

      {step === "quiz" && (
        <section className="quiz screen">
          <div className="progress-meta"><span>QUESTION {questionIndex + 1} OF {questions.length}</span><span>{Math.round(((questionIndex + 1) / questions.length) * 100)}%</span></div>
          <div className="progress"><span style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} /></div>
          <p className="eyebrow">LISTEN FOR WHAT FEELS TRUE</p>
          <h2>{questions[questionIndex].prompt}</h2>
          <div className="answers">
            {questions[questionIndex].options.map((item, index) => (
              <button key={item.direction} className="answer" onClick={() => answerQuestion(item.direction)}>
                <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
                <span>{item.label}</span><span className="answer-arrow">→</span>
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

      {step === "result" && result && <Result primaryKey={result.primary} supportingKey={result.supporting} firstName={firstName} />}
    </main>
  );
}

function Result({ primaryKey, supportingKey, firstName }: { primaryKey: DirectionKey; supportingKey: DirectionKey; firstName: string }) {
  const primary = resultMap[primaryKey];
  const supporting = resultMap[supportingKey];
  const experiencesUrl = process.env.NEXT_PUBLIC_EXPERIENCES_URL || "https://gajaboheme.com";

  return (
    <div className="result-page">
      <section className="result-hero screen">
        <p className="eyebrow">{firstName ? `${firstName.toUpperCase()}, YOUR` : "YOUR"} VORTEX COMPASS</p>
        <p className="result-intro">Your Compass is pointing toward…</p>
        <div className={`direction-symbol ${primaryKey}`} aria-hidden="true">✦</div>
        <h1>{primary.direction}</h1>
        <p className="archetype">{primary.archetype}</p>
        <p className="interpretation">{primary.interpretation}</p>
      </section>

      <section className="result-details content-width">
        <div>
          <p className="eyebrow">THREE SIGNS THIS MAY BE PRESENT</p>
          <ol>{primary.signs.map((sign) => <li key={sign}>{sign}</li>)}</ol>
        </div>
        <div className="practice">
          <p className="eyebrow">A SIMPLE PRACTICE</p>
          <p>{primary.practice}</p>
        </div>
        <p className="season-note">This is not a permanent label. It reflects what may be asking for your attention in this season.</p>
        {primary.guideAvailable ? (
          <a className="primary-button download" href={primary.pdf} download>Download My Full Compass Guide <span>↓</span></a>
        ) : process.env.NODE_ENV === "development" ? (
          <p className="guide-placeholder">Your full Compass guide will appear here when the final PDF is added.</p>
        ) : null}
      </section>

      <section className="supporting content-width">
        <p className="eyebrow">YOUR SUPPORTING DIRECTION</p>
        <h2>{supporting.direction}</h2>
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
