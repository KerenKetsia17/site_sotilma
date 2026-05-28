"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";

/* ─── Tokens ─────────────────────────────────────────── */
const BLUE    = "#1E72B8";
const DARK    = "#111827";
const MID     = "#5A6B7A";
const BGLIGHT = "#F5F7FA";

/* ─── SectionHeading — signature Solari ──────────────── */
function SectionHeading({
  label, title, subtitle, light = false, align = "center",
}: {
  label?: string; title: React.ReactNode; subtitle?: string;
  light?: boolean; align?: "center" | "left";
}) {
  const c = align === "center";
  return (
    <div className={`mb-10 ${c ? "text-center" : ""}`}>
      {label && (
        <p className="text-xs font-medium tracking-[0.28em] uppercase mb-3"
          style={{ color: light ? "rgba(255,255,255,0.65)" : BLUE }}>
          {label}
        </p>
      )}
      <h2 className="font-normal leading-tight"
        style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.2rem)", letterSpacing: "-0.02em", color: light ? "#FFF" : DARK }}>
        {title}
      </h2>
      <div className={`mt-4 mb-5 ${c ? "mx-auto" : ""}`}
        style={{ width: 52, height: 3, borderRadius: 2, backgroundColor: light ? "rgba(255,255,255,0.55)" : BLUE }} />
      {subtitle && (
        <p className={`${c ? "mx-auto" : ""} max-w-xl`}
          style={{ color: light ? "rgba(255,255,255,0.78)" : MID, fontSize: "1.05rem", lineHeight: 1.85 }}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ─── Boutons pill ────────────────────────────────────── */
function Btn({ href, children, variant = "solid" }: {
  href: string; children: React.ReactNode; variant?: "solid" | "outline" | "white";
}) {
  const s: Record<string, React.CSSProperties> = {
    solid:   { backgroundColor: BLUE, color: "#FFF" },
    outline: { border: `2px solid ${BLUE}`, color: BLUE },
    white:   { backgroundColor: "#FFF", color: BLUE },
  };
  return (
    <Link href={href}
      className="inline-flex items-center gap-2 font-medium text-sm px-8 py-3.5 rounded-full tracking-wide transition-all duration-200 hover:opacity-85 hover:-translate-y-0.5"
      style={s[variant]}>
      {children}
    </Link>
  );
}

/* ─── Lightbox ────────────────────────────────────────── */
function Lightbox({ src, alt, isOpen, onClose }: {
  src: string; alt: string; isOpen: boolean; onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [isOpen, onClose]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10"
          onClick={onClose}>
          <button onClick={onClose} aria-label="Fermer"
            className="absolute top-5 right-5 z-[10000] w-10 h-10 rounded-full border border-white/20 hover:bg-white/10 text-white flex items-center justify-center">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }} transition={{ duration: 0.25 }}
            className="relative w-full max-w-5xl h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image src={src} alt={alt} fill className="object-contain" priority sizes="90vw" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ══════════════════════════════════════════════════════
   1. HERO — plein écran style Solari
══════════════════════════════════════════════════════ */
function HeroText() {
  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: "92vh" }}>
      <Image src="/app-banner.jpg" alt="Sotilma" fill className="object-cover object-center" sizes="100vw" priority />
      <div className="absolute inset-0"
        style={{ background: "linear-gradient(to bottom,rgba(5,20,40,.52) 0%,rgba(5,20,40,.65) 60%,rgba(5,20,40,.72) 100%)" }} />

      {/* ── Éléments ambiants flottants ── */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        <motion.div
          className="absolute rounded-full"
          style={{ width: 560, height: 560, top: "50%", left: "68%", marginTop: -280, marginLeft: -280, border: "1px solid rgba(255,255,255,0.07)" }}
          animate={{ rotate: 360 }}
          transition={{ duration: 55, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute rounded-full"
          style={{ width: 260, height: 260, top: "18%", left: "8%", border: "1px solid rgba(255,255,255,0.05)" }}
          animate={{ rotate: -360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute rounded-full bg-blue-300/10"
          style={{ width: 12, height: 12, top: "28%", left: "22%" }}
          animate={{ y: [-14, 14, -14] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute rounded-full bg-white/10"
          style={{ width: 8, height: 8, top: "62%", left: "78%" }}
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        />
        <motion.div
          className="absolute rounded-full bg-white/[0.05]"
          style={{ width: 180, height: 180, bottom: "12%", right: "6%" }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute rounded-full bg-blue-200/10"
          style={{ width: 6, height: 6, top: "70%", left: "35%" }}
          animate={{ y: [-10, 10, -10], x: [-5, 5, -5] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 h-full" style={{ minHeight: "92vh", paddingBottom: "18vh" }}>
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
          style={{ width: "clamp(280px, 55vw, 680px)", height: "clamp(80px, 16vw, 190px)" }}>
          <Image src="/1 (1).png" alt="Sotilma" fill sizes="680px"
            className="object-contain object-center"
            style={{ filter: "brightness(0) invert(1)" }} priority />
        </motion.div>
        <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.6, delay: 0.45 }}
          style={{ width: 48, height: 2, backgroundColor: "#FFF", borderRadius: 2, margin: "10px auto" }} />
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
          className="mb-6 max-w-lg mx-auto"
          style={{ fontSize: "1rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.7 }}>
          Votre allié pour gérer automatiquement votre champ sans effort, depuis n&apos;importe où.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-4">
          <Btn href="/expertise" variant="white">Découvrir nos solutions</Btn>
          <Link href="/boutique"
            className="inline-flex items-center gap-2 font-medium text-sm px-8 py-3.5 rounded-full tracking-wide transition-all hover:opacity-85"
            style={{ border: "2px solid rgba(255,255,255,0.65)", color: "#FFFFFF" }}>
            Voir la boutique
          </Link>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div animate={{ y: [0, 7, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
          <svg className="w-5 h-5" fill="none" stroke="white" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   2. NOS SOLUTIONS — grille 3 cartes style Solari section 2
══════════════════════════════════════════════════════ */
const CAMERA_SLIDES = ["/camera-slide-1.jpg", "/camera-slide-2.jpg"];
const VANNE_SLIDES = [
  "https://static.wixstatic.com/media/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png",
  "https://static.wixstatic.com/media/75ad33_d3b8626a84fc4e0cad8f3e38a2cf871d~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_d3b8626a84fc4e0cad8f3e38a2cf871d~mv2.png",
  "https://static.wixstatic.com/media/75ad33_7e11dfdbf9d54db99f3fbded4aa4efab~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_7e11dfdbf9d54db99f3fbded4aa4efab~mv2.png",
  "https://static.wixstatic.com/media/75ad33_2469b961487c44acaba3b385b8d04c99~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_2469b961487c44acaba3b385b8d04c99~mv2.png",
  "https://static.wixstatic.com/media/75ad33_460bf654f01c4839ab8df296a9196153~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_460bf654f01c4839ab8df296a9196153~mv2.png",
];
const ARROSEUR_SLIDES = [
  "https://static.wixstatic.com/media/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png",
  "https://static.wixstatic.com/media/75ad33_92a71e1e369b4fbcaece634d9f1fa756~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_92a71e1e369b4fbcaece634d9f1fa756~mv2.png",
  "https://static.wixstatic.com/media/75ad33_9a1c9a63416d4e1f9a953d1f1c34bb0e~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_9a1c9a63416d4e1f9a953d1f1c34bb0e~mv2.png",
  "https://static.wixstatic.com/media/75ad33_aa5047129fab44c3a03ff8fe8b12a3ac~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_aa5047129fab44c3a03ff8fe8b12a3ac~mv2.png",
];

function SolutionsGrid() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-60px" });
  const [vanneIdx,    setVanneIdx]    = useState(0);
  const [arroseurIdx, setArroseurIdx] = useState(0);
  const [camIdx,      setCamIdx]      = useState(0);

  useEffect(() => {
    const t1 = setInterval(() => setVanneIdx((i)    => (i + 1) % VANNE_SLIDES.length),    3000);
    const t2 = setInterval(() => setArroseurIdx((i) => (i + 1) % ARROSEUR_SLIDES.length), 2800);
    const t3 = setInterval(() => setCamIdx((i)      => (i + 1) % CAMERA_SLIDES.length),   3500);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); };
  }, []);

  const solutions = [
    { href: "/boutique?categorie=vanne",      label: "Vannes connectées",  sub: "Irrigation automatique & pilotable",     slides: VANNE_SLIDES,    activeIdx: vanneIdx    },
    { href: "/boutique?categorie=irrigation", label: "Arroseur Auto 4G",   sub: "Goutte-à-goutte & aspersion pilotables", slides: ARROSEUR_SLIDES, activeIdx: arroseurIdx },
    { href: "/boutique?categorie=camera",     label: "Caméra Agricole",    sub: "Surveillance 24/7 de vos cultures",      slides: CAMERA_SLIDES,   activeIdx: camIdx      },
  ];

  return (
    <section ref={ref} className="py-8 bg-white" style={{ borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <SectionHeading label="Nos Solutions" title="Des produits pensés pour l'Afrique"
            subtitle="Chaque solution est conçue pour fonctionner sans électricité, dans les zones les plus reculées." />
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {solutions.map((s, i) => (
            <motion.div key={s.label}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.12 }}>
              <Link href={s.href} className="group block">
                <div className="relative rounded-xl overflow-hidden mb-3"
                  style={{ aspectRatio: "4/3", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", backgroundColor: BGLIGHT, border: "1px solid #E8ECF1" }}>

                  <AnimatePresence mode="sync">
                    <motion.div
                      key={s.activeIdx}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.9, ease: "easeInOut" }}
                      className="absolute inset-0"
                    >
                      <Image src={s.slides[s.activeIdx]} alt={s.label} fill
                        className="object-contain p-2 transition-transform duration-700 group-hover:scale-[1.05]"
                        sizes="480px" />
                    </motion.div>
                  </AnimatePresence>

                  {/* Indicateurs dots pour le slideshow */}
                  {s.slides && (
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                      {s.slides.map((_, di) => (
                        <div key={di} className="rounded-full transition-all duration-300"
                          style={{ width: di === s.activeIdx ? 16 : 6, height: 6, backgroundColor: di === s.activeIdx ? "#fff" : "rgba(255,255,255,0.5)" }} />
                      ))}
                    </div>
                  )}

                  <div className="absolute inset-0 transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: "rgba(30,114,184,0.07)" }} />
                </div>
                <div className="text-center px-2">
                  <h3 className="font-medium mb-0.5 transition-colors duration-200 group-hover:text-[#1E72B8]"
                    style={{ fontSize: "0.78rem", color: DARK }}>{s.label}</h3>
                  <p style={{ fontSize: "0.68rem", color: MID }}>{s.sub}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Btn href="/boutique">Voir tous les produits</Btn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   3. "CONÇU POUR VOUS" — style exact Solari section 3
   Fond gris clair + 4 cards : icône outline + numéro
   + séparateur + titre small caps + description
══════════════════════════════════════════════════════ */
function DesignedForYou() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const features = [
    {
      num: "01",
      label: "Énergie solaire",
      desc:  "100 % autonome, sans facture d'électricité. Panneaux intégrés pour une autonomie totale.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-11 h-11">
          <circle cx="24" cy="24" r="8"/>
          <line x1="24" y1="4" x2="24" y2="10"/>
          <line x1="24" y1="38" x2="24" y2="44"/>
          <line x1="4" y1="24" x2="10" y2="24"/>
          <line x1="38" y1="24" x2="44" y2="24"/>
          <line x1="9.37" y1="9.37" x2="13.6" y2="13.6"/>
          <line x1="34.4" y1="34.4" x2="38.63" y2="38.63"/>
          <line x1="38.63" y1="9.37" x2="34.4" y2="13.6"/>
          <line x1="13.6" y1="34.4" x2="9.37" y2="38.63"/>
        </svg>
      ),
    },
    {
      num: "02",
      label: "100 % Mobile",
      desc:  "Châssis roulant robuste — déplacez votre pompe d'une parcelle à l'autre sans démontage.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-11 h-11">
          <rect x="10" y="6" width="28" height="36" rx="4"/>
          <line x1="18" y1="38" x2="30" y2="38"/>
          <line x1="24" y1="12" x2="24" y2="28"/>
          <polyline points="18,22 24,28 30,22"/>
        </svg>
      ),
    },
    {
      num: "03",
      label: "Contrôle à distance",
      desc:  "Pilotez tout depuis votre smartphone. Suivi en temps réel, alertes et automatisations.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-11 h-11">
          <path d="M24 4C13 4 4 13 4 24s9 20 20 20 20-9 20-20S35 4 24 4z"/>
          <path d="M4 24h40"/>
          <path d="M24 4c-5.5 6-8 12-8 20s2.5 14 8 20"/>
          <path d="M24 4c5.5 6 8 12 8 20s-2.5 14-8 20"/>
        </svg>
      ),
    },
    {
      num: "04",
      label: "Automatisation",
      desc:  "Irrigation programmée sans intervention. Votre champ est arrosé même quand vous dormez.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-11 h-11">
          <circle cx="24" cy="24" r="18"/>
          <polyline points="24,12 24,24 32,30"/>
          <circle cx="24" cy="24" r="2" fill="currentColor"/>
        </svg>
      ),
    },
  ];

  return (
    <section ref={ref} style={{ backgroundColor: BGLIGHT, borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <SectionHeading
            label="Pourquoi Sotilma"
            title="Conçu pour vous"
            subtitle="Sotilma offre une gamme de solutions adaptées à chaque type d'exploitation agricole."
          />
        </motion.div>

        {/* 4 cartes style "Designed for you" Solari */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div key={f.label}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
              style={{ border: "1px solid #E0E8F0", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>

              {/* Icône outline — accent couleur */}
              <div style={{ color: BLUE }}>{f.icon}</div>

              {/* Séparateur court gris */}
              <div style={{ width: 36, height: 1, backgroundColor: "#CDD6E0", margin: "18px 0 14px" }} />

              {/* Numéro + label en small caps */}
              <p className="font-medium tracking-[0.15em] uppercase mb-2"
                style={{ fontSize: "0.72rem", color: DARK }}>
                <span style={{ color: BLUE }}>{f.num}.&nbsp; </span>{f.label}
              </p>

              {/* Séparateur court gris */}
              <div style={{ width: 28, height: 1, backgroundColor: "#CDD6E0", margin: "10px 0 14px" }} />

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: MID, lineHeight: 1.75 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

/* Image plein écran après "Pourquoi Sotilma" */
function FullWidthImage() {
  return (
    <section className="w-full">
      <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
        <Image
          src="/ac.jpeg"
          alt="Sotilma image"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   4. SOTILMA MOBILE — style Solari "Our Services"
   Grille 3 cols plein bord : texte | image | texte
══════════════════════════════════════════════════════ */
function MobileHero() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const src    = "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png";

  return (
    <>
      <section ref={ref} style={{ backgroundColor: "white", borderTop: "1px solid #E8ECF1" }}>
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <SectionHeading
              label="Pompage solaire mobile"
              title="Sotilma Mobile"
              subtitle="Système de pompage solaire mobile haute performance pour une agriculture intelligente."
            />
          </motion.div>

          {/* Grande image */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative cursor-zoom-in overflow-hidden mx-auto"
            style={{ maxWidth: "800px", aspectRatio: "16/9" }}
            onClick={() => setLightboxOpen(true)}>
            <Image src={src} alt="Sotilma Mobile" fill
              className="object-cover transition-transform duration-700 hover:scale-[1.02]" sizes="800px" />
          </motion.div>

          {/* Bouton */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.3 }}
            className="text-center mt-8">
            <Btn href="/boutique?categorie=pompe">Commander</Btn>
          </motion.div>

        </div>
      </section>
      <Lightbox src={src} alt="Sotilma Mobile" isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
    </>
  );
}

/* ══════════════════════════════════════════════════════
   5. VANNE SOTILMA — style Solari : image | texte | image
══════════════════════════════════════════════════════ */
function SmartValvesSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const imgs   = [
    { src: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg/v1/fill/w_446,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg", alt: "Vanne Sotilma 1" },
    { src: "https://static.wixstatic.com/media/75ad33_8f29c3e714694a9d89307d3c5dbd8847~mv2.jpg/v1/fill/w_446,h_586,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Capture%20d%E2%80%99%C3%A9cran%2C%20le%202024-09-20%20%C3%A0%2018_43_e.jpg", alt: "Vanne Sotilma 2" },
  ];

  return (
    <section ref={ref} className="overflow-hidden" style={{ backgroundColor: "white", borderTop: "1px solid #E8ECF1" }}>
      <div className="grid lg:grid-cols-3" style={{ minHeight: 460 }}>

        {/* Col 1 — image gauche */}
        <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="relative hidden lg:block" style={{ borderRight: "1px solid #E8ECF1" }}>
          <Image src={imgs[0].src} alt={imgs[0].alt} fill className="object-contain p-8" sizes="400px" />
        </motion.div>

        {/* Col 2 — texte centré */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-col items-center justify-center text-center px-10 py-10"
          style={{ borderRight: "1px solid #E8ECF1" }}>
          <p className="text-xs tracking-[0.28em] uppercase mb-3" style={{ color: BLUE }}>SOTILMA</p>
          <h2 className="font-normal mb-0" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: DARK, letterSpacing: "-0.01em" }}>
            Vanne Sotilma
          </h2>
          <div style={{ width: 36, height: 2, backgroundColor: BLUE, borderRadius: 1, margin: "14px auto" }} />
          <p className="text-sm mb-2" style={{ color: DARK, lineHeight: 1.8 }}>
            Ouvrez et fermez vos vannes à distance, programmez vos arrosages, mesurez votre consommation d&apos;eau.{" "}
            <span style={{ color: BLUE }}>Irrigation automatique.</span>
          </p>
          <p className="text-sm mb-6" style={{ color: MID, lineHeight: 1.8 }}>
            Sotilma, la solution qui vous permet de gérer automatiquement et à distance votre irrigation.
          </p>
          <Btn href="/boutique?categorie=vanne-automatique">Voir la boutique</Btn>
        </motion.div>

        {/* Col 3 — image droite statique */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative" style={{ minHeight: 400 }}>
          <Image src={imgs[1].src} alt={imgs[1].alt} fill className="object-contain p-8" sizes="480px" />
        </motion.div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   6. SURVEILLANCE — même style que Pourquoi Sotilma + images caméras
══════════════════════════════════════════════════════ */
function SurveillanceSection() {
  const [idx, setIdx] = useState(0);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const imgs   = [
    { src: "/camera-produit.jpg", alt: "Caméra solaire Sotilma" },
    { src: "/QT-02T图三.png",      alt: "Caméra Sotilma vue 2"   },
    { src: "/QT-02T图五.png",      alt: "Caméra Sotilma vue 3"   },
    { src: "/QT-02T图六.png",      alt: "Caméra Sotilma vue 4"   },
  ];
  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % imgs.length), 3500);
    return () => clearInterval(t);
  }, [imgs.length]);

  const features = [
    {
      num: "01",
      label: "Vision 24/7",
      desc:  "Surveillance continue de vos cultures jour et nuit avec vision infrarouge.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-11 h-11">
          <circle cx="24" cy="24" r="18"/>
          <circle cx="24" cy="24" r="6"/>
          <circle cx="24" cy="24" r="2" fill="currentColor"/>
        </svg>
      ),
    },
    {
      num: "02",
      label: "Alertes instantanées",
      desc:  "Notifications en temps réel sur votre smartphone en cas d'anomalie détectée.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-11 h-11">
          <path d="M24 4L4 24h10v18h20V24h10L24 4z"/>
          <circle cx="24" cy="32" r="4" fill="currentColor"/>
        </svg>
      ),
    },
    {
      num: "03",
      label: "100% solaire",
      desc:  "Alimentation autonome par énergie solaire. Fonctionne sans électricité.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-11 h-11">
          <circle cx="24" cy="24" r="10"/>
          <path d="M24 4v6M24 38v6M4 24h6M38 24h6M10 10l4 4M34 34l4 4M10 34l4-4M34 10l4-4"/>
          <circle cx="24" cy="24" r="4" fill="currentColor"/>
        </svg>
      ),
    },
    {
      num: "04",
      label: "Stockage cloud",
      desc:  "Enregistrement et accès sécurisé à vos images depuis n'importe où.",
      icon: (
        <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-11 h-11">
          <path d="M4 16c0-4 4-8 8-8 0-6 6-10 12-10s12 4 12 10c4 0 8 4 8 8v16c0 4-4 8-8 8H12c-4 0-8-4-8-8V16z"/>
          <path d="M24 28v8M20 36h8"/>
        </svg>
      ),
    },
  ];

  return (
    <section ref={ref} style={{ backgroundColor: BGLIGHT, borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">

      

        {/* 4 cartes style "Designed for you" Solari */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {features.map((f, i) => (
            <motion.div key={f.label}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-7 hover:-translate-y-1 transition-all duration-300"
              style={{ border: "1px solid #E0E8F0", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>

              {/* Icône outline — accent couleur */}
              <div style={{ color: BLUE }}>{f.icon}</div>

              {/* Séparateur court gris */}
              <div style={{ width: 36, height: 1, backgroundColor: "#CDD6E0", margin: "18px 0 14px" }} />

              {/* Numéro + label en small caps */}
              <p className="font-medium tracking-[0.15em] uppercase mb-2"
                style={{ fontSize: "0.72rem", color: DARK }}>
                <span style={{ color: BLUE }}>{f.num}.&nbsp; </span>{f.label}
              </p>

              {/* Séparateur court gris */}
              <div style={{ width: 28, height: 1, backgroundColor: "#CDD6E0", margin: "10px 0 14px" }} />

              {/* Description */}
              <p className="text-sm leading-relaxed" style={{ color: MID, lineHeight: 1.75 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Section images caméras avec carrousel */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Col 1 — texte */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center">
            <h2 className="font-normal mb-0" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: DARK, letterSpacing: "-0.02em" }}>
              Découvrez notre <span style={{ color: BLUE }}>caméra solaire</span>
            </h2>
            <div style={{ width: 52, height: 3, backgroundColor: BLUE, borderRadius: 2, margin: "16px 0 24px" }} />
            <p className="text-base mb-6" style={{ color: MID, lineHeight: 1.85 }}>
              Notre caméra agricole connectée offre une surveillance HD 24h/24, alimentée 100% par énergie solaire avec alertes instantanées et stockage cloud sécurisé.
            </p>
            <div className="flex gap-2 mb-8">
              {imgs.map((_, i) => (
                <button key={i} onClick={() => setIdx(i)}
                  className="rounded-full transition-all duration-300"
                  style={{ width: idx === i ? 32 : 10, height: 10, backgroundColor: idx === i ? BLUE : "#D0D8E4" }} />
              ))}
            </div>
            <Btn href="/boutique">Découvrir la caméra</Btn>
          </motion.div>

          {/* Col 2 — image principale avec carrousel */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="relative"
            style={{ aspectRatio: "4/3", overflow: "hidden" }}>
            <AnimatePresence mode="wait">
              <motion.div key={idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }} className="absolute inset-0">
                <Image src={imgs[idx].src} alt={imgs[idx].alt} fill className="object-cover" sizes="800px" />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   7. APP BANNER
══════════════════════════════════════════════════════ */
function AppBanner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }} className="w-full overflow-hidden" style={{ borderTop: "1px solid #E8ECF1" }}>
      <div className="relative w-full" style={{ aspectRatio: "1540/780" }}>
        <Image src="/app-banner.jpg" alt="Votre ferme dans votre poche" fill className="object-cover" sizes="100vw" priority />
      </div>
    </motion.section>
  );
}


/* ─── Image Carousel Component ─────────────────────────── */
function ImageCarousel({ images, label }: { images: string[], label: string }) {
  const [currentIndex, setCurrentIndex] = useState(0); // Carousel with auto-transition

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          <Image
            src={images[currentIndex]}
            alt={`${label} ${currentIndex + 1}`}
            fill
            className="object-cover"
            sizes="600px"
          />
        </motion.div>
      </AnimatePresence>
      
      {/* Indicateurs de position */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-white" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   SHOWCASE CAROUSEL — style Solari "Unlimited Page Layouts"
   Carrousel 3D en éventail : carte centrale grande + cartes
   latérales réduites et décalées derrière
══════════════════════════════════════════════════════ */
function ShowcaseCarousel() {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const slides = [
    {
      label: "Vanne Sotilma",
      sub:   "Irrigation connectée & automatique",
      img:   "/PHOTO-2025-01-30-16-11-59 (1).jpg",
      tag:   "Automatique",
      href:  "/boutique?categorie=vanne-automatique",
      cover: true,
    },
    {
      label: "Sotilma Mobile",
      sub:   "Pompage solaire haute performance",
      img:   "https://static.wixstatic.com/media/75ad33_d6b2d0183e4d4330a41fba9beb5cf680~mv2.png/v1/fill/w_282,h_426,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/image-removebg-preview%20(21).png",
      tag:   "Solaire",
      href:  "/boutique?categorie=pompe",
      cover: false,
    },
    {
      label: "Caméra Agricole",
      sub:   "Surveillance 24/7 de vos cultures",
      img:   "/camera-agricole-1.jpg",
      tag:   "Connectée",
      href:  "/boutique?categorie=camera",
      cover: true,
    },
  ];

  const prev = () => setActive((p) => (p - 1 + slides.length) % slides.length);
  const next = () => setActive((p) => (p + 1) % slides.length);

  const openLightbox = (slide: any) => {
    setLightboxImage(slide.img);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  // Animation automatique carousel rotatif avec effet de profondeur
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % slides.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [slides.length]);

  /* position de chaque carte par rapport à l'active pour effet rotation automatique avec profondeur */
  function getStyle(i: number): React.CSSProperties {
    const dist = ((i - active + slides.length) % slides.length + slides.length) % slides.length;
    const normalized = dist <= slides.length / 2 ? dist : dist - slides.length;

    if (normalized === 0) {
      // Image au premier plan - taille normale, opacité complète
      return { transform: "translateX(0) scale(1) translateZ(0)", zIndex: 10, opacity: 1 };
    }
    if (Math.abs(normalized) === 1) {
      // Deuxième plan - légèrement plus petite, opacité réduite
      const x = normalized * 45;
      return { transform: `translateX(${x}%) scale(0.90) translateZ(-80px)`, zIndex: 5, opacity: 0.85 };
    }
    // Troisième plan et plus - encore plus petite, opacité plus faible
    const x = normalized * 70;
    return { transform: `translateX(${x}%) scale(0.80) translateZ(-150px)`, zIndex: 1, opacity: 0.65 };
  }

  return (
    <section ref={ref} className="bg-white py-10 overflow-hidden" style={{ borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <SectionHeading
            label="Nos gammes"
            title=""
          />
        </motion.div>

        {/* Conteneur carousel rotatif automatique avec effet de profondeur */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative flex items-center justify-center"
          style={{ perspective: "2000px", height: 700 }}
        >
          {slides.map((s, i) => (
            <div key={s.label}
              className="absolute w-full max-w-md cursor-pointer transition-all duration-800 ease-in-out"
              style={getStyle(i)}
              onClick={() => openLightbox(s)}>

                {/* Mini carte — style Solari */}
                <div className="rounded-2xl overflow-hidden"
                  style={{ boxShadow: active === i ? "0 20px 60px rgba(0,0,0,0.15)" : "0 4px 24px rgba(0,0,0,0.08)", border: "1px solid #E8ECF1" }}>

                  {/* Contenu de la carte - image pleine */}
                  <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
                    <Image src={s.img} alt={s.label} fill
                      className={s.cover ? "object-cover" : "object-contain p-6"} sizes="600px" />
                  </div>

                  {/* Section titre en bas */}
                  <div className="absolute bottom-0 left-0 right-0 px-5 py-3 bg-gradient-to-t from-black/70 to-transparent">
                    <p className="font-normal text-white" style={{ fontSize: "1.1rem" }}>{s.label}</p>
                  </div>
                </div>
            </div>
          ))}
        </motion.div>

      </div>

      {/* Lightbox pour afficher l'image en grand */}
      <Lightbox
        src={lightboxImage}
        alt={lightboxImage ? "Image en grand format" : ""}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
      />
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   9. SOLUTIONS BANNER
══════════════════════════════════════════════════════ */
function SolutionsBanner() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.section ref={ref} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7 }} className="w-full overflow-hidden" style={{ borderTop: "1px solid #E8ECF1" }}>
      <div className="relative w-full" style={{ aspectRatio: "16/5" }}>
        <Image src="/solutions-banner.jpg" alt="Gérer votre eau, notre priorité — Sotilma"
          fill className="object-cover" sizes="100vw" />
      </div>
    </motion.section>
  );
}


/* ══════════════════════════════════════════════════════
   FAQ — style Solari : accordéon fond gris + cercle "+"
══════════════════════════════════════════════════════ */
function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const items = [
    {
      q: "Comment fonctionne la vanne connectée Sotilma ?",
      a: "La vanne Sotilma se connecte à votre réseau Wi-Fi ou GSM et se pilote depuis l'application mobile. Vous pouvez ouvrir, fermer, programmer et surveiller votre consommation d'eau en temps réel, depuis n'importe où.",
    },
    {
      q: "Les équipements fonctionnent-ils sans électricité du réseau ?",
      a: "Oui. Tous nos produits sont conçus pour fonctionner à l'énergie solaire. Panneaux photovoltaïques intégrés ou dédiés — aucune dépendance au réseau électrique classique.",
    },
    {
      q: "Comment installer le Sotilma Mobile sur mon exploitation ?",
      a: "Le Sotilma Mobile est livré prêt à l'emploi avec son châssis roulant. Une équipe technique Sotilma peut assurer l'installation et la mise en service sur site. Contactez-nous pour organiser une intervention.",
    },
    {
      q: "Comment obtenir un devis ou une démonstration ?",
      a: "Remplissez notre formulaire de contact ou écrivez-nous sur WhatsApp. Nous revenons vers vous sous 24 heures ouvrées avec un devis personnalisé adapté à votre exploitation.",
    },
  ];

  return (
    <section ref={ref} className="py-10 bg-white" style={{ borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <SectionHeading
            title="Une question ?"
            subtitle="Parcourez la FAQ ci-dessous ou contactez notre support pour en savoir plus sur Sotilma."
          />
        </motion.div>

        <div className="space-y-3">
          {items.map((item, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 14 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}>

              {/* Item accordion — style Solari */}
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#F4F5F7" }}>
                <button
                  className="w-full flex items-center justify-between px-7 py-5 text-left group"
                  onClick={() => setOpen(open === i ? null : i)}>
                  <span className="font-normal pr-6" style={{ fontSize: "1rem", color: DARK }}>
                    {item.q}
                  </span>
                  {/* Cercle "+" style Solari */}
                  <div className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{ backgroundColor: open === i ? BLUE : `${BLUE}22`, color: open === i ? "#FFF" : BLUE }}>
                    <svg className="w-4 h-4 transition-transform duration-300" style={{ transform: open === i ? "rotate(45deg)" : "rotate(0)" }}
                      fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </button>

                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden">
                      <p className="px-7 pb-5 text-sm leading-relaxed" style={{ color: MID, lineHeight: 1.8 }}>
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}


/* ── WhatsApp FAB ─────────────────────────────────────── */
function WhatsAppFab() {
  return (
    <a href="https://web.whatsapp.com/send?phone=221770982290&text=Bonjour%20Sotilma%2C%20je%20souhaite%20avoir%20des%20informations"
      target="_blank" rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 font-normal text-xs pl-3.5 pr-5 py-3.5 rounded-full transition-all duration-300 hover:-translate-y-0.5"
      style={{ backgroundColor: "#25D366", color: "#FFFFFF", boxShadow: "0 8px 24px rgba(37,211,102,0.35)" }}>
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}

/* ── PAGE ─────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <HeroText />
      <SolutionsGrid />
      <DesignedForYou />
      <FullWidthImage />
      <MobileHero />
      <SmartValvesSection />
      <SurveillanceSection />
      <ShowcaseCarousel />
      <FaqSection />
      <WhatsAppFab />
    </>
  );
}
