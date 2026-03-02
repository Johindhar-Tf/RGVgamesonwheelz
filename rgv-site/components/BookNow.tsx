"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  "Birthday Party",
  "School Event",
  "Corporate Event",
  "Community Gathering",
  "Block Party",
  "Church Event",
  "Other",
];

type FormState = "idle" | "loading" | "success" | "error";

export default function BookNow() {
  const sectionRef  = useRef<HTMLElement>(null);
  const headRef     = useRef<HTMLDivElement>(null);
  const formRef     = useRef<HTMLDivElement>(null);
  const infoRef     = useRef<HTMLDivElement>(null);

  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    message: "",
    website: "", // honeypot
  });

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
      gsap.fromTo(
        formRef.current,
        { x: 30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: formRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
      gsap.fromTo(
        infoRef.current,
        { x: -30, opacity: 0 },
        {
          x: 0, opacity: 1, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: infoRef.current, start: "top 80%", toggleActions: "play none none reverse" },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setFormState("success");
        setForm({ name: "", phone: "", email: "", service: "", date: "", time: "", message: "", website: "" });
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  };

  const inputClass =
    "w-full font-body text-sm bg-dark-surface border border-white/10 text-white placeholder:text-white/30 rounded-xl px-4 py-3.5 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/40 transition-all duration-200";

  const labelClass = "block font-mono text-[0.65rem] tracking-widest uppercase text-white/50 mb-1.5";

  return (
    <section ref={sectionRef} id="contact" className="mesh-bg-dark section-padding px-5 md:px-8 overflow-hidden">
      {/* Heading */}
      <div ref={headRef} className="text-center mb-12" style={{ willChange: "transform, opacity" }}>
        <span className="tag-chip !bg-white/10 !border-white/20 !text-white/70 mb-4">Book Now</span>
        <h2
          className="font-display font-black text-white mt-4 leading-tight"
          style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)", letterSpacing: "0.01em" }}
        >
          Ready to Level Up
          <br />
          <span className="text-accent">Your Event?</span>
        </h2>
        <p className="font-body text-white/50 mt-4 max-w-xl mx-auto text-base">
          Fill out the form below and we&apos;ll reach out within 24 hours to confirm your booking.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.6fr] gap-12 max-w-6xl mx-auto">
        {/* Left info panel */}
        <div ref={infoRef} className="flex flex-col gap-8" style={{ willChange: "transform, opacity" }}>
          {/* Contact details */}
          <div className="artifact-card !bg-dark-surface/80 !border-white/10 p-6">
            <h3 className="font-display font-bold text-white text-lg mb-6">Get in Touch</h3>
            <div className="flex flex-col gap-5">
              {[
                { icon: "📞", label: "Phone", value: "(956) 844-4263", href: "tel:+19568444263" },
                { icon: "💬", label: "WhatsApp", value: "Chat on WhatsApp", href: "https://wa.me/19568444263" },
                { icon: "✉️", label: "Email", value: "info@rgvgamesonwheelz.com", href: "mailto:info@rgvgamesonwheelz.com" },
                { icon: "📍", label: "Service Area", value: "Rio Grande Valley, TX", href: null },
                { icon: "⏰", label: "Hours", value: "Mon–Sun: 10am – 9pm", href: null },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-base flex-shrink-0">
                    {c.icon}
                  </div>
                  <div>
                    <div className="font-mono text-[0.6rem] tracking-widest uppercase text-white/40 mb-0.5">
                      {c.label}
                    </div>
                    {c.href ? (
                      <a href={c.href} className="font-body text-white/80 text-sm hover:text-accent transition-colors duration-200">
                        {c.value}
                      </a>
                    ) : (
                      <span className="font-body text-white/80 text-sm">{c.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service area */}
          <div className="artifact-card !bg-dark-surface/80 !border-white/10 p-6">
            <h4 className="font-display font-bold text-white text-sm mb-4">Cities We Serve</h4>
            <div className="flex flex-wrap gap-2">
              {["McAllen", "Edinburg", "Mission", "Pharr", "Brownsville", "Harlingen", "Weslaco", "San Juan", "Alamo", "Hidalgo"].map((city) => (
                <span
                  key={city}
                  className="font-mono text-[0.6rem] tracking-wider uppercase px-3 py-1 rounded-full border border-primary/30 text-primary/80 bg-primary/10"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="artifact-card !bg-dark-surface/80 !border-white/10 p-6">
            <div className="flex gap-1 mb-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-yellow-400 text-sm">★</span>
              ))}
            </div>
            <p className="font-body text-white/70 text-sm italic leading-relaxed mb-3">
              &quot;My son&apos;s birthday was the talk of the whole school. RGV Games on Wheelz showed up and absolutely delivered. Worth every penny!&quot;
            </p>
            <span className="font-mono text-white/40 text-[0.6rem] tracking-widest uppercase">
              — Maria G., McAllen
            </span>
          </div>
        </div>

        {/* Right form */}
        <div ref={formRef} style={{ willChange: "transform, opacity" }}>
          <div className="artifact-card !bg-dark-surface/80 !border-white/10 p-8">
            {formState === "success" ? (
              <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center text-3xl">
                  🎮
                </div>
                <h3 className="font-display font-black text-white text-2xl">Game On!</h3>
                <p className="font-body text-white/60 text-sm leading-relaxed max-w-sm">
                  Thank you! We&apos;ll be in touch soon to confirm your booking. Get ready for the ultimate gaming experience! 🎉
                </p>
                <button
                  onClick={() => setFormState("idle")}
                  className="btn-slide mt-4 font-display font-bold text-sm px-6 py-3 rounded-xl bg-primary text-white"
                >
                  Book Another Event
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                {/* Honeypot */}
                <input
                  type="text"
                  name="website"
                  value={form.website}
                  onChange={handleChange}
                  style={{ display: "none" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className={labelClass}>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Smith"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(956) 000-0000"
                      required
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label className={labelClass}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    required
                    className={inputClass}
                  />
                </div>

                <div className="mb-5">
                  <label className={labelClass}>Type of Event *</label>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" disabled>Select your event type...</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-dark-bg">{s}</option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label className={labelClass}>Preferred Date</label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      className={`${inputClass} [color-scheme:dark]`}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>Preferred Time</label>
                    <input
                      type="time"
                      name="time"
                      value={form.time}
                      onChange={handleChange}
                      className={`${inputClass} [color-scheme:dark]`}
                    />
                  </div>
                </div>

                <div className="mb-7">
                  <label className={labelClass}>Additional Notes</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell us about your event — expected guests, any specific game requests, location details..."
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {formState === "error" && (
                  <div className="mb-5 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                    <p className="font-body text-red-400 text-sm">
                      Something went wrong. Please try calling us directly at{" "}
                      <a href="tel:+19568444263" className="underline">(956) 844-4263</a>
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="btn-slide w-full bg-accent text-white font-display font-black py-4 rounded-xl text-base shadow-lg shadow-accent/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {formState === "loading" ? (
                    <>
                      <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Sending Request...
                    </>
                  ) : (
                    <>🎮 Send Booking Request</>
                  )}
                </button>

                <p className="font-mono text-white/30 text-[0.6rem] text-center mt-4 tracking-wider">
                  We respond within 24 hours · Your info is never shared
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
