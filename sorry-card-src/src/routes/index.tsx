import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import bearSorry from "@/assets/bear-sorry.png";
import bearCrying from "@/assets/bear-crying.png";
import bearsCouple from "@/assets/bears-couple.png";
import bearHappy from "@/assets/bear-happy.png";
import { sorryCardConfig as copy } from "@/config";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `A Sorry Card for ${copy.recipient}` },
      { name: "description", content: `A heartfelt apology from ${copy.sender} to ${copy.recipient}.` },
      { property: "og:title", content: `A Sorry Card for ${copy.recipient}` },
      { property: "og:description", content: `A heartfelt apology from ${copy.sender} to ${copy.recipient}.` },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SorryCard,
});

const TOTAL_STEPS = 10;
const fill = (text: string) => text.replace("{recipient}", copy.recipient).replace("{sender}", copy.sender);

function AppButton({ children, onClick, secondary = false, className = "" }: { children: React.ReactNode; onClick: () => void; secondary?: boolean; className?: string }) {
  return <button type="button" onClick={onClick} className={`${secondary ? "border border-border bg-card text-muted-foreground" : "primary-shadow bg-primary text-primary-foreground"} inline-flex min-h-13 items-center justify-center rounded-full px-7 text-[15px] font-semibold transition-transform active:scale-95 ${className}`}>{children}</button>;
}

function Hearts() {
  const hearts = ["🩷", "❤️", "💕", "💗", "🤍", "💞"];
  return <div aria-hidden="true" className="absolute inset-0 overflow-hidden">{hearts.map((heart, index) => <span key={index} className="floating-heart text-sm" style={{ left: `${8 + index * 17}%`, animationDuration: `${8 + index * 1.2}s`, animationDelay: `${-index * 1.8}s` }}>{heart}</span>)}</div>;
}

function Progress({ step }: { step: number }) {
  return <div aria-label={`Step ${step + 1} of ${TOTAL_STEPS}`} className="absolute top-5 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">{Array.from({ length: TOTAL_STEPS }, (_, i) => <span key={i} className={`progress-dot ${i === step ? "active" : ""}`} />)}</div>;
}

function Bear({ src, alt, eager = false, className = "" }: { src: string; alt: string; eager?: boolean; className?: string }) {
  return <img src={src} alt={alt} width={816} height={816} loading={eager ? "eager" : "lazy"} className={`aspect-square rounded-full object-cover ${className}`} />;
}

function Navigation({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return <div className="flex items-center justify-center gap-3"><AppButton secondary onClick={onBack}>{copy.navigation.back}</AppButton><AppButton onClick={onNext}>{copy.navigation.next}</AppButton></div>;
}

function SorryCard() {
  const [step, setStep] = useState(0);
  const [envelopeOpen, setEnvelopeOpen] = useState(false);
  const [forgiveness, setForgiveness] = useState(0);
  const [finalAnswer, setFinalAnswer] = useState<"yes" | "no" | null>(null);
  const [confetti, setConfetti] = useState(false);

  const go = (next: number) => { setStep(Math.max(0, Math.min(TOTAL_STEPS - 1, next))); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const openEnvelope = () => { if (envelopeOpen) return; setEnvelopeOpen(true); window.setTimeout(() => go(5), 780); };
  const tapHeart = () => {
    const next = Math.min(100, forgiveness + 14);
    setForgiveness(next);
    if (next === 100) { setConfetti(true); window.setTimeout(() => { setConfetti(false); go(7); }, 1500); }
  };

  useEffect(() => { if (step !== 4) setEnvelopeOpen(false); }, [step]);

  const content = useMemo(() => {
    if (step === 0) return <Intro onNext={() => go(1)} />;
    if (step >= 1 && step <= 3) return <MessageSlide index={step - 1} onBack={() => go(step - 1)} onNext={() => go(step + 1)} />;
    if (step === 4) return <Envelope open={envelopeOpen} onOpen={openEnvelope} onBack={() => go(3)} />;
    if (step === 5) return <Letter onBack={() => go(4)} onNext={() => go(6)} />;
    if (step === 6) return <ForgivenessMeter value={forgiveness} onTap={tapHeart} onBack={() => go(5)} />;
    if (step === 7) return <Gifts onBack={() => go(6)} onNext={() => go(8)} />;
    if (step === 8) return <Celebration onBack={() => go(7)} onNext={() => go(9)} />;
    return <FinalQuestion answer={finalAnswer} onAnswer={setFinalAnswer} onBack={() => go(8)} />;
  }, [step, envelopeOpen, forgiveness, finalAnswer]);

  return <main className="sorry-shell"><section className="sorry-phone dot-bg"><Progress step={step} />{confetti && <Confetti />}{content}</section></main>;
}

function Intro({ onNext }: { onNext: () => void }) {
  return <div className="screen-enter relative flex min-h-svh flex-col items-center justify-center px-6 text-center"><Hearts /><div className="relative z-10 w-full"><div className="relative mx-auto w-42"><Bear src={bearSorry} alt="A sad teddy bear asking for forgiveness" eager className="bear-float border-3 border-primary/25" /><span className="absolute -bottom-1 left-1/2 w-max max-w-60 -translate-x-1/2 rounded-md bg-foreground px-3 py-1 text-[10px] font-semibold text-primary-foreground">{copy.intro.imageLabel}</span></div><h1 className="script mt-10 text-[38px] leading-tight text-foreground">{fill(copy.intro.title)}</h1><p className="mt-3 text-[15px] leading-6 text-muted-foreground">{copy.intro.lines.map(line => <span key={line} className="block">{line}</span>)}</p><AppButton onClick={onNext} className="pulse-soft mt-8 w-full max-w-70 text-[16px]">{copy.intro.button}</AppButton></div></div>;
}

function MessageSlide({ index, onBack, onNext }: { index: number; onBack: () => void; onNext: () => void }) {
  const images = [bearCrying, bearsCouple, bearSorry];
  const slide = copy.slides[index];
  const image = images[index];
  if (!slide || !image) return null;
  return <div className="screen-enter relative flex min-h-svh flex-col items-center justify-end text-center"><Hearts /><div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 pt-16"><Bear src={image} alt={slide.title} className="bear-float w-38 border-3 border-primary/25" /><h2 className="script mt-6 text-[39px] leading-tight text-rose-deep">{slide.title}</h2></div><div className="soft-panel relative z-10 w-full px-6 pt-9 pb-7 before:absolute before:top-3 before:left-1/2 before:h-1 before:w-10 before:-translate-x-1/2 before:rounded-full before:bg-primary/50"><p className="mx-auto mb-5 max-w-78 text-[15px] leading-7 font-semibold text-rose-deep">{slide.message}</p><Navigation onBack={onBack} onNext={onNext} /></div></div>;
}

function Envelope({ open, onOpen, onBack }: { open: boolean; onOpen: () => void; onBack: () => void }) {
  return <div className="screen-enter relative flex min-h-svh flex-col items-center justify-center text-center"><Hearts /><button type="button" onClick={onBack} className="absolute top-5 left-4 z-20 text-sm font-semibold text-rose">{copy.navigation.back}</button><div className="relative z-10"><p className="mb-5 text-xs font-semibold tracking-[.2em] text-rose">{copy.envelope.heading}</p><button type="button" aria-label="Open the letter" onClick={onOpen} className={`envelope ${open ? "open" : ""}`}><span className="envelope-body"><span className="absolute top-18 left-1/2 z-10 -translate-x-1/2 text-3xl">🐻💕</span></span><span className="envelope-flap" /></button><p className="pulse-soft mt-5 text-[17px] font-bold tracking-[.08em] text-rose">{open ? copy.envelope.opening : copy.envelope.closed}</p></div></div>;
}

function Letter({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return <div className="screen-enter relative min-h-svh pt-14"><Hearts /><div className="relative z-10 mx-auto max-w-110"><header className="relative flex items-center justify-center px-4 pb-3"><button type="button" onClick={onBack} className="absolute left-4 text-sm font-semibold text-rose">{copy.navigation.back}</button><p className="text-[11px] font-bold tracking-[.16em] text-rose">{copy.letter.heading}</p></header><article className="paper-texture letter-rise mx-3 rounded-2xl px-7 py-8 shadow-lg"><h2 className="script mb-5 text-[28px] text-foreground">{fill(copy.letter.salutation)}</h2><p className="script whitespace-pre-line text-[20px] leading-9 text-ink-soft">{copy.letter.body}</p><div className="mt-5 text-center"><Bear src={bearSorry} alt="A sorry teddy bear" className="mx-auto w-24" /><p className="mt-2 text-[10px] font-semibold text-rose">{copy.letter.imageLabel}</p></div></article><div className="mt-5 bg-blush p-5 text-center"><AppButton onClick={onNext}>{copy.letter.button}</AppButton></div></div></div>;
}

function ForgivenessMeter({ value, onTap, onBack }: { value: number; onTap: () => void; onBack: () => void }) {
  const label = value >= 100 ? copy.meter.completeLabel : value >= 60 ? copy.meter.almostLabel : value >= 30 ? copy.meter.warmingLabel : copy.meter.startLabel;
  const image = value >= 85 ? bearHappy : value >= 55 ? bearsCouple : value >= 25 ? bearSorry : bearCrying;
  return <div className="screen-enter relative flex min-h-svh items-center px-4 py-16"><Hearts /><button type="button" onClick={onBack} className="absolute top-5 left-4 z-20 text-sm font-semibold text-rose">{copy.navigation.back}</button><div className="relative z-10 w-full rounded-[28px] bg-card px-6 py-8 text-center shadow-xl"><h2 className="script text-[27px] font-bold text-rose">{copy.meter.title}</h2><Bear src={image} alt={label} className="mx-auto mt-5 w-30 border-3 border-primary/25" /><p className="mt-3 text-xs font-bold tracking-wider text-rose-deep">{label}</p><div className="mt-5 h-6 overflow-hidden rounded-full bg-primary/15 shadow-inner"><div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${value}%` }} /></div><p className="mt-2 text-xl font-bold text-rose">{value}% FORGIVEN</p><p className="mt-3 text-xs font-semibold italic text-rose-deep">{copy.meter.instruction}</p><button type="button" aria-label="Increase forgiveness" onClick={onTap} className="heart-beat primary-shadow mx-auto mt-5 grid size-24 place-items-center rounded-full bg-primary text-4xl">🤍</button></div></div>;
}

function Gifts({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const images = [bearHappy, bearsCouple, bearSorry];
  return <div className="screen-enter relative min-h-svh bg-card pt-14"><button type="button" onClick={onBack} className="ml-4 text-sm font-semibold text-rose">{copy.navigation.back}</button><p className="mt-3 text-center text-xs font-bold tracking-[.16em] text-rose">{copy.gifts.heading}</p><div className="mt-3">{copy.gifts.items.map((gift, i) => <article key={gift.title} className="flex items-center gap-4 border-b-8 border-blush px-5 py-5"><Bear src={images[i] ?? bearSorry} alt="" className="gift-shadow size-21 shrink-0 border-2 border-primary/20" /><div><h2 className="script text-[23px] font-bold text-rose">{gift.title}</h2><p className="mt-1 text-[13px] leading-5 text-muted-foreground">{gift.description}</p><p className="mt-2 text-[11px] italic text-ink-soft"><span className="mr-1 inline-grid size-5 place-items-center rounded-md bg-secondary text-secondary-foreground not-italic">✓</span>{copy.gifts.redeemable}</p></div></article>)}</div><div className="bg-blush p-5"><AppButton onClick={onNext} className="w-full">{copy.gifts.button}</AppButton></div></div>;
}

function Celebration({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  return <div className="screen-enter relative flex min-h-svh flex-col pt-14"><Hearts /><button type="button" onClick={onBack} className="relative z-10 ml-4 w-fit text-sm font-semibold text-rose">{copy.navigation.back}</button><div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 text-center"><Bear src={bearHappy} alt="Happy celebrating teddy bear" className="heart-beat w-40 border-4 border-primary/25 shadow-xl" /><div className="mt-6 grid w-full grid-cols-2 gap-3"><div className="rounded-2xl bg-card p-4 shadow-md"><span className="text-3xl">🤗</span><p className="mt-2 text-[10px] italic text-muted-foreground">Aaa Lag Jaa Gale...</p></div><div className="rounded-2xl bg-card p-4 shadow-md"><span className="text-3xl">🐻🍓</span><p className="mt-2 text-[10px] italic text-muted-foreground">I love you berry much</p></div></div></div><div className="soft-panel relative z-10 px-6 py-7 text-center"><h2 className="script text-[32px] font-bold text-rose">PEACE TREATY SIGNED! 🕊️</h2><p className="mt-1 text-[11px] tracking-[.2em] text-primary/60">NEW BEGINNINGS AHEAD</p><p className="mt-4 text-sm leading-6 text-ink-soft">Thank you for being the most forgiving and wonderful person. I love you to the moon and back! 💚🙏</p><AppButton onClick={onNext} className="mt-5 w-full">One last thing 💕</AppButton></div></div>;
}

function FinalQuestion({ answer, onAnswer, onBack }: { answer: "yes" | "no" | null; onAnswer: (answer: "yes" | "no") => void; onBack: () => void }) {
  return <div className="screen-enter relative flex min-h-svh flex-col items-center justify-center px-6 text-center"><Hearts /><button type="button" onClick={onBack} className="absolute top-5 left-4 z-20 text-sm font-semibold text-rose">{copy.navigation.back}</button><div className="relative z-10 w-full"><Bear src={answer === "yes" ? bearHappy : bearSorry} alt="Teddy bear waiting for an answer" className="mx-auto w-42 border-4 border-primary/25 shadow-xl" />{answer === "yes" ? <div className="letter-rise"><h1 className="script mt-7 text-[37px] font-bold text-rose">{fill(copy.final.acceptedTitle)}</h1><p className="mx-auto mt-4 max-w-80 text-[15px] leading-7 text-ink-soft">{fill(copy.final.acceptedMessage)}</p><div className="mt-6 flex justify-center gap-2 text-3xl"><span>❤️</span><span>💕</span><span>❤️</span></div></div> : <><h1 className="script mt-7 text-[39px] font-bold text-rose-deep">{copy.final.title}</h1><p className="mx-auto mt-3 max-w-75 text-sm leading-6 text-muted-foreground">{answer === "no" ? copy.final.noResponse : copy.final.subtitle}</p><div className="mt-7 flex flex-col items-center gap-3"><AppButton onClick={() => onAnswer("yes")} className="w-full max-w-72">{copy.final.yesButton}</AppButton><AppButton secondary onClick={() => onAnswer("no")} className="w-full max-w-50">{copy.final.noButton}</AppButton></div></>}</div></div>;
}

function Confetti() {
  const colors = ["bg-primary", "bg-secondary", "bg-rose", "bg-accent"];
  return <div aria-hidden="true" className="absolute inset-0 z-30 overflow-hidden">{Array.from({ length: 30 }, (_, i) => <span key={i} className={`confetti-piece ${colors[i % colors.length]}`} style={{ left: `${(i * 37) % 100}%`, animationDuration: `${2.3 + (i % 5) * .3}s`, animationDelay: `${-(i % 7) * .2}s` }} />)}</div>;
}