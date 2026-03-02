"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: "About",    href: "#about"    },
  { label: "Services", href: "#services" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery",  href: "#gallery"  },
  { label: "Pricing",  href: "#pricing"  },
  { label: "Book Now", href: "#contact"  },
];

const cities = [
  "McAllen", "Edinburg", "Mission", "Pharr",
  "Brownsville", "Harlingen", "Weslaco", "San Juan",
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        footerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.9, ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  const handleNav = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      ref={footerRef}
      className="bg-[#080613] rounded-t-[3rem] overflow-hidden"
      style={{ willChange: "transform, opacity" }}
    >
      {/* Mesh background */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          style={{
            background:
              "radial-gradient(ellipse 50% 60% at 10% 50%, rgba(109,40,217,0.3) 0%, transparent 60%), radial-gradient(ellipse 40% 50% at 90% 30%, rgba(217,70,239,0.2) 0%, transparent 60%)",
          }}
        />

        {/* Big headline */}
        <div className="px-5 md:px-8 pt-16 pb-10 border-b border-white/5">
          <div className="container-site">
          <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-8">
            <div>
              {/* Logo */}
              <div className="font-display font-black text-white mb-3" style={{ fontSize: "clamp(1.4rem, 2.2vw, 2rem)" }}>
                RGV<span className="text-accent">.</span>WHEELZ
              </div>
              <p className="font-body text-white/40 text-sm max-w-xs leading-relaxed">
                The Rio Grande Valley&apos;s #1 mobile gaming bus. We bring the party to you.
              </p>
            </div>

            {/* Status + CTA */}
            <div className="flex flex-col gap-4 items-start lg:items-end">
              {/* Status */}
              <div className="glass !bg-white/5 !border-white/10 px-5 py-3 rounded-full flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-dot" />
                <span className="font-mono text-green-400 text-xs tracking-widest uppercase">
                  All Systems Go — Booking Open
                </span>
              </div>

              <button
                onClick={() => handleNav("#contact")}
                className="btn-slide bg-accent text-white font-display font-bold px-8 py-4 rounded-full text-sm shadow-xl shadow-accent/30"
              >
                Book Your Event 🎮
              </button>
            </div>
          </div>
          </div>{/* /container-site inner */}
        </div>

        {/* Main footer columns */}
        <div className="px-5 md:px-8 py-10">
        <div className="container-site">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="font-mono text-[0.6rem] tracking-widest uppercase text-white/30 mb-4">Contact</div>
            <div className="flex flex-col gap-3">
              <a
                href="tel:+19568444263"
                className="font-body text-white/70 text-sm hover:text-accent transition-colors duration-200"
              >
                📞 (956) 844-4263
              </a>
              <a
                href="https://wa.me/19568444263"
                target="_blank"
                rel="noopener noreferrer"
                className="font-body text-white/70 text-sm hover:text-accent transition-colors duration-200"
              >
                💬 WhatsApp
              </a>
              <a
                href="mailto:info@rgvgamesonwheelz.com"
                className="font-body text-white/70 text-sm hover:text-accent transition-colors duration-200"
              >
                ✉️ info@rgvgamesonwheelz.com
              </a>
              <span className="font-body text-white/40 text-sm">
                📍 Rio Grande Valley, TX
              </span>
              <span className="font-body text-white/40 text-sm">
                ⏰ Mon–Sun: 10am – 9pm
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-mono text-[0.6rem] tracking-widest uppercase text-white/30 mb-4">Navigation</div>
            <ul className="flex flex-col gap-2.5">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => handleNav(l.href)}
                    className="font-body text-white/60 text-sm hover:text-white transition-colors duration-200 text-left"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <div className="font-mono text-[0.6rem] tracking-widest uppercase text-white/30 mb-4">Service Area</div>
            <ul className="flex flex-col gap-2.5">
              {cities.map((city) => (
                <li key={city}>
                  <span className="font-body text-white/50 text-sm">{city}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <div className="font-mono text-[0.6rem] tracking-widest uppercase text-white/30 mb-4">Follow Us</div>
            <div className="flex flex-col gap-3">
              {[
                { label: "Facebook",  href: "https://www.facebook.com/rgvgamesonwheelz", icon: "📘" },
                { label: "Instagram", href: "https://www.instagram.com/Rgvgamesonwheelz",   icon: "📸" },
                { label: "TikTok",   href: "https://tiktok.com/@Rgvgamesonwheelz",          icon: "🎵" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-white/60 text-sm hover:text-white transition-colors duration-200"
                >
                  <span>{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>

            <div className="mt-6">
              <div className="font-mono text-[0.6rem] tracking-widest uppercase text-white/30 mb-3">Legal</div>
              <div className="flex flex-col gap-2">
                <span className="font-body text-white/30 text-xs cursor-pointer hover:text-white/60 transition-colors duration-200">
                  Privacy Policy
                </span>
                <span className="font-body text-white/30 text-xs cursor-pointer hover:text-white/60 transition-colors duration-200">
                  Terms of Service
                </span>
              </div>
            </div>
          </div>
        </div>{/* /grid */}
        </div>{/* /container-site */}
        </div>{/* /px wrapper */}

        {/* Bottom bar */}
        <div className="px-5 md:px-8 py-5 border-t border-white/5">
        <div className="container-site flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-mono text-white/25 text-[0.65rem] tracking-widest">
            © {new Date().getFullYear()} RGV Games on Wheelz · All Rights Reserved · McAllen, Texas
          </span>
          <span className="font-mono text-white/25 text-[0.65rem] tracking-widest">
            #1 MOBILE GAMING BUS · RIO GRANDE VALLEY
          </span>
        </div>
        </div>{/* /bottom bar px */}
      </div>
    </footer>
  );
}
