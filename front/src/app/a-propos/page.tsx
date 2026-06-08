import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez l'histoire de Sotilma, start-up sénégalaise dédiée à la gestion intelligente de l'eau.",
};

const BLUE   = "#1E72B8";
const LIGHT  = "#F5F9FD";
const TEXT_D = "#0D2235";
const TEXT_M = "#5A7A94";

const partners = [
  { name: "Orange",     logo: "https://static.wixstatic.com/media/75ad33_fd98e35c10b341a5bd2156e0f335348d~mv2.png/v1/fill/w_258,h_258,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_fd98e35c10b341a5bd2156e0f335348d~mv2.png" },
  { name: "EOAP",       logo: "https://static.wixstatic.com/media/75ad33_e9d531d5d8314a83a2126be3b0229f4f~mv2.png/v1/fill/w_428,h_138,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_e9d531d5d8314a83a2126be3b0229f4f~mv2.png" },
  { name: "World Bank", logo: "https://static.wixstatic.com/media/75ad33_03b5a101d1f846e6b07423fdf39bc81e~mv2.png/v1/fill/w_564,h_114,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_03b5a101d1f846e6b07423fdf39bc81e~mv2.png" },
  { name: "Heifer",     logo: "https://static.wixstatic.com/media/75ad33_0f5dc8b0b88e4b6dac0bd5c96cd1b0d9~mv2.jpeg/v1/fill/w_258,h_258,al_c,lg_1,q_80,enc_avif,quality_auto/75ad33_0f5dc8b0b88e4b6dac0bd5c96cd1b0d9~mv2.jpeg" },
];


/* Réalisations — images de terrain */
const realisations: { src: string | null; alt: string; label: string; className?: string }[] = [
  {
    src: "/r1.png",
    alt: "Installation technique",
    label: "Installation technique",
    className: "col-span-2 md:col-span-1 row-span-2 md:row-span-2"
  },
  {
    src: "/realisation-2.jpg",
    alt: "Réalisation terrain 2",
    label: "Projet d'irrigation",
    className: "col-span-1 md:col-span-1 row-span-1 md:row-span-1"
  },
  {
    src: "/PHOTO-2025-01-30-16-11-59 (1).jpg",
    alt: "Irrigation en action",
    label: "Irrigation en action",
    className: "col-span-1 md:col-span-1 row-span-1 md:row-span-1"
  },
  {
    src: "/equipe-terrain.jpg",
    alt: "Équipe sur le terrain",
    label: "Notre équipe en action",
    className: "col-span-2 md:col-span-2 row-span-1 md:row-span-1"
  },
  {
    src: "/realisation-4.jpg",
    alt: "Réalisation terrain 4",
    label: "Système d'irrigation",
    className: "col-span-1 md:col-span-1 row-span-1 md:row-span-1"
  },
  {
    src: "/realisation-5.jpg",
    alt: "Réalisation terrain 5",
    label: "Installation complète",
    className: "col-span-1 md:col-span-1 row-span-1 md:row-span-1"
  },
];

export default function AProposPage() {
  return (
    <main className="overflow-hidden bg-white">

      {/* ══ 1. HEADER — titre centré + barre bleue ══ */}
      <section className="bg-white" style={{ borderBottom: "1px solid #E8EFF6" }}>
        <div className="max-w-2xl mx-auto px-6 sm:px-10 py-10 text-center">
          <Reveal>
            <p className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3" style={{ color: BLUE }}>
              À PROPOS DE NOUS
            </p>
            <h1 className="font-normal leading-tight mb-0" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: TEXT_D }}>
              Ce que nous <span style={{ color: BLUE }}>faisons</span>
            </h1>
            <div className="mx-auto my-5" style={{ width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4 }} />
            <p className="text-base mb-4" style={{ color: TEXT_M, lineHeight: 1.9 }}>
              SOTILMA révolutionne la gestion de l&apos;eau dans l&apos;agriculture et l&apos;industrie en offrant
              des solutions intelligentes et automatisées. Grâce à notre technologie innovante, vous pouvez
              contrôler et optimiser l&apos;irrigation de votre ferme directement depuis votre smartphone,
              sans besoin d&apos;internet.
            </p>
            <p className="text-base mb-8" style={{ color: TEXT_M, lineHeight: 1.9 }}>
              Nos solutions sont conçues pour simplifier votre quotidien tout en maximisant l&apos;efficacité
              et la rentabilité de vos opérations — une start-up sénégalaise au service de l&apos;Afrique.
            </p>
            <Link href="/expertise"
              className="inline-flex items-center gap-2 font-medium text-sm px-8 py-3.5 transition-all hover:opacity-85"
              style={{ backgroundColor: BLUE, color: "#FFFFFF", borderRadius: 40 }}>
              EN SAVOIR PLUS
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ══ 3. NOTRE HISTOIRE ══ */}
      <section style={{ backgroundColor: LIGHT, borderBottom: "1px solid #E8EFF6" }}>
        <div className="max-w-2xl mx-auto px-6 sm:px-10 py-14">
          <Reveal>
            <div className="text-center mb-8">
              <p className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3" style={{ color: BLUE }}>
                NOTRE PARCOURS
              </p>
              <h2 className="font-normal leading-tight mb-0" style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: TEXT_D }}>
                Notre <span style={{ color: BLUE }}>histoire</span>
              </h2>
              <div className="mx-auto mt-4" style={{ width: 40, height: 3, backgroundColor: BLUE, borderRadius: 4 }} />
            </div>
          </Reveal>
          <div className="space-y-5 mt-8">
            <Reveal delay={0.1}>
              <p className="text-base" style={{ color: TEXT_M, lineHeight: 1.9 }}>
                Notre histoire a commencé avec une simple observation : la gestion de l&apos;eau, une ressource
                si précieuse, était souvent inefficace et source de gaspillage, particulièrement dans le secteur
                agricole. Au Sénégal, comme dans de nombreux autres pays africains, les agriculteurs faisaient face
                à des défis liés à la disponibilité de l&apos;eau, l&apos;irrégularité des précipitations et la
                difficulté de surveiller et d&apos;optimiser l&apos;irrigation.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base" style={{ color: TEXT_M, lineHeight: 1.9 }}>
                Face à ces défis, nous avons décidé d&apos;agir. Nous sommes partis d&apos;une idée ambitieuse :
                créer une solution technologique locale, adaptée aux réalités du terrain, pour aider les agriculteurs
                à mieux gérer leur eau et à maximiser leurs rendements. C&apos;est ainsi qu&apos;est née SOTILMA,
                une start-up sénégalaise dédiée à la conception et au développement de technologies de gestion de
                l&apos;eau.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-base" style={{ color: TEXT_M, lineHeight: 1.9 }}>
                Notre innovation repose sur une technologie de comptage d&apos;eau intelligente, intégrant des vannes
                autonomes fonctionnant à l&apos;énergie solaire. Ce système permet aux agriculteurs de contrôler
                l&apos;irrigation à distance, même sans connexion internet, grâce à une application mobile ou notre
                plateforme SOTILMA_Connect.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ 4. NOS RÉALISATIONS — galerie style Solari gallery ══ */}
      <section className="bg-white pb-16 md:pb-24" style={{ borderBottom: "1px solid #E8EFF6" }}>
        <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-14 pb-10 text-center">
          <Reveal>
            <p className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3" style={{ color: BLUE }}>
              GALERIE
            </p>
            <h2 className="font-normal leading-tight mb-0" style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: TEXT_D }}>
              Nos réalisations
            </h2>
            <div className="mx-auto my-4" style={{ width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4 }} />
            <p className="text-base mx-auto" style={{ color: TEXT_M, maxWidth: 480, lineHeight: 1.8 }}>
              Des installations déployées sur le terrain, au service des agriculteurs africains.
            </p>
          </Reveal>
        </div>

        {/* Grille bento/masonry avec lightbox */}
        <GalleryLightbox items={realisations} />
      </section>


    </main>
  );
}