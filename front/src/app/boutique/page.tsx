"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";

const BLUE   = "#1E72B8";
const DARK   = "#111111";
const TEXT_D = "#111111";
const TEXT_M = "#6B7280";
const GOLD   = "#E8B84B";

interface Product {
  id: string; name: string; description: string;
  price: number; image: string; category: string; isNew?: boolean;
}

const products: Product[] = [
  { id: "vanne-boisseau-3-voies",      name: "Vanne à boisseau sphérique intelligente à trois voies à énergie solaire", description: "Contrôle du débit dans deux directions.",            price: 287000, image: "https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png", category: "vanne" },
  { id: "vanne-papillon-iot",           name: "Vanne papillon IoT LoRa/4G avec actionneur électrique quart de tour",    description: "LoRa et 4G intégrés. Actionneur électrique.",        price: 332500, image: "https://static.wixstatic.com/media/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png", category: "vanne", isNew: true },
  { id: "vanne-automatique-electrique", name: "Vanne automatique électrique",         description: "Pilotage à distance, IP68.",                          price: 720000, image: "https://static.wixstatic.com/media/75ad33_864369e7d3be47febc58a04e28851451~mv2.png/v1/fill/w_749,h_749,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_864369e7d3be47febc58a04e28851451~mv2.png", category: "vanne", isNew: true },
  { id: "camera-agricole-4g",           name: "Camera agricole 4G",                   description: "Vision HD 24/7, solaire, stockage cloud.",            price: 105000, image: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png/v1/fill/w_575,h_625,al_c,lg_1,q_85,enc_avif,quality_auto/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png", category: "camera" },
  { id: "arroseur-auto-4g",             name: "Arroseur automatique 4G pour système d'arrosage",              description: "Goutte-à-goutte & aspersion. Pilotable à distance.", price: 145000, image: "https://static.wixstatic.com/media/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png", category: "irrigation", isNew: true },
  { id: "sotilma-st02t",                name: "Sotilma-st02T",                        description: "Gestion doubles parcelles, distribution optimisée.",  price: 333000, image: "https://static.wixstatic.com/media/75ad33_70a7caed24c340fa8047ed8e23a2cad2~mv2.png/v1/fill/w_530,h_677,al_c,lg_1,q_85,enc_avif,quality_auto/75ad33_70a7caed24c340fa8047ed8e23a2cad2~mv2.png", category: "distribution" },
  { id: "vanne-simple",                 name: "Vanne motorisée standard",             description: "Simple voie, solaire, pilotage 4G.",                    price: 180000, image: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg/v1/fill/w_446,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg", category: "vanne" },
  { id: "vanne-industrielle-papillon",  name: "Vanne industrielle papillon électrique", description: "Applications intensives. Anti-corrosion.",             price: 527000, image: "https://static.wixstatic.com/media/75ad33_8d18ecdc976649c2af880eb99f21fa96~mv2.png/v1/fill/w_748,h_792,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_8d18ecdc976649c2af880eb99f21fa96~mv2.png", category: "vanne" },
  { id: "pack-pro",                     name: "Kit Pack Pro",                         description: "Pack complet caméra + vanne tout-en-un.",               price: 1408000, image: "https://static.wixstatic.com/media/75ad33_e7457a5da71342e382e3536852a93c3d~mv2.jpeg/v1/fill/w_748,h_512,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_e7457a5da71342e382e3536852a93c3d~mv2.jpeg", category: "pack" },
];

const ITEMS_PER_PAGE = 3;

const categories = [
  { id: "tous",         label: "Tous les produits" },
  { id: "vanne",        label: "Vannes"            },
  { id: "camera",       label: "Caméras"           },
  { id: "irrigation",   label: "Irrigation"        },
  { id: "distribution", label: "Distribution"      },
  { id: "pack",         label: "Packs"             },
];

const promos = [
  { label: "VANNES SOLAIRES", sub: "À PARTIR DE 180 000 CFA", btn: "Voir les vannes",  cat: "vanne",  bg: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg" },
  { label: "CAMÉRAS 4G",      sub: "À PARTIR DE 105 000 CFA",  btn: "Voir les caméras", cat: "camera", bg: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png" },
  { label: "PACK COMPLET",    sub: "TOUT-EN-UN",               btn: "Voir les packs",   cat: "pack",   bg: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png" },
];

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " CFA";
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const cardAnim = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4 } },
};


function BoutiqueContent() {
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const catalogRef    = useRef<HTMLDivElement>(null);

  const [cat, setCat]       = useState(() => searchParams.get("categorie") ?? "tous");
  const [page, setPage]     = useState(1);
  const [hoverId, setHover] = useState<string | null>(null);
  const { add }             = useCart();
  const [added, setAdded]   = useState<string | null>(null);

  useEffect(() => {
    const c = searchParams.get("categorie");
    if (c && c !== cat) {
      setCat(c);
      setPage(1);
    }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered   = cat === "tous" ? products : products.filter((p) => p.category === cat);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function pick(id: string) {
    setCat(id);
    setPage(1);
    router.push(`/boutique${id !== "tous" ? `?categorie=${id}` : ""}`, { scroll: false });
    setTimeout(() => {
      catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }

  function handleAddToCart(p: Product, e: React.MouseEvent) {
    e.preventDefault();
    add({ id: p.id, name: p.name, price: p.price, image: p.image, quantity: 1 });
    setAdded(p.id);
    setTimeout(() => setAdded(null), 1400);
  }

  return (
    <main className="overflow-hidden">

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative overflow-hidden bg-white" style={{ borderBottom: "1px solid #E8EFF6" }}>
        <div className="max-w-3xl mx-auto px-5 sm:px-8 lg:px-12 py-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="font-light text-xs mb-0 leading-none" style={{ color: TEXT_M }}>Les</p>
            <h1 className="font-normal leading-none mb-2" style={{ fontSize: "clamp(1.6rem, 4vw, 3rem)", color: TEXT_D }}>
              meilleures <span style={{ color: BLUE }}>Solutions.</span>
            </h1>
            <p className="text-xs mb-5 mx-auto" style={{ color: TEXT_M, maxWidth: 360 }}>
              Solutions intelligentes pour votre agriculture
            </p>
           
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ BANDEAUX PROMO ═══════════════════ */}
      <section className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-10">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-5"
          variants={stagger} initial="hidden"
          whileInView="show" viewport={{ once: true, margin: "-60px" }}
        >
          {promos.map((pr) => (
            <motion.div key={pr.label} variants={cardAnim}>
              <motion.button
                onClick={() => pick(pr.cat)}
                whileHover={{ y: -6, scale: 1.025 }}
                whileTap={{ scale: 0.97 }}
                className="relative overflow-hidden text-left cursor-pointer w-full"
                style={{ borderRadius: 20, minHeight: 170 }}
              >
                <div className="absolute inset-0">
                  <Image src={pr.bg} alt={pr.label} fill className="object-cover" sizes="33vw" />
                  <div className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(10,30,70,0.55) 0%, rgba(10,30,70,0.18) 100%)" }} />
                </div>
                <div className="relative z-10 p-6">
                  <p className="font-normal text-white leading-tight mb-1"
                    style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)" }}>{pr.label}</p>
                  <p className="text-xs font-medium mb-5" style={{ color: "rgba(255,255,255,0.88)" }}>{pr.sub}</p>
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium px-8 py-3.5"
                    style={{ backgroundColor: BLUE, color: "#FFFFFF", borderRadius: 40 }}>
                    {pr.btn}
                  </span>
                </div>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ═══════════════════ CATALOGUE ═══════════════════ */}
      <section ref={catalogRef}>

        {/* En-tête clair */}
        <div className="bg-white py-8 px-5 sm:px-8 lg:px-12" style={{ borderTop: "1px solid #E8EFF6" }}>
          <div className="max-w-7xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >

              {/* Filtres */}
              <div className="flex items-center justify-center gap-2 flex-wrap">
                {categories.map((c) => (
                  <motion.button
                    key={c.id}
                    onClick={() => pick(c.id)}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    className="shrink-0 px-8 py-3.5 text-xs font-normal transition-colors duration-200"
                    style={
                      cat === c.id
                        ? { backgroundColor: BLUE, color: "#FFFFFF", borderRadius: 40 }
                        : { border: "1px solid #C8DCF0", color: TEXT_M, borderRadius: 40 }
                    }
                  >
                    {c.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Grille produits */}
        <div style={{ backgroundColor: "#EEF3F8" }} className="px-5 sm:px-8 lg:px-12 pt-10 pb-14">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={cat + "-" + page}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8 items-stretch"
                variants={stagger} initial="hidden" animate="show"
              >
                {paginated.map((p) => {
                  const isHov = hoverId === p.id;
                  const isAdded = added === p.id;
                  return (
                    <motion.div key={p.id} variants={cardAnim} className="h-full">
                      <div
                        className="group flex flex-col bg-white h-full"
                        style={{
                          borderRadius: 14,
                          border: "1px solid #DDE6F0",
                          boxShadow: isHov ? "0 8px 28px rgba(30,114,184,0.13)" : "0 2px 8px rgba(0,0,0,0.06)",
                          transition: "box-shadow 0.25s, transform 0.25s",
                          transform: isHov ? "translateY(-3px)" : "translateY(0)",
                          overflow: "hidden",
                        }}
                        onMouseEnter={() => setHover(p.id)}
                        onMouseLeave={() => setHover(null)}
                      >
                        {/* Zone image */}
                        <Link href={`/boutique/produit/${p.id}`} className="block shrink-0">
                          <div className="relative" style={{ height: 220, backgroundColor: "#F5F8FC" }}>
                            <Image src={p.image} alt={p.name} fill
                              className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                              sizes="(max-width: 640px) 50vw, 25vw" />
                          </div>
                        </Link>

                        {/* Séparateur bleu */}
                        <div style={{ height: 2, backgroundColor: BLUE }} />

                        {/* Zone info */}
                        <div className="flex flex-col flex-1 px-3.5 pt-3 pb-3.5">
                          {/* Nom */}
                          <Link href={`/boutique/produit/${p.id}`} className="block text-center mb-1">
                            <p className="font-semibold leading-snug line-clamp-2"
                              style={{ fontSize: "0.75rem", color: "#111" }}>
                              {p.name}
                            </p>
                          </Link>

                          {/* Ligne décorative sous le nom */}
                          <div className="mx-auto mb-2" style={{ width: 30, height: 2, borderRadius: 2, backgroundColor: BLUE }} />

                          {/* Prix */}
                          <p className="text-center font-bold mb-3 flex-1 flex items-end justify-center"
                            style={{ fontSize: "1rem", color: "#111", lineHeight: 1 }}>
                            {fmt(p.price)}
                          </p>

                          {/* Bouton */}
                          <motion.button
                            onClick={(e) => { e.preventDefault(); handleAddToCart(p, e); }}
                            className="w-full py-2 rounded-lg font-semibold text-white text-xs"
                            animate={{ backgroundColor: isAdded ? "#22c55e" : BLUE }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                          >
                            {isAdded ? "Ajouté au panier ✓" : "Ajouter au panier"}
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                className="flex items-center justify-center gap-2 mt-10"
                initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              >
                <motion.button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full border text-xs font-medium disabled:opacity-30"
                  style={{ borderColor: "#C8D9E8", color: TEXT_M }}>
                  ‹
                </motion.button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <motion.button
                    key={n} onClick={() => setPage(n)}
                    whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                    className="w-9 h-9 rounded-full text-xs font-medium transition-all"
                    style={n === page
                      ? { backgroundColor: BLUE, color: "#fff" }
                      : { border: "1px solid #C8D9E8", color: TEXT_M }}>
                    {n}
                  </motion.button>
                ))}
                <motion.button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-full border text-xs font-medium disabled:opacity-30"
                  style={{ borderColor: "#C8D9E8", color: TEXT_M }}>
                  ›
                </motion.button>
              </motion.div>
            )}

            <motion.div
              className="text-center mt-8"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Link href="/contact"
                className="inline-flex items-center gap-2 text-sm font-normal transition-opacity hover:opacity-60"
                style={{ color: BLUE }}>
                Demander un devis personnalisé →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

    </main>
  );
}

export default function BoutiquePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <BoutiqueContent />
    </Suspense>
  );
}
