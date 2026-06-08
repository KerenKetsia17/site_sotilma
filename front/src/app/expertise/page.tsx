import type { Metadata } from "next";
import Image from "next/image";
import { domainesExpertise } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Expertise",
  description: "Découvrez les domaines d'expertise Sotilma : irrigation, industrie, gestion de ferme agricole.",
};

const BLUE   = "#1E72B8";
const TEXT_D = "#0D2235";
const TEXT_M = "#4A6278";
const LIGHT  = "#F5F9FD";
const features = [
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1M4.22 4.22l.71.71m13.66 13.66.71.71M3 12H2m20 0h-1M4.22 19.78l.71-.71M18.36 5.64l.71-.71"/><circle cx="12" cy="12" r="4"/></svg>),
    title: "Énergie solaire",
    desc: "Alimentation 100 % solaire, aucune facture d'électricité.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/></svg>),
    title: "Contrôle à distance",
    desc: "Pilotage via smartphone, partout, même sans internet.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>),
    title: "Fiabilité industrielle",
    desc: "Certifié IP67, résistant aux conditions extrêmes.",
  },
  {
    icon: (<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>),
    title: "Données en temps réel",
    desc: "Monitoring et alertes instantanées sur vos installations.",
  },
];

export default function ExpertisePage() {
  return (
    <main className="overflow-hidden bg-white">

      {/* ── HERO ── */}
      <section className="relative" style={{ backgroundColor: LIGHT }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <div className="grid lg:grid-cols-2 gap-6 items-center">

            <Reveal from="left">
              <h1 className="font-normal leading-tight mb-4" style={{ 
                fontSize: "clamp(1.6rem, 3.5vw, 2.8rem)", 
                color: TEXT_D, 
                letterSpacing: "-0.02em" 
                }}>

                Des solutions expertes pour{" "}
                <span style={{ color: BLUE }}>chaque défi hydraulique</span>
              </h1>
              <p className="text-base leading-relaxed mb-6" style={{ color: TEXT_M, lineHeight: 1.8, maxWidth: 420 }}>
                Irrigation agricole, industrie, gestion de ferme agricole — Sotilma déploie des technologies connectées et solaires adaptées à chaque secteur.
              </p>
              
            </Reveal>

            <Reveal from="right" delay={0.15}>
              <div className="grid grid-cols-3 gap-4">
                {domainesExpertise.slice(0, 3).map((d) => (
                  <div key={d.id} className="relative overflow-hidden" style={{ aspectRatio: "3/4", borderRadius: 8 }}>
                    <Image src={d.image} alt={d.title} fill className="object-cover transition-transform duration-500 hover:scale-105" sizes="30vw" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,34,53,0.5) 0%, transparent 60%)" }} />
                    <span className="absolute bottom-4 left-4 right-4 text-xs font-medium text-white uppercase tracking-wider leading-tight">{d.title}</span>
                  </div>
                ))}
              </div>
            </Reveal>

          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section style={{ backgroundColor: LIGHT, borderTop: "1px solid #E8EFF6", borderBottom: "1px solid #E8EFF6" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 py-10">
          <div className="grid lg:grid-cols-2 gap-8 items-center">

            <Reveal from="left">
              <h2 className="font-normal leading-tight mb-3" style={{ fontSize: "clamp(1.4rem, 3vw, 2.2rem)", letterSpacing: "-0.02em", color: TEXT_D }}>
                Pourquoi choisir les solutions <span style={{ color: BLUE }}>Sotilma</span> ?
              </h2>
              <p className="text-base mb-0" style={{ color: TEXT_M, lineHeight: 1.8 }}>
                Une technologie accessible, durable et pilotable depuis votre téléphone.
              </p>
            </Reveal>

            <div className="grid grid-cols-2 gap-3">
              {features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.1}>
                  <div className="p-4 bg-white h-full" style={{ border: "1px solid #E8EFF6", borderRadius: 6 }}>
                    <div className="mb-3" style={{ color: BLUE }}>{f.icon}</div>
                    <p className="font-medium text-sm mb-1" style={{ color: TEXT_D }}>{f.title}</p>
                    <p className="text-sm" style={{ color: TEXT_M, lineHeight: 1.6 }}>{f.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      

    </main>
  );
}
