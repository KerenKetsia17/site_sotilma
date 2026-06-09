"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";

const BLUE   = "#1E72B8";
const TEXT_D = "#0D2235";
const TEXT_M = "#4A6278";
const BG     = "#FFFFFF";
const BORDER = "#E4EEF6";

const shopLinks = [
  { label: "Vannes automatiques", href: "/boutique?categorie=vanne-automatique" },
  { label: "Caméras agricoles",   href: "/boutique?categorie=camera" },
  { label: "Kit pro",      href: "/boutique?categorie=pack" },
];

const companyLinks = [
  { label: "À propos",         href: "/a-propos" },
  { label: "Mentions légales", href: "#" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.98 },
  show:   { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: "easeOut" } },
};

const stagger: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

function FooterHeading({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-xs font-medium tracking-[0.25em] uppercase mb-5" style={{ color: TEXT_D }}>
      {children}
    </h4>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href}
        className="text-sm transition-colors duration-200 hover:text-blue-600"
        style={{ color: TEXT_M }}>
        {children}
      </Link>
    </li>
  );
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: BG, borderTop: `4px solid ${BLUE}` }}>
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-10 sm:pt-14 pb-8">

        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10"
          style={{ borderBottom: `1px solid ${BORDER}` }}
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Marque */}
          <motion.div variants={fadeUp} className="md:col-span-4 space-y-5">
            <div className="relative w-105 h-24 shrink-0">
              <Image src="/1 (1).png" alt="Sotilma" fill sizes="420px"
                className="object-contain object-left" style={{ filter: "brightness(0)" }} priority />
            </div>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: TEXT_M }}>
              Solutions d&apos;irrigation solaire, vannes connectées et surveillance agricole
              au Sénégal et au-delà.
            </p>
          </motion.div>

          {/* Liens */}
          <motion.div variants={fadeUp} className="md:col-span-8 grid sm:grid-cols-3 gap-8">
            <motion.div variants={fadeUp}>
              <FooterHeading>Boutique</FooterHeading>
              <ul className="space-y-3">
                {shopLinks.map((l) => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp}>
              <FooterHeading>Entreprise</FooterHeading>
              <ul className="space-y-3">
                {companyLinks.map((l) => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
              </ul>
            </motion.div>
            <motion.div variants={fadeUp}>
              <FooterHeading>Contact</FooterHeading>
              <div className="space-y-3 text-sm" style={{ color: TEXT_M }}>
                <p>Keur Massar, Dakar — Sénégal</p>
                <a href="tel:+221776740924"
                  className="block hover:text-blue-600 transition-colors duration-200">
                  +221 77 674 09 24
                </a>
                <a href="tel:+221781559416"
                  className="block hover:text-blue-600 transition-colors duration-200">
                  +221 78 155 94 16
                </a>
                <a href="https://wa.me/221770982290" target="_blank" rel="noopener noreferrer"
                  className="block hover:text-blue-600 transition-colors duration-200">
                  +221 77 098 22 90
                </a>
                <a href="mailto:sntech.afrique@gmail.com"
                  className="block hover:text-blue-600 transition-colors duration-200 break-all">
                  sntech.afrique@gmail.com
                </a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

      </div>
    </footer>
  );
}
