"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tiers = [
  {
    name: "Starter Pack",
    tag: "Great for Small Parties",
    price: "$299",
    duration: "2 Hours",
    desc: "Perfect for intimate birthday celebrations and small gatherings up to 12 guests.",
    perks: [
      "2 consoles",
      "Up to 12 players",
      "50+ game titles",
      "On-site attendant",
      "Setup & breakdown included",
      "1 hour add-on available",
    ],
    cta: "Book Starter",
    highlight: false,
    accent: "border-primary/20",
    ctaStyle: "border border-primary text-primary hover:bg-primary hover:text-white",
  },
  {
    name: "Party Elite",
    tag: "Most Popular",
    price: "$499",
    duration: "3 Hours",
    desc: "Our most popular package — the full gaming bus experience for up to 20 players.",
    perks: [
      "5+ consoles",
      "Up to 20 players",
      "100+ game titles",
      "Dedicated gaming host",
      "LED light package",
      "Tournament bracket mode",
      "Setup & breakdown included",
      "1 hour add-on available",
    ],
    cta: "Book Party Elite",
    highlight: true,
    accent: "border-transparent",
    ctaStyle: "bg-white text-primary",
  },
  {
    name: "VIP Commander",
    tag: "Maximum Impact",
    price: "$1,350",
    duration: "Full Day",
    desc: "For large events, corporate activations, and community events that demand the full spectacle.",
    perks: [
      "All consoles unlocked",
      "Unlimited players",
      "Full game library",
      "2 gaming hosts",
      "Custom event branding",
      "Prize pool coordination",
      "PA system included",
      "Setup & breakdown included",
    ],
    cta: "Book VIP",
    highlight: false,
    accent: "border-primary/20",
    ctaStyle: "border border-primary text-primary hover:bg-primary hover:text-white",
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const cardsRef   = useRef<HTMLDivElement>(null);
  const noteRef    = useRef<HTMLDivElement>(null);

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

      const cards = cardsRef.current?.querySelectorAll(".pricing-card");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.7, ease: "back.out(1.2)", delay: i * 0.12,
            scrollTrigger: { trigger: cardsRef.current, start: "top 80%", toggleActions: "play none none reverse" },
          }
        );
      });

      gsap.fromTo(
        noteRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: noteRef.current, start: "top 85%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="bg-dark-bg section-padding px-5 md:px-8 overflow-hidden">
      <div className="container-site">
      {/* Heading */}
      <div ref={headRef} className="text-center mb-12" style={{ willChange: "transform, opacity" }}>
        <span className="tag-chip !bg-white/10 !border-white/20 !text-white/70 mb-4">Pricing</span>
        <h2
          className="font-display font-black text-white mt-4 leading-tight"
          style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)", letterSpacing: "0.01em" }}
        >
          Transparent Pricing.
          <br />
          <span className="text-accent">Zero Surprises.</span>
        </h2>
        <p className="font-body text-white/50 mt-4 max-w-xl mx-auto text-base">
          All packages include travel within the RGV, full setup & breakdown, and a dedicated gaming host.
          Pick your level.
        </p>
      </div>

      {/* Cards */}
      <div ref={cardsRef} className="grid md:grid-cols-3 gap-6 items-start">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`pricing-card relative border ${tier.accent} ${
              tier.highlight
                ? "bg-primary scale-[1.04] shadow-2xl shadow-primary/40 z-10"
                : "bg-dark-surface"
            }`}
            style={{ willChange: "transform, opacity" }}
          >
            {/* Popular badge */}
            {tier.highlight && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-accent text-white font-display font-bold text-xs px-5 py-1.5 rounded-full shadow-lg shadow-accent/40">
                  ⭐ Most Popular
                </span>
              </div>
            )}

            {/* Header */}
            <div className="mb-6">
              <span
                className={`font-mono text-[0.6rem] tracking-widest uppercase mb-2 block ${
                  tier.highlight ? "text-white/70" : "text-muted"
                }`}
              >
                {tier.tag}
              </span>
              <h3
                className={`font-display font-black text-2xl mb-1 ${
                  tier.highlight ? "text-white" : "text-white"
                }`}
              >
                {tier.name}
              </h3>
              <p className={`font-body text-xs leading-relaxed ${tier.highlight ? "text-white/60" : "text-muted"}`}>
                {tier.desc}
              </p>
            </div>

            {/* Price */}
            <div className="mb-6 pb-6 border-b border-white/10">
              <span
                className={`font-display font-black ${
                  tier.highlight ? "text-white" : "text-white"
                }`}
                style={{ fontSize: "clamp(1.8rem, 2.4vw, 2.4rem)" }}
              >
                {tier.price}
              </span>
              <span className={`font-mono text-xs ml-2 ${tier.highlight ? "text-white/60" : "text-muted"}`}>
                / {tier.duration}
              </span>
            </div>

            {/* Perks */}
            <ul className="flex flex-col gap-2.5 mb-8">
              {tier.perks.map((perk) => (
                <li key={perk} className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                      tier.highlight ? "bg-white/20" : "bg-primary/20"
                    }`}
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path
                        d="M1.5 4L3.5 6L6.5 2"
                        stroke={tier.highlight ? "#fff" : "#6D28D9"}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span
                    className={`font-body text-sm ${
                      tier.highlight ? "text-white/80" : "text-white/60"
                    }`}
                  >
                    {perk}
                  </span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className={`btn-slide w-full font-display font-bold py-3.5 rounded-xl text-sm ${tier.ctaStyle}`}
            >
              {tier.cta}
            </button>
          </div>
        ))}
      </div>

      {/* Note */}
      <div
        ref={noteRef}
        className="mt-12 text-center"
        style={{ willChange: "transform, opacity" }}
      >
        <p className="font-body text-white/40 text-sm">
          📍 Travel included within the RGV · Additional hours available at $75/hr ·{" "}
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="text-accent hover:text-white transition-colors duration-200 underline underline-offset-2"
          >
            Contact us for custom quotes
          </button>
        </p>
      </div>
      </div>{/* /container-site */}
    </section>
  );
}
