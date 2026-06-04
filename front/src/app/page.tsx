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

/* ─── Boutons ────────────────────────────────────── */
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
        <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          className="mb-3 max-w-2xl mx-auto font-semibold"
          style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.4rem)", color: "#FFFFFF", lineHeight: 1.25, letterSpacing: "-0.01em" }}>
          Automatisez votre exploitation agricole grâce à l&apos;énergie solaire et au contrôle à distance
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
          className="mb-6 max-w-lg mx-auto"
          style={{ fontSize: "1rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.7 }}>
          Surveillance, irrigation et pompage intelligents pour les agriculteurs africains.
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
   3. NOS SOLUTIONS — grille 3 cartes style Solari section 2
══════════════════════════════════════════════════════ */
const CAMERA_SLIDES = ["/c2.png", "/camera V2.png"];
const VANNE_SLIDES = [
  "https://static.wixstatic.com/media/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png",
  "https://static.wixstatic.com/media/75ad33_d3b8626a84fc4e0cad8f3e38a2cf871d~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_d3b8626a84fc4e0cad8f3e38a2cf871d~mv2.png",
  "https://static.wixstatic.com/media/75ad33_7e11dfdbf9d54db99f3fbded4aa4efab~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_7e11dfdbf9d54db99f3fbded4aa4efab~mv2.png",
  "https://static.wixstatic.com/media/75ad33_2469b961487c44acaba3b385b8d04c99~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_2469b961487c44acaba3b385b8d04c99~mv2.png",
  "https://static.wixstatic.com/media/75ad33_460bf654f01c4839ab8df296a9196153~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_460bf654f01c4839ab8df296a9196153~mv2.png",
];
const ARROSEUR_SLIDES = [
  "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png",
];

function SolutionsGrid() {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-60px" });
  const [vanneIdx,    setVanneIdx]    = useState(0);
  const [arroseurIdx, setArroseurIdx] = useState(0);
  const [camIdx,      setCamIdx]      = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [v2Idx, setV2Idx] = useState(0);

  const v2Slides = ["/camera V2.png", "/images.jfif"];

  useEffect(() => {
    const t1 = setInterval(() => setVanneIdx((i)    => (i + 1) % VANNE_SLIDES.length),    3000);
    const t2 = setInterval(() => setArroseurIdx((i) => (i + 1) % ARROSEUR_SLIDES.length), 2800);
    const t3 = setInterval(() => setCamIdx((i)      => (i + 1) % CAMERA_SLIDES.length),   3500);
    const t4 = setInterval(() => setV2Idx((i)       => (i + 1) % v2Slides.length),        3200);
    return () => { clearInterval(t1); clearInterval(t2); clearInterval(t3); clearInterval(t4); };
  }, [v2Slides.length]);

  const solutions = [
    { href: "/boutique?categorie=camera",     label: "Caméra Agricole",    sub: "Surveillance 24/7 de vos cultures",      slides: CAMERA_SLIDES,   activeIdx: camIdx      },
    { href: "/boutique?categorie=irrigation", label: "Pompe Mobile",        sub: "Système de pompage solaire mobile haute performance pour une agriculture intelligente.", slides: ARROSEUR_SLIDES, activeIdx: arroseurIdx },
    { href: "/boutique?categorie=vanne",      label: "Vannes connectées",  sub: "Ouvrez et fermez vos vannes à distance, programmez vos arrosages, mesurez votre consommation d'eau. Irrigation automatique.", slides: VANNE_SLIDES,    activeIdx: vanneIdx    },
  ];

  const v1Feats = ["Pilotable via téléphone","Motorisée 360°","100 % solaire","SIM 4G","Vision nocturne","Garantie 6 mois"];
  const v2Feats = ["Pilotable avec votre téléphone","Caméra motorisée 360°","Sécurité renforcée","Fonctionne en 100 % solaire","Supporte la carte SIM 4G","Haut-parleurs et micros intégrés","Vision nocturne","Couverture 0 – 1 hectare","Garantie 6 mois"];

  const staticProducts = [
    { label: "Pompe\nMobile",      sub: "Pompage solaire haute performance",  img: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png", contain: true, href: "/boutique?categorie=irrigation" },
    { label: "Vannes\nConnectées", sub: "Irrigation automatique & pilotable", img: "https://static.wixstatic.com/media/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png", contain: true, href: "/boutique?categorie=vanne"      },
  ];

  const camCarousel = [
    { img: "/c2.png",        label: "Caméra\nAgricole V1" },
    { img: "/camera V2.png", label: "Caméra\nAgricole V2" },
  ];

  return (
    <section ref={ref} className="py-8" style={{ backgroundColor: "#FFF", borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Titre */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.28em] uppercase mb-3" style={{ color: BLUE }}>Nos Solutions</p>
          <h2 className="font-normal leading-tight mb-2" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.2rem)", letterSpacing: "-0.02em", color: DARK }}>
            Des produits pensés pour l&apos;Afrique
          </h2>
          <div className="mx-auto mb-4" style={{ width: 52, height: 3, borderRadius: 2, backgroundColor: BLUE }} />
          <p style={{ color: MID, fontSize: "1rem" }}>Chaque solution est conçue pour fonctionner sans électricité, dans les zones les plus reculées.</p>
        </motion.div>

        {/* ── Grille 3 cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-14">

          {/* Caméra — carrousel V1/V2 */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex flex-col items-center">
            <Link href="/boutique?categorie=camera" className="group flex flex-col items-center">
              <div className="mb-3 transition-transform duration-300 group-hover:scale-105 relative"
                style={{ background: "#CBD5E1", padding: 1, borderRadius: 12 }}>
                <div className="w-56 h-56 overflow-hidden relative"
                  style={{ backgroundColor: "#FFF", borderRadius: 10 }}>
                  <AnimatePresence mode="wait">
                    <motion.div key={camIdx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }} className="absolute inset-0">
                      <Image src={camCarousel[camIdx].img} alt={camCarousel[camIdx].label} fill
                        className="object-contain p-3" sizes="240px" />
                    </motion.div>
                  </AnimatePresence>
                  {/* Dots */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                    {camCarousel.map((_, i) => (
                      <div key={i} className="rounded-full transition-all duration-300"
                        style={{ width: i === camIdx ? 14 : 5, height: 5, backgroundColor: i === camIdx ? BLUE : "#CBD5E1" }} />
                    ))}
                  </div>
                </div>
              </div>
              <h3 className="font-bold text-center uppercase leading-tight"
                style={{ fontSize: "0.75rem", color: DARK, letterSpacing: "0.04em", whiteSpace: "pre-line" }}>
                {camCarousel[camIdx].label}
              </h3>
              <p className="text-center mt-0.5" style={{ fontSize: "0.62rem", color: MID }}>Surveillance 24/7</p>
            </Link>
          </motion.div>

          {/* Pompe + Vannes */}
          {staticProducts.map((p, i) => (
            <motion.div key={p.label}
              initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: (i + 1) * 0.1 }}
              className="flex flex-col items-center">
              <Link href={p.href} className="group flex flex-col items-center">
                <div className="mb-3 transition-transform duration-300 group-hover:scale-105"
                  style={{ background: "#CBD5E1", padding: 1, borderRadius: 12 }}>
                  <div className="w-56 h-56 flex items-center justify-center overflow-hidden"
                    style={{ backgroundColor: "#FFF", borderRadius: 10 }}>
                    <div className="relative w-full h-full">
                      <Image src={p.img} alt={p.label} fill
                        className={p.contain ? "object-contain p-3" : "object-cover"} sizes="240px" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-center uppercase leading-tight"
                  style={{ fontSize: "0.75rem", color: DARK, letterSpacing: "0.04em", whiteSpace: "pre-line" }}>
                  {p.label}
                </h3>
                <p className="text-center mt-0.5" style={{ fontSize: "0.62rem", color: MID }}>{p.sub}</p>
              </Link>
            </motion.div>
          ))}

        </div>


      </div>

      <Lightbox src={lightboxSrc} alt={lightboxSrc} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
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

  const COLORS = ["#1E72B8", "#E67E22", "#1A9E3F", "#8B5CF6"];

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
    <section ref={ref} style={{ backgroundColor: "#FFF", borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <SectionHeading
            label="Pourquoi Sotilma"
            title=""
            subtitle="Sotilma offre une gamme de solutions adaptées à chaque type d'exploitation agricole."
          />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4">
          {features.map((f, i) => (
            <motion.div key={f.label}
              initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className="bg-white rounded-2xl p-6 flex flex-col"
              style={{ border: `1px solid ${COLORS[i]}33`, boxShadow: `0 4px 20px ${COLORS[i]}18`, borderTop: `3px solid ${COLORS[i]}` }}>

              {/* Titre */}
              <p className="font-semibold mb-2" style={{ fontSize: "0.88rem", color: DARK }}>
                {f.label}
              </p>

              {/* Description */}
              <p style={{ fontSize: "0.76rem", color: MID, lineHeight: 1.75 }}>
                {f.desc}
              </p>

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
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const steps = [
    {
      num: "01",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="6" x2="15" y2="6"/><circle cx="12" cy="17" r="1"/>
        </svg>
      ),
      label: "Téléchargez l'application",
      desc: "Disponible gratuitement sur Android et iOS. Créez votre compte agriculteur en quelques secondes.",
      color: BLUE,
    },
    {
      num: "02",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/>
        </svg>
      ),
      label: "Connectez vos équipements",
      desc: "Associez vos pompes, vannes, caméras et compteurs Sotilma en scannant leur QR code.",
      color: "#1A9E5F",
    },
    {
      num: "03",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>
        </svg>
      ),
      label: "Surveillez en temps réel",
      desc: "Accédez aux données live de vos champs — consommation d'eau, état des cultures, vidéo en direct.",
      color: "#E67E22",
    },
    {
      num: "04",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
          <circle cx="12" cy="12" r="3"/><path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83"/>
        </svg>
      ),
      label: "Pilotez à distance",
      desc: "Déclenchez l'arrosage, fermez une vanne, activez une alerte — depuis n'importe où en Afrique.",
      color: BLUE,
    },
  ];

  const screens = [
    { src: "/Capture_d_écran_2026-06-03_132348-removebg-preview.png", rotate: 0 },
  ];

  const [activeScreen, setActiveScreen] = useState(0);
  const nS = screens.length;

  useEffect(() => {
    const t = setInterval(() => setActiveScreen(i => (i + 1) % nS), 3500);
    return () => clearInterval(t);
  }, [nS]);

  const getScreenAnim = (pos: number) => {
    if (pos === 0)      return { x: 0,    scale: 1,    opacity: 1,    zIndex: 10 };
    if (pos === 1)      return { x: 210,  scale: 0.86, opacity: 0.6,  zIndex: 5  };
    if (pos === nS - 1) return { x: -210, scale: 0.86, opacity: 0.6,  zIndex: 5  };
    return                { x: 0,    scale: 0.7,  opacity: 0,    zIndex: 1  };
  };

  return (
    <section ref={ref} style={{ backgroundColor: "white", borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-16 py-10">

        {/* En-tête centré */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-8">
          <p className="text-xs font-medium tracking-[0.28em] uppercase mb-2" style={{ color: BLUE }}>Application mobile</p>
          <div className="mx-auto" style={{ width: 40, height: 2, borderRadius: 2, backgroundColor: BLUE, margin: "8px auto 14px" }} />
          <p className="mx-auto max-w-lg" style={{ fontSize: "0.85rem", color: MID, lineHeight: 1.7 }}>
            L&apos;application centrale pour connecter, surveiller et piloter l&apos;ensemble de vos équipements agricoles Sotilma — depuis votre smartphone, partout en Afrique.
          </p>
        </motion.div>

        {/* Corps : processus à gauche, screenshot à droite */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Schéma de processus */}
          <motion.div initial={{ opacity: 0, x: -24 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="flex flex-col gap-0">
              {steps.map((s, i) => (
                <motion.div key={s.num}
                  initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
                  className="flex gap-3 items-stretch">
                  <div className="flex flex-col items-center" style={{ minWidth: 32 }}>
                    <div className="flex items-center justify-center rounded-full w-8 h-8 shrink-0"
                      style={{ backgroundColor: s.color, color: "#FFF", fontSize: "0.62rem", fontWeight: 700 }}>
                      {s.num}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="flex-1 w-px my-1" style={{ backgroundColor: "#E8ECF1", minHeight: 20 }} />
                    )}
                  </div>
                  <div className="pb-4">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span style={{ color: s.color, fontSize: "0.8rem" }}>{s.icon}</span>
                      <p className="font-semibold" style={{ fontSize: "0.78rem", color: DARK }}>{s.label}</p>
                    </div>
                    <p style={{ fontSize: "0.7rem", color: MID, lineHeight: 1.6 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image app */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center items-center">
            <div className="relative" style={{ width: "70%", maxWidth: 280, aspectRatio: "1/1" }}>
              <Image src={screens[0].src} alt="Sotilma Mobile" fill className="object-contain" sizes="300px" />
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}


/* ══════════════════════════════════════════════════════
   6. SURVEILLANCE — même style que Pourquoi Sotilma + images caméras
══════════════════════════════════════════════════════ */
function SurveillanceSection() {
  const [v1Idx, setV1Idx]             = useState(0);
  const [lightboxSrc, setLightboxSrc] = useState("");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const v1Slides = [
    "/c2.png",
    "/WhatsApp Image 2025-01-26 at 19.05.52.jpeg",
    "/camera-agricole-2.jpg",
  ];

  const features = [
    "Pilotable avec votre téléphone",
    "Caméra motorisée 360°",
    "Sécurité renforcée",
    "Fonctionne en 100 % solaire",
    "Supporte la carte SIM 4G",
    "Haut-parleurs et micros intégrés",
    "Vision nocturne",
    "Couverture 0 – 1 hectare",
    "Garantie 6 mois",
  ];

  useEffect(() => {
    const t = setInterval(() => setV1Idx(p => (p + 1) % v1Slides.length), 3000);
    return () => clearInterval(t);
  }, [v1Slides.length]);

  return (
    <section ref={ref} className="py-8" style={{ backgroundColor: "#FFF", borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Titre */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
          className="text-center mb-12">
          <h2 className="font-normal mb-3" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.02em", color: DARK }}>
            Nos caméras
          </h2>
          <div className="mx-auto" style={{ width: 52, height: 3, borderRadius: 2, backgroundColor: BLUE }} />
        </motion.div>

        {/* 2 fiches côte à côte */}
        <div className="grid sm:grid-cols-2 gap-8">

          {/* ── V1 ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative rounded-2xl overflow-hidden cursor-zoom-in group"
            style={{ aspectRatio: "4/3", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}>

            <AnimatePresence mode="wait">
              <motion.div key={v1Idx} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }} className="absolute inset-0"
                onClick={() => { setLightboxSrc(v1Slides[v1Idx]); setLightboxOpen(true); }}>
                <Image src={v1Slides[v1Idx]} alt="Caméra V1" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="500px" />
              </motion.div>
            </AnimatePresence>
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}>
              <span className="text-white text-sm font-semibold">Caméra V1</span>
            </div>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {v1Slides.map((_, i) => (
                <button key={i} onClick={e => { e.stopPropagation(); setV1Idx(i); }}
                  className="rounded-full transition-all duration-300"
                  style={{ width: i === v1Idx ? 16 : 6, height: 6, backgroundColor: i === v1Idx ? "#FFF" : "rgba(255,255,255,0.5)" }} />
              ))}
            </div>
          </motion.div>

          {/* ── V2 ── */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-2xl overflow-hidden cursor-zoom-in group"
            style={{ aspectRatio: "4/3", boxShadow: "0 4px 24px rgba(0,0,0,0.07)" }}
            onClick={() => { setLightboxSrc("/camera-agricole-1.jpg"); setLightboxOpen(true); }}>
            <Image src="/camera-agricole-1.jpg" alt="Caméra V2" fill className="object-cover transition-transform duration-500 group-hover:scale-105" sizes="500px" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
              style={{ background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 60%)" }}>
              <span className="text-white text-sm font-semibold">Caméra V2</span>
            </div>
          </motion.div>

        </div>
      </div>

      <Lightbox src={lightboxSrc} alt={lightboxSrc} isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
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
  const [active, setActive]           = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const slides = [
    {
      label: "Vanne Sotilma",
      sub:   "Irrigation connectée & automatique",
      img:   "/PHOTO-2025-01-30-16-11-59 (1).jpg",
      cover: true,
    },
    {
      label: "Caméra Agricole",
      sub:   "Surveillance 24/7 de vos cultures",
      img:   "/camera-agricole-1.jpg",
      cover: true,
    },
    {
      label: "Caméra Agricole V1",
      sub:   "Surveillance 24/7 de vos cultures",
      img:   "/camera-agricole-2.jpg",
      cover: true,
    },
  ];

  /* Rotation fixe et permanente de chaque carte */
  const TILTS = [-8, 8, -6];

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % slides.length), 3800);
    return () => clearInterval(t);
  }, [slides.length]);

  const getAnim = (i: number) => {
    const isActive = i === active;
    const side = i === 0 ? -1 : 1;
    return {
      x:       isActive ? 0   : side * 80,
      y:       isActive ? 0   : 30,
      scale:   isActive ? 1   : 0.82,
      opacity: isActive ? 1   : 0.62,
      zIndex:  isActive ? 10  : 4,
      rotate:  isActive ? 0   : TILTS[i],
    };
  };

  return (
    <section ref={ref} className="py-8 overflow-hidden" style={{ backgroundColor: "white", borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16">

        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <SectionHeading label="Plus d'informations" title="" />
        </motion.div>

        {/* Carrousel 2 cartes inclinées */}
        <div className="relative flex justify-center items-center" style={{ height: 600 }}>
          {slides.map((s, i) => {
            const anim = getAnim(i);
            return (
              <motion.div
                key={s.label}
                animate={{ x: anim.x, y: anim.y, scale: anim.scale, opacity: anim.opacity, zIndex: anim.zIndex, rotate: anim.rotate }}
                transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
                style={{ position: "absolute", width: 380, cursor: "pointer" }}
                onClick={() => { setActive(i); setLightboxImage(s.img); setLightboxOpen(true); }}
              >
                <div className="relative rounded-2xl overflow-hidden"
                  style={{
                    aspectRatio: "3/4",
                    boxShadow: i === active
                      ? "0 24px 56px rgba(0,0,0,0.22), 0 6px 16px rgba(0,0,0,0.10)"
                      : "0 6px 20px rgba(0,0,0,0.10)",
                    border: "1px solid #E8ECF1",
                    transition: "box-shadow 0.5s",
                  }}>
                  <Image src={s.img} alt={s.label} fill
                    className={s.cover ? "object-cover" : "object-contain p-4"} sizes="260px" />
                  <div className="absolute bottom-0 left-0 right-0 px-4 py-3">
                    <p className="font-semibold" style={{ fontSize: "0.9rem", color: DARK }}>{s.label}</p>
                    <p style={{ fontSize: "0.72rem", color: MID }}>{s.sub}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="rounded-full transition-all duration-300"
              style={{ width: i === active ? 22 : 8, height: 8, backgroundColor: i === active ? BLUE : "#CDD6E0" }} />
          ))}
        </div>

      </div>

      <Lightbox src={lightboxImage} alt={lightboxImage ? slides.find(s => s.img === lightboxImage)?.label ?? "" : ""}
        isOpen={lightboxOpen} onClose={() => setLightboxOpen(false)} />
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
              <div className="rounded-xl overflow-hidden" style={{ backgroundColor: "#F8F9FA", border: "1px solid #E8ECF1" }}>
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


/* ── CTA FINAL ───────────────────────────────────────── */
function CtaFinal() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <section ref={ref} style={{ background: `linear-gradient(135deg, #0C2340 0%, ${BLUE} 100%)`, borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-12 text-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
          <p className="text-xs font-medium tracking-[0.28em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.6)" }}>
            Sotilma
          </p>
          <h2 className="font-normal leading-tight mb-4 text-white"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3.4rem)", letterSpacing: "-0.02em" }}>
            Prêt à moderniser<br />votre exploitation&nbsp;?
          </h2>
          <div className="mx-auto mb-8" style={{ width: 52, height: 3, borderRadius: 2, backgroundColor: "rgba(255,255,255,0.45)" }} />
          <p className="mx-auto max-w-lg mb-10" style={{ color: "rgba(255,255,255,0.72)", fontSize: "1rem", lineHeight: 1.85 }}>
            Rejoignez les agriculteurs africains qui pilotent déjà leur exploitation depuis leur smartphone grâce aux solutions Sotilma.
          </p>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-wrap justify-center gap-4">
            <Link href="/contact"
              className="inline-flex items-center gap-2 font-medium text-sm px-8 py-3.5 rounded-full tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ backgroundColor: "#FFF", color: BLUE }}>
              Demander un devis
            </Link>
            <Link href="/boutique"
              className="inline-flex items-center gap-2 font-medium text-sm px-8 py-3.5 rounded-full tracking-wide transition-all duration-200 hover:opacity-90 hover:-translate-y-0.5"
              style={{ border: "2px solid rgba(255,255,255,0.7)", color: "#FFF" }}>
              Acheter maintenant
            </Link>
          </motion.div>
        </motion.div>
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

/* ══════════════════════════════════════════════════════
   POMPE MOBILE — section accueil
══════════════════════════════════════════════════════ */
function PompeMobileSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const specs = [
    { icon: "☀️", label: "Puissance Solaire", value: "1800W" },
    { icon: "💧", label: "Débit Pompage",      value: "12 – 15 m³/h" },
    { icon: "🌿", label: "Jusqu'à",            value: "1 – 4 ha · HTM 60 m" },
  ];

  const offers = [
    { name: "SmA", tag: "SIMPLE",                         price: "958 000", color: "#1E72B8" },
    { name: "SmA+", tag: "AVEC CAMÉRA ET COMMANDE",       price: "998 000", color: "#1A9E3F" },
  ];

  return (
    <section ref={ref} style={{ backgroundColor: "#FFF", borderTop: "1px solid #E8ECF1" }}>
      <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16 py-10">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
          className="text-center mb-8">
          <h2 className="font-black uppercase leading-none" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", color: "#1E72B8", letterSpacing: "0.02em" }}>
            Sotilma Mobile
          </h2>
          <p className="text-xs font-semibold tracking-[0.28em] uppercase mb-2" style={{ color: "#5A6B7A" }}>
            Pour ceux qui ont des puits ou forages
          </p>
          <p className="font-semibold tracking-[0.18em] uppercase text-xs" style={{ color: "#5A6B7A" }}>
            Pompage solaire mobile
          </p>
        </motion.div>

        {/* Specs */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}
          className="flex justify-center gap-0 mb-8 flex-wrap">
          {specs.map((s, i) => (
            <div key={s.label} className="flex items-center gap-3 px-6 py-3" style={{ borderRight: i < specs.length - 1 ? "1px solid #DDE6F0" : "none" }}>
              <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
              <div>
                <p className="font-semibold uppercase" style={{ fontSize: "0.65rem", color: "#5A6B7A", letterSpacing: "0.1em" }}>{s.label}</p>
                <p className="font-black" style={{ fontSize: "0.95rem", color: "#111827" }}>{s.value}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Image produit */}
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.15 }}
          className="relative mx-auto rounded-2xl overflow-hidden mb-6 cursor-pointer"
          style={{ width: "55%", aspectRatio: "4/3" }}>
          <Image
            src="https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png"
            alt="Sotilma Mobile — Pompe solaire"
            fill className="object-contain" sizes="500px" priority />
        </motion.div>

        {/* Tarifs + CTA */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: "#EEF5FB", border: "1px solid #C8DCF0" }}>
            <span className="font-black text-sm" style={{ color: "#1E72B8" }}>SmA</span>
            <span className="font-black text-sm" style={{ color: "#111827" }}>958 000 FCFA</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: "#EDFAF3", border: "1px solid #A7DFC0" }}>
            <span className="font-black text-sm" style={{ color: "#1A9E3F" }}>SmA+</span>
            <span className="font-black text-sm" style={{ color: "#111827" }}>998 000 FCFA</span>
          </div>
          <Btn href="/boutique?categorie=irrigation">Commander</Btn>
        </motion.div>

      </div>
    </section>
  );
}

/* ── PAGE ─────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <HeroText />
      <SolutionsGrid />
      <DesignedForYou />
      <PompeMobileSection />
      <MobileHero />
      <ShowcaseCarousel />
      <FaqSection />
      <WhatsAppFab />
    </>
  );
}
