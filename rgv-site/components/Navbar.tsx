"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const links = [
  { label: "About",    href: "#about"    },
  { label: "Services", href: "#services" },
  { label: "Programs", href: "#programs" },
  { label: "Gallery",  href: "#gallery"  },
  { label: "Pricing",  href: "#pricing"  },
  { label: "Contact",  href: "#contact"  },
];

export default function Navbar() {
  const navRef    = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── Scroll-state detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Entrance animation ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        navRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 2.8 }
      );
    });
    return () => ctx.revert();
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center justify-between gap-8 px-6 py-3 rounded-full transition-all duration-500 ${
          scrolled
            ? "glass shadow-lg shadow-primary/10 w-[min(90vw,780px)]"
            : "bg-transparent w-[min(90vw,820px)]"
        }`}
        style={{ willChange: "transform, opacity" }}
      >
        {/* Logo */}
        <a
          href="#"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 select-none"
        >
          <span
            className={`text-sm font-display font-bold tracking-wide transition-colors duration-500 ${
              scrolled ? "text-text-main" : "text-white"
            }`}
          >
            RGV<span className="text-accent">.</span>WHEELZ
          </span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className={`font-body text-sm font-medium transition-colors duration-300 hover:text-primary ${
                  scrolled ? "text-text-main/70" : "text-white/80"
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <button
          onClick={() => handleNav("#contact")}
          className="hidden md:flex btn-slide items-center gap-2 bg-primary text-white text-sm font-display font-semibold px-5 py-2.5 rounded-full"
        >
          Book Now
        </button>

        {/* Hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden flex flex-col gap-1.5 p-1 transition-colors duration-300 ${
            scrolled ? "text-text-main" : "text-white"
          }`}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-5 bg-current transition-transform duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-x-4 top-24 z-40 glass rounded-2xl p-6 shadow-2xl transition-all duration-400 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto translate-y-0" : "opacity-0 pointer-events-none -translate-y-4"
        }`}
      >
        <ul className="flex flex-col gap-4">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className="w-full text-left font-body text-base font-medium text-text-main hover:text-primary transition-colors duration-200"
              >
                {l.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNav("#contact")}
              className="w-full btn-slide bg-primary text-white font-display font-semibold py-3 rounded-xl mt-2"
            >
              Book Now
            </button>
          </li>
        </ul>
      </div>
    </>
  );
}
