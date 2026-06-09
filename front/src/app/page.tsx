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

// 1. HERO — plein écran style Solari
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
          Automatisez votre exploitation agricole grâce au contrôle à distance
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
          className="mb-6 max-w-lg mx-auto"
          style={{ fontSize: "1rem", color: "rgba(255,255,255,0.78)", lineHeight: 1.7 }}>
          Surveillance, irrigation et pompage intelligents pour les agriculteurs.
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
      label: "IA BAYKAT",
      desc:  "Avec BAYKAT, gérez efficacement votre consommation d'eau et prenez des décisions d'arrosage basées sur des données fiables.",
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

// WhatsApp FAB
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


// CAMERA SOTILMA — section accueil
function CameraAgricoleSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const specs = [
    { icon: "☀️", label: "Alimentation",  value: "100% solaire" },
    { icon: "🤖", label: "Sécurité",      value: "Surveillance IA en continu" },
    { icon: "📐", label: "Couverture",    value: "Jusqu'à 1 ha" },
  ];

  return (
      <section ref={ref} style={{ backgroundColor: "#FFF", borderTop: "1px solid #E8ECF1" }}>
        {/* Titre */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
                    className="text-center mb-12">
          <p className="text-xs font-medium tracking-[0.28em] uppercase mb-3" style={{ color: BLUE }}>Nos Solutions</p>
          <h2 className="font-normal leading-tight mb-2" style={{ fontSize: "clamp(1.9rem, 4.2vw, 3.2rem)", letterSpacing: "-0.02em", color: DARK }}>
            Des produits pensés pour vous
          </h2>
          <div className="mx-auto mb-4" style={{ width: 52, height: 3, borderRadius: 2, backgroundColor: BLUE }} />
          <p style={{ color: MID, fontSize: "1rem" }}>Chaque solution est conçue pour fonctionner sans électricité, dans les zones les plus reculées.</p>
        </motion.div>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Bloc Texte */}
            <div className="flex flex-col items-center text-center">

              {/* Header */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
              >
                <h2
                    className="font-black uppercase leading-none"
                    style={{
                      fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                      color: "#1E72B8",
                      letterSpacing: "0.02em",
                    }}
                >
                  Caméra Sotilma
                </h2>

                <p
                    className="font-semibold tracking-[0.18em] uppercase text-xs mt-2"
                    style={{ color: "#5A6B7A" }}
                >
                  Caméra agro-industrielle
                </p>
              </motion.div>

              {/* Specs */}
              <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-8 w-full"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:justify-center">
                  {specs.map((s) => (
                      <div
                          key={s.label}
                          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 lg:flex-1 lg:justify-start lg:rounded-none lg:border-0 lg:border-r lg:bg-transparent lg:px-6 lg:py-3"
                      >
                        <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>

                        <div className="text-left">
                          <p
                              className="font-semibold uppercase"
                              style={{
                                fontSize: "0.65rem",
                                color: "#5A6B7A",
                                letterSpacing: "0.1em",
                              }}
                          >
                            {s.label}
                          </p>

                          <p
                              className="font-black"
                              style={{
                                fontSize: "0.95rem",
                                color: "#111827",
                              }}
                          >
                            {s.value}
                          </p>
                        </div>
                      </div>
                  ))}
                </div>
              </motion.div>
                <Btn href="/boutique?categorie=camera">
                  VOIR PLUS
                </Btn>

            </div>

            {/* Bloc Image */}
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex w-full justify-center items-center order-first lg:order-last"
            >
              <div
                  className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px]"
                  style={{
                    aspectRatio: "4/3",
                  }}
              >
                <Image
                    src="/v2.jpeg"
                    alt="Sotilma Caméra — Caméra agro-industrielle"
                    fill
                    className="object-contain"
                    sizes="500px"
                    priority
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>
  );
}

// POMPE MOBILE — section accueil
function PompeMobileSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const specs = [
    { icon: "☀️", label: "Puissance Solaire", value: "2000 - 4000W" },
    { icon: "💧", label: "Débit Pompage",      value: "45 – 90 m³/h" },
    { icon: "🌿", label: "Surface maximum",    value: "10 ha" },
  ];

  return (
      <section ref={ref} style={{ backgroundColor: "#FFF", borderTop: "1px solid #E8ECF1" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* Image */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex w-full justify-center items-center"
            >
              <div
                  className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px]"
                  style={{
                    aspectRatio: "4/3",
                  }}
              >
                <Image
                    src="https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png"
                    alt="Sotilma Mobile — Pompe solaire"
                    fill
                    className="object-contain"
                    sizes="500px"
                    priority
                />
              </div>
            </motion.div>

            {/* Bloc Texte — MODIFIÉ : Ajout des classes de centrage pour aligner le bouton */}
            <div className="flex flex-col items-center text-center">

              {/* Header */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
              >
                <h2
                    className="font-black uppercase leading-none"
                    style={{
                      fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                      color: "#1E72B8",
                      letterSpacing: "0.02em",
                    }}
                >
                  Sotilma Mobile
                </h2>

                <p
                    className="font-semibold tracking-[0.18em] uppercase text-xs mt-2"
                    style={{ color: "#5A6B7A" }}
                >
                  Pompe solaire mobile
                </p>
              </motion.div>

              {/* Specs */}
              <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-8 w-full"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:justify-center">
                  {specs.map((s) => (
                      <div
                          key={s.label}
                          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 lg:flex-1 lg:justify-start lg:rounded-none lg:border-0 lg:border-r lg:bg-transparent lg:px-6 lg:py-3"
                      >
                        <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>
                        <div className="text-left">
                          <p
                              className="font-semibold uppercase"
                              style={{
                                fontSize: "0.65rem",
                                color: "#5A6B7A",
                                letterSpacing: "0.1em",
                              }}
                          >
                            {s.label}
                          </p>
                          <p
                              className="font-black"
                              style={{
                                fontSize: "0.95rem",
                                color: "#111827",
                              }}
                          >
                            {s.value}
                          </p>
                        </div>
                      </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Btn href="/boutique?categorie=pack">
                  VOIR PLUS
                </Btn>
              </motion.div>

            </div>

          </div>
        </div>
      </section>
  );
}

// VANNE CONNECTEE — section accueil
function VanneConnecterSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const specs = [
    { icon: "☀️", label: "Alimentation",      value: "100% solaire" },
    { icon: "💧", label: "Contrôle Débit",    value: "Pilotable avec le telephone" },
    { icon: "🌿", label: "Surface irriguée",  value: "4 ha" },
  ];

  return (
      <section ref={ref} style={{ backgroundColor: "#FFF", borderTop: "1px solid #E8ECF1" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-12">
          {/* Conteneur principal en Grille */}
          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* 1. Bloc Contenu (Header + Specs) */}
            {/* order-1: s'affiche en premier sur mobile */}
            <div className="flex flex-col items-center text-center order-1 lg:order-none">

              {/* Header */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6 }}
                  className="mb-8"
              >
                <h2
                    className="font-black uppercase leading-none"
                    style={{
                      fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                      color: "#1E72B8",
                      letterSpacing: "0.02em",
                    }}
                >
                  Vanne Sotilma
                </h2>

                <p
                    className="font-semibold tracking-[0.18em] uppercase text-xs mt-2"
                    style={{ color: "#5A6B7A" }}
                >
                  Vanne connectée 4G
                </p>
              </motion.div>

              {/* Specs */}
              <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="mb-8 w-full"
              >
                <div className="flex flex-col gap-3 lg:flex-row lg:justify-center">
                  {specs.map((s) => (
                      <div
                          key={s.label}
                          className="flex items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 lg:flex-1 lg:justify-start lg:rounded-none lg:border-0 lg:border-r lg:bg-transparent lg:px-6 lg:py-3"
                      >
                        <span style={{ fontSize: "1.4rem" }}>{s.icon}</span>

                        <div className="text-left">
                          <p
                              className="font-semibold uppercase"
                              style={{
                                fontSize: "0.65rem",
                                color: "#5A6B7A",
                                letterSpacing: "0.1em",
                              }}
                          >
                            {s.label}
                          </p>

                          <p
                              className="font-black"
                              style={{
                                fontSize: "0.95rem",
                                color: "#111827",
                              }}
                          >
                            {s.value}
                          </p>
                        </div>
                      </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Btn href="/boutique?categorie=vanne">
                  VOIR PLUS
                </Btn>
              </motion.div>

            </div>

            {/* 2. Bloc Image de la Vanne */}
            {/* order-2: se place au milieu (sous les specs) sur mobile */}
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex w-full justify-center items-center order-2 lg:order-none"
            >
              <div
                  className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px]"
                  style={{
                    aspectRatio: "4/3",
                  }}
              >
                <Image
                    src="https://static.wixstatic.com/media/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png"
                    alt="Sotilma Vanne — Vanne connectee"
                    fill
                    className="object-contain"
                    sizes="500px"
                    priority
                />
              </div>

            </motion.div>

          </div>

          {/* 4. Bloc Flyer commercial (Plein écran en dessous) */}
          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center items-center w-full h-full mt-16"
          >
            <div
                className="relative w-full"
                style={{
                  aspectRatio: "16/9", // Format paysage idéal pour occuper l'espace en dessous de la grille
                  maxWidth: "1000px"
                }}
            >
              <Image
                  src="/flyer.jpeg"
                  alt="Sotilma — Flyer commercial"
                  fill
                  className="object-contain w-full h-full"
                  sizes="(max-width: 1024px) 100vw, 80vw"
                  priority
              />
            </div>
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
      <DesignedForYou />
      <MobileHero />
      <CameraAgricoleSection/>
      <PompeMobileSection />
      <VanneConnecterSection />
      <WhatsAppFab />
    </>
  );
}
