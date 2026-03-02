"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── Telemetry Typewriter ── */
const gameTitles = [
  "FIFA 24 — Party Mode 🔥",
  "Mario Kart 8 Deluxe 🏎️",
  "Mortal Kombat 1 👊",
  "Just Dance 2024 💃",
  "Fortnite Battle Royale ⚡",
  "NBA 2K24 — Tournament 🏀",
  "Minecraft — Creative 🏗️",
  "Super Smash Bros. Ultimate 🎮",
  "Call of Duty: Warzone 💥",
  "Rocket League 🚀",
];

function TelemetryTypewriter() {
  const [lines, setLines] = useState<string[]>(["SYSTEM READY"]);
  const [cursor, setCursor] = useState(0);
  const lineIdx = useRef(0);
  const charIdx = useRef(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    const typeNext = () => {
      const full  = gameTitles[lineIdx.current % gameTitles.length];
      const chunk = full.slice(0, charIdx.current + 1);
      charIdx.current++;

      setLines((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = chunk;
        return updated.slice(-5); // keep last 5
      });
      setCursor(0);

      if (charIdx.current < full.length) {
        timeout = setTimeout(typeNext, 45);
      } else {
        charIdx.current = 0;
        lineIdx.current++;
        timeout = setTimeout(() => {
          setLines((prev) => [...prev, ""]);
          typeNext();
        }, 1800);
      }
    };

    timeout = setTimeout(typeNext, 600);
    return () => clearTimeout(timeout);
  }, []);

  /* blink cursor */
  useEffect(() => {
    const id = setInterval(() => setCursor((c) => 1 - c), 530);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="bg-dark-bg rounded-2xl p-5 h-full min-h-[220px] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex gap-1.5">
          {["#EF4444", "#FACC15", "#4ADE80"].map((c) => (
            <div key={c} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-dot" />
          <span className="font-mono text-green-400 text-[0.6rem] tracking-widest uppercase">Live</span>
        </div>
      </div>
      {/* Feed */}
      <div className="font-mono text-xs text-green-300/80 space-y-1">
        {lines.map((line, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="text-primary/60 select-none">{">"}</span>
            <span>{line}{i === lines.length - 1 && cursor ? "▌" : ""}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Step Sequencer ── */
const steps = [
  { label: "Book Online",  desc: "Fill our quick form or call us",        icon: "📋" },
  { label: "We Plan",      desc: "We confirm details & prep the bus",      icon: "🗓️" },
  { label: "We Arrive",    desc: "Fully loaded, on time, every time",      icon: "🚌" },
  { label: "Game Time",    desc: "Hours of non-stop multiplayer mayhem",   icon: "🎮" },
  { label: "We Pack Up",   desc: "Clean exit — you enjoy the rest of the party", icon: "✅" },
];

function StepSequencer() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((a) => (a + 1) % steps.length);
    }, 1400);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="bg-dark-bg rounded-2xl p-5 h-full min-h-[220px]">
      <div className="font-mono text-[0.6rem] tracking-widest uppercase text-muted mb-4">
        Process Flow
      </div>
      <div className="flex flex-col gap-2">
        {steps.map((s, i) => (
          <div
            key={s.label}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-400 ${
              i === active
                ? "bg-primary/20 border border-primary/40"
                : "border border-transparent opacity-50"
            }`}
          >
            <span className="text-base">{s.icon}</span>
            <div className="flex-1">
              <div
                className={`font-display font-bold text-xs transition-colors duration-300 ${
                  i === active ? "text-white" : "text-muted"
                }`}
              >
                {s.label}
              </div>
              {i === active && (
                <div className="font-body text-white/50 text-[0.65rem] mt-0.5">{s.desc}</div>
              )}
            </div>
            {i === active && (
              <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-dot" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Service cards data ── */
const services = [
  {
    title: "Live Gaming Feed",
    desc: "Browse our full library of 100+ titles across all genres — from family-friendly to competitive. New games added every season.",
    artifact: <TelemetryTypewriter />,
    tag: "Game Library",
  },
  {
    title: "Seamless Process",
    desc: "From booking to pack-up, every step is handled by us. You focus on the party; we handle the gaming experience.",
    artifact: <StepSequencer />,
    tag: "Experience Flow",
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const featsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%", toggleActions: "play none none reverse" },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".service-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "power3.out", delay: i * 0.15,
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      });

      const feats = featsRef.current?.querySelectorAll(".feat-item");
      feats?.forEach((f, i) => {
        gsap.fromTo(
          f,
          { y: 30, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: "power3.out", delay: i * 0.08,
            scrollTrigger: { trigger: featsRef.current, start: "top 82%", toggleActions: "play none none reverse" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const features = [
    { icon: "🎮", title: "10+ Consoles",         desc: "PS5, Xbox Series X, Nintendo Switch & more" },
    { icon: "🎯", title: "100+ Game Titles",      desc: "All genres, all ratings — we match your crowd" },
    { icon: "👨‍👧", title: "All Ages Welcome",      desc: "From toddlers to teenagers to parents" },
    { icon: "🔊", title: "Premium Audio",         desc: "Surround sound & headsets included" },
    { icon: "💡", title: "LED Ambiance",          desc: "Color-synced lighting inside the bus" },
    { icon: "🛡️",  title: "Safe Environment",     desc: "Age-appropriate content always enforced" },
  ];

  return (
    <section ref={sectionRef} id="services" className="mesh-bg section-padding px-5 md:px-8 overflow-hidden">
      <div className="container-site">
      {/* Heading */}
      <div ref={headRef} className="text-center mb-12" style={{ willChange: "transform, opacity" }}>
        <span className="tag-chip mb-4">Services</span>
        <h2
          className="font-display font-black text-text-main mt-4 leading-tight"
          style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)", letterSpacing: "0.01em" }}
        >
          What&apos;s Inside the Bus
        </h2>
        <p className="font-body text-muted mt-4 max-w-xl mx-auto text-base">
          Every detail engineered for maximum fun. Here&apos;s a live look at what powers the experience.
        </p>
      </div>

      {/* Artifact cards */}
      <div ref={cardsRef} className="grid md:grid-cols-2 gap-6 mb-16">
        {services.map((s) => (
          <div
            key={s.title}
            className="service-card artifact-card p-6 flex flex-col gap-5"
            style={{ willChange: "transform, opacity" }}
          >
            <div>
              <span className="tag-chip mb-3">{s.tag}</span>
              <h3 className="font-display font-black text-text-main text-xl mb-2">{s.title}</h3>
              <p className="font-body text-muted text-sm leading-relaxed">{s.desc}</p>
            </div>
            {s.artifact}
          </div>
        ))}
      </div>

      {/* Feature grid */}
      <div ref={featsRef} className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {features.map((f) => (
          <div
            key={f.title}
            className="feat-item artifact-card p-5 hover:border-primary/30 transition-colors duration-300 group"
            style={{ willChange: "transform, opacity" }}
          >
            <div className="text-2xl mb-3 group-hover:scale-110 transition-transform duration-300 inline-block">
              {f.icon}
            </div>
            <h4 className="font-display font-bold text-text-main text-sm mb-1">{f.title}</h4>
            <p className="font-body text-muted text-xs leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
      </div>{/* /container-site */}
    </section>
  );
}
