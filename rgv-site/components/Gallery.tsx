"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const photos = [
  {
    src: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&q=80",
    alt: "Kids gaming party setup",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=600&q=80",
    alt: "Gaming controller close up",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=600&q=80",
    alt: "Neon gaming setup",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80",
    alt: "Gaming lounge neon lights",
    span: "col-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&q=80",
    alt: "RGB gaming desk setup",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    alt: "Group gaming event",
    span: "",
  },
  {
    src: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=800&q=80",
    alt: "Kids playing video games",
    span: "col-span-2",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const gridRef    = useRef<HTMLDivElement>(null);

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

      /* Grid items stagger */
      const items = gridRef.current?.querySelectorAll(".gallery-item");
      items?.forEach((item, i) => {
        gsap.fromTo(
          item,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0, opacity: 1, scale: 1, duration: 0.7, ease: "power3.out",
            delay: i * 0.07,
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 80%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });

      /* Magnetic hover effect */
      items?.forEach((item) => {
        const el = item as HTMLElement;

        const handleMove = (e: MouseEvent) => {
          const rect   = el.getBoundingClientRect();
          const cx     = rect.left + rect.width  / 2;
          const cy     = rect.top  + rect.height / 2;
          const dx     = (e.clientX - cx) / (rect.width  / 2);
          const dy     = (e.clientY - cy) / (rect.height / 2);
          const rotX   =  dy * -4;
          const rotY   =  dx *  5;
          gsap.to(el, {
            rotationX: rotX,
            rotationY: rotY,
            scale: 1.03,
            transformPerspective: 800,
            ease: "power2.out",
            duration: 0.35,
          });
        };

        const handleLeave = () => {
          gsap.to(el, {
            rotationX: 0,
            rotationY: 0,
            scale: 1,
            ease: "back.out(1.4)",
            duration: 0.55,
          });
        };

        el.addEventListener("mousemove", handleMove);
        el.addEventListener("mouseleave", handleLeave);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="gallery" className="mesh-bg section-padding px-5 md:px-8 overflow-hidden">
      <div className="container-site">
      {/* Heading */}
      <div ref={headRef} className="text-center mb-12" style={{ willChange: "transform, opacity" }}>
        <span className="tag-chip mb-4">Gallery</span>
        <h2
          className="font-display font-black text-text-main mt-4 leading-tight"
          style={{ fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)", letterSpacing: "0.01em" }}
        >
          The Experience,
          <br />
          <span className="text-primary">In Living Color</span>
        </h2>
        <p className="font-body text-muted mt-4 max-w-xl mx-auto text-base">
          Every event is different. Every moment is electric. Here&apos;s a glimpse into the world of RGV Games on Wheelz.
        </p>
      </div>

      {/* Mosaic grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[240px]"
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`gallery-item ${photo.span}`}
            style={{ willChange: "transform, opacity" }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
              <span className="font-mono text-white text-xs tracking-wider opacity-90">{photo.alt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CTA row */}
      <div className="flex flex-col items-center gap-4 mt-14">
        <p className="font-body text-muted text-sm">
          Follow us on social media for more moments
        </p>
        <div className="flex gap-3">
          {[
            { label: "Facebook",  href: "https://www.facebook.com/rgvgamesonwheelz" },
            { label: "Instagram", href: "https://www.instagram.com/Rgvgamesonwheelz" },
            { label: "TikTok",   href: "https://tiktok.com/@Rgvgamesonwheelz" },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-slide font-display font-semibold text-sm px-6 py-3 rounded-full border border-primary/30 text-primary hover:bg-primary hover:text-white hover:border-primary transition-colors duration-300"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
      </div>{/* /container-site */}
    </section>
  );
}
