'use client';

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import CartIcon from "@/components/ui/CartIcon";

const BLUE = "#1E72B8";

const navLinks = [
  { href: "/",          label: "Accueil"   },
  { href: "/boutique",  label: "Produit"  },
  { href: "/contact",  label: "Business"  },
  { href: "/a-propos",  label: "À propos"  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      animate={scrolled
        ? { boxShadow: "0 4px 32px rgba(15,35,60,0.12)" }
        : { boxShadow: "0 1px 0 0 #E0ECF8" }
      }
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" onClick={closeMenu} className="shrink-0">
            <div className="relative w-20 h-16">
              <Image
                src="/1 (1).png"
                alt="Sotilma"
                fill sizes="420px"
                className="object-contain object-left"
                style={{ filter: "brightness(0)" }}
              />
            </div>
          </Link>

          {/* Navigation desktop */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {navLinks.map(({ href, label }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href}
                  className={`relative px-4 py-2 rounded-full text-sm font-normal transition-colors duration-200 ${
                    active ? "text-[#1E72B8]" : "text-[#455B74] hover:text-[#0D1B2E] hover:bg-slate-50"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-blue-50"
                      style={{ zIndex: -1 }}
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {label}
                </Link>
              );
            })}
          </nav>

          {/* Droite : panier + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <CartIcon />
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link href="/contact" onClick={closeMenu}
                className="text-sm font-medium px-8 py-3.5 rounded-full transition-all hover:opacity-85"
                style={{ backgroundColor: BLUE, color: "#FFFFFF" }}>
                Devis gratuit
              </Link>
            </motion.div>
          </div>

          {/* Mobile : panier + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <CartIcon />
            <motion.button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Menu"
              whileTap={{ scale: 0.9 }}
              className="w-9 h-9 flex items-center justify-center rounded-full text-[#455B74] hover:bg-slate-100 transition-colors"
            >
              <motion.div animate={{ rotate: menuOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {menuOpen
                    ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
                </svg>
              </motion.div>
            </motion.button>
          </div>

        </div>
      </div>

      {/* ── Menu mobile ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden bg-white border-t border-slate-100 shadow-xl overflow-hidden"
          >
            <div className="px-5 py-4 space-y-1">
              {navLinks.map(({ href, label }, i) => {
                const active = pathname === href;
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link href={href} onClick={closeMenu}
                      className={`flex items-center px-4 py-2.5 rounded-xl text-sm font-normal transition-all ${
                        active ? "bg-blue-50 text-[#1E72B8]" : "text-[#455B74] hover:text-[#0D1B2E] hover:bg-slate-50"
                      }`}>
                      {label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            <div className="px-5 pb-5 pt-2 border-t border-slate-100 flex flex-col gap-2.5">
              <Link href="/contact" onClick={closeMenu}
                className="flex items-center justify-center text-white font-normal text-sm px-8 py-3.5 rounded-full hover:brightness-110 transition-all"
                style={{ backgroundColor: BLUE }}>
                Demander un devis
              </Link>
              <Link href="/panier" onClick={closeMenu}
                className="flex items-center justify-center text-white font-normal text-sm px-8 py-3.5 rounded-full transition-colors hover:brightness-110"
                style={{ backgroundColor: "#1E72B8" }}>
                Mon panier
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
