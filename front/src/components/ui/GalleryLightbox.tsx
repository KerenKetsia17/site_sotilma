"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";

interface GalleryItem {
  src: string | null;
  alt: string;
  label: string;
  className?: string;
}

export function GalleryLightbox({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<GalleryItem | null>(null);

  const close = useCallback(() => setOpen(null), []);

  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  return (
    <>
      {/* Grille */}
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 grid-flow-dense gap-1 md:auto-rows-[180px]">
        {items.map((r, i) => (
          <Reveal key={i} delay={i * 0.08} className={`w-full h-full min-h-[200px] md:min-h-0 ${r.className || ""}`}>
            <div
              className="group relative overflow-hidden w-full h-full cursor-zoom-in"
              onClick={() => r.src && setOpen(r)}
            >
              {r.src ? (
                <>
                  <Image
                    src={r.src} alt={r.alt} fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 flex items-end transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{ background: "linear-gradient(to top, rgba(14,35,65,0.38) 0%, transparent 60%)" }}>
                    <p className="px-5 pb-4 text-sm text-white">{r.label}</p>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0" style={{ backgroundColor: "#EDF4FB", border: "1px solid #D8EAF5" }} />
              )}
            </div>
          </Reveal>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={close}
          >
            <button
              onClick={close}
              className="absolute top-5 right-5 w-10 h-10 rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/10 transition-colors"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl"
              style={{ maxHeight: "90vh", aspectRatio: "auto" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full" style={{ height: "85vh" }}>
                <Image
                  src={open.src!} alt={open.alt} fill
                  className="object-contain"
                  sizes="100vw"
                  priority
                />
              </div>
              {open.label && (
                <p className="text-center text-white/70 text-sm mt-3">{open.label}</p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
