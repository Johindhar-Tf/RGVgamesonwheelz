"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const cities = [
  "McAllen", "Edinburg", "Mission", "Pharr", "Brownsville",
  "Harlingen", "Weslaco", "McAllen", "Edinburg", "Mission",
  "Pharr", "Brownsville", "Harlingen", "Weslaco",
];

const stats = [
  { value: 150, suffix: "+", label: "Events Served" },
  { value: 4.9, suffix: "★", label: "Average Rating", decimal: true },
  { value: 6,   suffix: "",  label: "Cities Covered" },
  { value: 10,  suffix: "+", label: "Consoles On Board" },
];

export default function About() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const statsRef    = useRef<HTMLDivElement>(null);
  const bodyRef     = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Heading reveal ── */
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
            toggleActions: "play none none reverse",
          },
        }
      );

      /* ── Stats count-up ── */
      const cards = statsRef.current?.querySelectorAll(".stat-card");
      cards?.forEach((card, i) => {
        const numEl   = card.querySelector(".stat-num") as HTMLElement;
        const isFloat = card.getAttribute("data-float") === "true";
        const target  = parseFloat(card.getAttribute("data-target") ?? "0");

        gsap.fromTo(
          card,
          { y: 40, opacity: 0 },
          {
            y: 0, opacity: 1, duration: 0.6, ease: "power3.out",
            delay: i * 0.1,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );

        /* number counter */
        gsap.fromTo(
          { val: 0 },
          { val: target },
          {
            duration: 1.6,
            ease: "power2.out",
            delay: i * 0.1,
            onUpdate: function () {
              if (numEl) {
                numEl.textContent = isFloat
                  ? this.targets()[0].val.toFixed(1)
                  : Math.round(this.targets()[0].val).toString();
              }
            },
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* ── Body + image ── */
      gsap.fromTo(
        bodyRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: {
            trigger: bodyRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        imageRef.current,
        { x: 30, opacity: 0, scale: 0.96 },
        {
          x: 0, opacity: 1, scale: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="overflow-hidden">
      {/* ── Marquee ticker ── */}
      <div className="bg-primary py-4 overflow-hidden border-y border-primary-dark">
        <div className="marquee-track">
          {[...cities, ...cities].map((city, i) => (
            <span
              key={i}
              className="font-display font-bold text-white text-sm tracking-[0.15em] uppercase mx-8 flex items-center gap-3"
            >
              <span className="text-accent">●</span>
              {city}
            </span>
          ))}
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="mesh-bg section-padding px-5 md:px-8">
        <div className="container-site">
        {/* Tag + Heading */}
        <div ref={headingRef} className="text-center mb-12" style={{ willChange: "transform, opacity" }}>
          <span className="tag-chip mb-4">About Us</span>
          <h2
            className="font-display font-black text-text-main mt-4 leading-tight"
            style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)", letterSpacing: "0.01em" }}
          >
            We Don&apos;t Just Deliver Games.
            <br />
            <span className="text-primary">We Deliver Memories.</span>
          </h2>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          {stats.map((s) => (
            <div
              key={s.label}
              className="stat-card artifact-card p-6 text-center"
              data-target={s.value}
              data-float={s.decimal ? "true" : "false"}
              style={{ willChange: "transform, opacity" }}
            >
              <div className="font-display font-black text-primary mb-1"
                style={{ fontSize: "clamp(1.6rem, 2.2vw, 2.2rem)" }}>
                <span className="stat-num">{s.decimal ? "0.0" : "0"}</span>
                <span>{s.suffix}</span>
              </div>
              <div className="font-mono text-muted text-xs tracking-widest uppercase">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Split layout */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div ref={bodyRef} style={{ willChange: "transform, opacity" }}>
            <span className="tag-chip mb-6">How It Works</span>
            <h3
              className="font-display font-black text-text-main mb-6 leading-tight"
              style={{ fontSize: "clamp(1.3rem, 1.8vw, 1.9rem)", letterSpacing: "0.01em" }}
            >
              Your Venue. Our Console.
              <br />
              <span className="text-accent italic">Endless Gaming.</span>
            </h3>
            <p className="font-body text-text-main/70 text-base leading-relaxed mb-6">
              RGV Games on Wheelz is the Rio Grande Valley&apos;s premier mobile gaming experience.
              We roll up to your location — birthday parties, school events, community gatherings —
              fully loaded with the latest consoles, games, and gear.
            </p>
            <p className="font-body text-text-main/70 text-base leading-relaxed mb-8">
              No equipment to buy. No setup headaches. No stress. Just pure, unapologetic gaming joy
              from the moment we arrive to the moment we leave.
            </p>
            <div className="flex flex-col gap-3">
              {[
                { icon: "🚌", text: "We drive to your location — anywhere in the RGV" },
                { icon: "🎮", text: "Multiple consoles, hundreds of titles, all ages covered" },
                { icon: "⚡", text: "Setup in under 15 minutes — fully self-sufficient" },
                { icon: "✅", text: "Flat-rate packages — no hidden fees, ever" },
              ].map((item) => (
                <div key={item.text} className="flex items-start gap-3">
                  <span className="text-xl mt-0.5">{item.icon}</span>
                  <p className="font-body text-text-main/80 text-sm leading-relaxed">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div
            ref={imageRef}
            className="relative rounded-3xl overflow-hidden aspect-[4/3]"
            style={{ willChange: "transform, opacity" }}
          >
            <img
              src="https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=900&q=80"
              alt="Kids enjoying gaming party"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            {/* Floating badge */}
            <div className="absolute bottom-6 left-6 glass rounded-2xl px-5 py-3">
              <div className="font-mono text-xs text-primary mb-0.5 uppercase tracking-widest">Live Status</div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
                <span className="font-display font-bold text-text-main text-sm">Booking Available</span>
              </div>
            </div>
          </div>
        </div>
        </div>{/* /container-site */}
      </div>
    </section>
  );
}
