"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/* Controller SVG – inline so we can animate it */
function ControllerIcon() {
  return (
    <svg
      width="120"
      height="80"
      viewBox="0 0 120 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="drop-shadow-[0_0_24px_rgba(217,70,239,0.7)]"
    >
      {/* body */}
      <path
        d="M10 32C10 18 22 12 34 12H86C98 12 110 18 110 32L104 62C102 70 94 74 86 74H34C26 74 18 70 16 62L10 32Z"
        fill="rgba(109,40,217,0.85)"
        stroke="rgba(217,70,239,0.9)"
        strokeWidth="1.5"
      />
      {/* D-pad vertical */}
      <rect x="29" y="33" width="6" height="18" rx="2" fill="white" opacity="0.85" />
      {/* D-pad horizontal */}
      <rect x="22" y="39" width="20" height="6" rx="2" fill="white" opacity="0.85" />
      {/* Buttons */}
      <circle cx="84" cy="35" r="5" fill="rgba(217,70,239,0.9)" />
      <circle cx="95" cy="44" r="5" fill="rgba(109,40,217,0.9)" />
      <circle cx="73" cy="44" r="5" fill="#4ADE80" opacity="0.9" />
      <circle cx="84" cy="53" r="5" fill="#FACC15" opacity="0.9" />
      {/* Joysticks */}
      <circle cx="46" cy="52" r="7" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <circle cx="68" cy="28" r="7" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      {/* Start/select */}
      <rect x="54" y="41" width="5" height="3" rx="1.5" fill="white" opacity="0.5" />
      <rect x="61" y="41" width="5" height="3" rx="1.5" fill="white" opacity="0.5" />
    </svg>
  );
}

export default function Hero() {
  const sectionRef  = useRef<HTMLElement>(null);
  const crtRef      = useRef<HTMLDivElement>(null);
  const overlayRef  = useRef<HTMLDivElement>(null);
  const imageRef    = useRef<HTMLDivElement>(null);
  const tagRef      = useRef<HTMLDivElement>(null);
  const line1Ref    = useRef<HTMLDivElement>(null);
  const line2Ref    = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctasRef     = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<HTMLDivElement>(null);
  const scrollRef   = useRef<HTMLDivElement>(null);
  const badgesRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      /* 1 ─ CRT grid expands */
      tl.fromTo(
        crtRef.current,
        { scaleX: 0, scaleY: 0.04, opacity: 1 },
        { scaleX: 1, scaleY: 1, duration: 0.7, ease: "power2.inOut" },
        0
      );

      /* 2 ─ CRT flickers off */
      tl.to(crtRef.current, { opacity: 0, duration: 0.25, ease: "power2.in" }, 0.65);

      /* 3 ─ Image wipes in from left */
      tl.fromTo(
        overlayRef.current,
        { clipPath: "inset(0 100% 0 0)" },
        { clipPath: "inset(0 0% 0 0)", duration: 0.7, ease: "power3.inOut" },
        0.7
      );

      /* 4 ─ Image reveals */
      tl.fromTo(
        imageRef.current,
        { scale: 1.1 },
        { scale: 1, duration: 1.6, ease: "power2.out" },
        0.7
      );

      /* 5 ─ Tag fades up */
      tl.fromTo(
        tagRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        1.2
      );

      /* 6 ─ Headline word slam */
      const line1Words = line1Ref.current?.querySelectorAll(".word");
      const line2Words = line2Ref.current?.querySelectorAll(".word");

      if (line1Words) {
        tl.fromTo(
          line1Words,
          { y: 60, opacity: 0, scale: 1.06 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.55 },
          1.35
        );
      }
      if (line2Words) {
        tl.fromTo(
          line2Words,
          { y: 60, opacity: 0, scale: 1.06 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.06, duration: 0.55 },
          1.55
        );
      }

      /* 7 ─ Subtitle + CTAs */
      tl.fromTo(
        subtitleRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        1.9
      );
      tl.fromTo(
        ctasRef.current,
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        2.05
      );

      /* 8 ─ Controller + badges */
      tl.fromTo(
        controllerRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.9, ease: "back.out(1.4)" },
        1.6
      );
      tl.fromTo(
        badgesRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        2.1
      );

      /* 9 ─ Scroll indicator */
      tl.fromTo(
        scrollRef.current,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        2.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const wordsLine1 = ["#1 GAMING", "BUS IN"];
  const wordsLine2 = ["THE VALLEY"];

  const scrollDown = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative w-full overflow-hidden"
      style={{ height: "100dvh", minHeight: "600px" }}
    >
      {/* ── CRT boot screen ── */}
      <div
        ref={crtRef}
        className="absolute inset-0 z-30 bg-dark-bg flex items-center justify-center origin-center"
        style={{ willChange: "transform, opacity" }}
      >
        <div className="grid grid-cols-12 grid-rows-8 w-full h-full opacity-20">
          {Array.from({ length: 96 }).map((_, i) => (
            <div
              key={i}
              className="border border-primary/30"
              style={{
                animationDelay: `${(i * 0.008).toFixed(3)}s`,
              }}
            />
          ))}
        </div>
        <div className="absolute font-mono text-primary text-sm tracking-widest animate-pulse">
          INITIALIZING...
        </div>
      </div>

      {/* ── Background image ── */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-0"
        style={{ clipPath: "inset(0 100% 0 0)", willChange: "clip-path" }}
      >
        <div
          ref={imageRef}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          <img
            src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=1920&q=80"
            alt="Gaming lounge with vibrant neon lighting"
            className="w-full h-full object-cover"
          />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-dark-bg/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-bg/60 via-transparent to-transparent" />
      </div>

      {/* ── Floating controller ── */}
      <div
        ref={controllerRef}
        className="absolute top-[18%] right-[8%] z-10 animate-float hidden lg:block"
        style={{ willChange: "transform, opacity" }}
      >
        <ControllerIcon />
        {/* Glow rings */}
        <div className="absolute inset-0 rounded-full bg-accent/10 blur-3xl scale-150 pointer-events-none" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 h-full flex flex-col justify-end px-5 md:px-8 pb-14 md:pb-18">
        <div className="container-site">
          {/* Tag */}
          <div ref={tagRef} className="mb-5" style={{ willChange: "transform, opacity" }}>
            <span className="tag-chip !bg-primary/20 !border-primary/40 !text-white/90">
              🎮 Rio Grande Valley&apos;s Premier Gaming Experience
            </span>
          </div>

          {/* Headline */}
          <div className="overflow-hidden mb-0.5">
            <div
              ref={line1Ref}
              className="flex flex-wrap gap-x-3 font-display font-black leading-[1.0] text-white"
              style={{ fontSize: "clamp(2.2rem, 4.2vw, 4.6rem)", letterSpacing: "-0.01em" }}
            >
              {wordsLine1.map((w) => (
                <span key={w} className="word block" style={{ willChange: "transform, opacity" }}>
                  {w}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden mb-5">
            <div
              ref={line2Ref}
              className="flex flex-wrap gap-x-3 font-display font-black leading-[1.0]"
              style={{ fontSize: "clamp(2.2rem, 4.2vw, 4.6rem)", letterSpacing: "-0.01em" }}
            >
              {wordsLine2.map((w) => (
                <span
                  key={w}
                  className="word block"
                  style={{
                    willChange: "transform, opacity",
                    WebkitTextStroke: "2px",
                    WebkitTextStrokeColor: "rgba(217,70,239,0.9)",
                    color: "transparent",
                  }}
                >
                  {w}
                </span>
              ))}
            </div>
          </div>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="font-body text-white/70 text-sm md:text-base max-w-lg mb-7 leading-relaxed"
            style={{ willChange: "transform, opacity" }}
          >
            We bring{" "}
            <em className="text-accent not-italic font-semibold">the ultimate gaming party</em>{" "}
            directly to your venue. No setup stress. Just pure, uninterrupted fun — for McAllen,
            Edinburg, Mission, Pharr, Brownsville &amp; Harlingen.
          </p>

          {/* CTAs */}
          <div
            ref={ctasRef}
            className="flex flex-wrap gap-3 mb-8"
            style={{ willChange: "transform, opacity" }}
          >
            <button
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-slide bg-accent text-white font-display font-bold px-7 py-3.5 rounded-full text-sm shadow-lg shadow-accent/30"
            >
              Book Your Party 🎮
            </button>
            <button
              onClick={() => document.querySelector("#pricing")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-slide border border-white/30 text-white font-display font-semibold px-7 py-3.5 rounded-full text-sm backdrop-blur-sm"
            >
              View Pricing
            </button>
          </div>

          {/* Badges */}
          <div
            ref={badgesRef}
            className="flex flex-wrap gap-2"
            style={{ willChange: "transform, opacity" }}
          >
            {[
              "⭐ 4.9 / 5 Rating",
              "🏆 150+ Events Served",
              "🚌 We Come To You",
              "🎯 RGV Owned & Operated",
            ].map((b) => (
              <span
                key={b}
                className="font-mono text-xs text-white/60 border border-white/15 px-3 py-1.5 rounded-full backdrop-blur-sm"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        ref={scrollRef}
        onClick={scrollDown}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer group"
        style={{ willChange: "transform, opacity" }}
      >
        <span className="font-mono text-[0.6rem] text-white/40 tracking-[0.2em] uppercase">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent group-hover:from-accent/80 transition-colors duration-300" />
      </div>
    </section>
  );
}
