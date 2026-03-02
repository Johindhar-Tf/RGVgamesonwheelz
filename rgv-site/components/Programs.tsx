"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* Ambient animations per card — each unique */
function PulseOrb({ color }: { color: string }) {
  return (
    <div
      className="absolute bottom-6 right-6 w-32 h-32 rounded-full opacity-20 blur-2xl pointer-events-none"
      style={{ background: color, animation: "float 5s ease-in-out infinite" }}
    />
  );
}

function ScanLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.04]"
      style={{
        backgroundImage: "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 4px)",
        backgroundSize: "100% 4px",
        animation: "marquee 3s linear infinite",
      }}
    />
  );
}

function DotMatrix() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.06]"
      style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
        backgroundSize: "14px 14px",
      }}
    />
  );
}

function GridLines() {
  return (
    <div
      className="absolute inset-0 pointer-events-none opacity-[0.06]"
      style={{
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}

const programs = [
  {
    tag: "Most Popular",
    title: "Birthday Bashes",
    subtitle: "The Ultimate Party Upgrade",
    desc: "Turn an ordinary birthday into an extraordinary memory. We pull up to your venue loaded with the hottest games, LED lights blazing, ready to give the birthday hero and their crew the gaming session of their lives.",
    image: "https://images.unsplash.com/photo-1627856013091-fed6e4e30025?w=900&q=80",
    accent: "#D946EF",
    bg: "from-[#4C1D95] to-[#1E1B4B]",
    ambient: <PulseOrb color="#D946EF" />,
    perks: ["Custom birthday shoutout", "1–4 hrs packages", "Up to 20 players", "All consoles included"],
  },
  {
    tag: "School & Community",
    title: "School Events",
    subtitle: "Reward, Engage, Celebrate",
    desc: "Field days, end-of-year celebrations, reward events — we partner with RGV schools to deliver supervised, age-appropriate gaming fun that kids actually get excited about.",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&q=80",
    accent: "#6D28D9",
    bg: "from-[#1E3A5F] to-[#0F172A]",
    ambient: <ScanLines />,
    perks: ["Teacher-supervised play", "Age-appropriate library", "Group discounts available", "Flexible scheduling"],
  },
  {
    tag: "Corporate & Private",
    title: "Corporate Events",
    subtitle: "Team-Building, Reimagined",
    desc: "Company picnics, employee appreciation days, brand activations — we bring the fun factor that makes your event unforgettable. Multiplayer competition builds teams better than any trust fall ever could.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
    accent: "#0EA5E9",
    bg: "from-[#0C1445] to-[#030712]",
    ambient: <DotMatrix />,
    perks: ["Custom branding options", "Tournament formats", "Large group capacity", "Professional staff on site"],
  },
  {
    tag: "Community Events",
    title: "Community Gatherings",
    subtitle: "Where the Neighborhood Comes Alive",
    desc: "Block parties, church events, festivals, neighborhood gatherings — we plug into any community event and become the highlight everyone talks about long after it&apos;s over.",
    image: "https://images.unsplash.com/photo-1603481588273-2f908a9a7a1b?w=900&q=80",
    accent: "#10B981",
    bg: "from-[#064E3B] to-[#0F172A]",
    ambient: <GridLines />,
    perks: ["Open-access setup", "Family-friendly titles", "RGV community focused", "Flexible hours"],
  },
];

export default function Programs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* Heading */
      gsap.fromTo(
        headRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headRef.current, start: "top 82%", toggleActions: "play none none reverse" },
        }
      );

      /* Sticky scroll stacking */
      const cards = cardsRef.current?.querySelectorAll(".program-card");
      if (!cards || cards.length === 0) return;

      cards.forEach((card, i) => {
        if (i === 0) return; // first card stays full

        ScrollTrigger.create({
          trigger: card,
          start: "top top+=10vh",
          end: "bottom top+=10vh",
          onEnter: () => {
            // Scale + blur previous cards
            for (let j = 0; j < i; j++) {
              gsap.to(cards[j], {
                scale: 0.92 - j * 0.02,
                opacity: 0.5,
                filter: "blur(3px)",
                duration: 0.4,
                ease: "power2.out",
              });
            }
          },
          onLeaveBack: () => {
            gsap.to(cards[i - 1], {
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              duration: 0.4,
              ease: "power2.out",
            });
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="programs" className="bg-dark-bg overflow-hidden">
      {/* Heading */}
      <div
        ref={headRef}
        className="section-padding px-5 md:px-8 pb-10 text-center"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="container-site">
          <span className="tag-chip !bg-white/10 !border-white/20 !text-white/70 mb-4">Programs</span>
          <h2
            className="font-display font-black text-white mt-4 leading-tight"
            style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)", letterSpacing: "0.01em" }}
          >
            Built for Every
            <br />
            <span
              style={{
                WebkitTextStroke: "2px rgba(217,70,239,0.8)",
                WebkitTextStrokeWidth: "2px",
                color: "transparent",
              }}
            >
              Occasion
            </span>
          </h2>
          <p className="font-body text-white/50 mt-4 max-w-xl mx-auto text-sm">
            From intimate birthday parties to large community events — we have a package crafted for your specific moment.
          </p>
        </div>
      </div>

      {/* Sticky stack */}
      <div ref={cardsRef} className="px-4 md:px-10 lg:px-16 pb-32 space-y-6">
        {programs.map((p, i) => (
          <div
            key={p.title}
            className={`program-card bg-gradient-to-br ${p.bg} overflow-hidden`}
            style={{
              top: `${10 + i * 3}vh`,
              minHeight: "420px",
              willChange: "transform, opacity, filter",
            }}
          >
            {/* Ambient layer */}
            {p.ambient}

            <div className="relative z-10 grid md:grid-cols-2 h-full min-h-[420px]">
              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col justify-between">
                <div>
                  <span
                    className="inline-block font-mono text-[0.65rem] tracking-widest uppercase px-3 py-1 rounded-full border mb-4"
                    style={{
                      borderColor: `${p.accent}40`,
                      color: p.accent,
                      background: `${p.accent}15`,
                    }}
                  >
                    {p.tag}
                  </span>
                  <h3
                    className="font-display font-black text-white mb-2"
                    style={{ fontSize: "clamp(1.3rem, 1.9vw, 2rem)", letterSpacing: "0.01em" }}
                  >
                    {p.title}
                  </h3>
                  <p className="font-display font-semibold italic mb-4" style={{ color: p.accent }}>
                    {p.subtitle}
                  </p>
                  <p className="font-body text-white/60 text-sm leading-relaxed mb-6">{p.desc}</p>
                </div>

                {/* Perks */}
                <div className="grid grid-cols-2 gap-2">
                  {p.perks.map((perk) => (
                    <div key={perk} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full" style={{ background: p.accent }} />
                      <span className="font-body text-white/60 text-xs">{perk}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
                  className="btn-slide mt-6 self-start font-display font-bold text-sm px-6 py-3 rounded-full text-white"
                  style={{ background: p.accent, boxShadow: `0 8px 24px ${p.accent}40` }}
                >
                  Book This Experience →
                </button>
              </div>

              {/* Image */}
              <div className="hidden md:block relative overflow-hidden rounded-r-2xl">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to right, ${p.bg.includes("4C1D95") ? "#4C1D95" : p.bg.includes("1E3A5F") ? "#1E3A5F" : p.bg.includes("0C1445") ? "#0C1445" : "#064E3B"}cc, transparent)`,
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
