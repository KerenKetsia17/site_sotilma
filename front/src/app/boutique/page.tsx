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
  { id: "vanne-boisseau-3-voies",      name: "Vanne à boisseau sphérique intelligente à trois voies à énergie solaire", description: "Contrôle du débit dans deux directions.",            price: 287000,  image: "https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png", category: "vanne" },
  { id: "vanne-papillon-iot",           name: "Vanne papillon IoT LoRa/4G avec actionneur électrique quart de tour",    description: "LoRa et 4G intégrés. Actionneur électrique.",        price: 332500,  image: "https://static.wixstatic.com/media/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png", category: "vanne", isNew: true },
  { id: "vanne-automatique-electrique", name: "Vanne automatique électrique",         description: "Pilotage à distance, IP68.",                          price: 720000,  image: "https://static.wixstatic.com/media/75ad33_864369e7d3be47febc58a04e28851451~mv2.png/v1/fill/w_749,h_749,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_864369e7d3be47febc58a04e28851451~mv2.png", category: "vanne", isNew: true },
  { id: "camera-agricole-v1",           name: "Caméra Agricole 4G — Version 1",       description: "Vision HD 24/7, solaire, stockage cloud.",            price: 105000,  image: "/c2.png",        category: "camera" },
  { id: "camera-agricole-v2",           name: "Caméra Agricole Sotilma V2",            description: "Sécurité 24/7 - Solaire.",                           price: 125000,  image: "/v2.jpeg", category: "camera" },
  { id: "arroseur-auto-4g",             name: "Arroseur automatique 4G pour système d'arrosage",              description: "Goutte-à-goutte & aspersion. Pilotable à distance.", price: 145000,  image: "https://static.wixstatic.com/media/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png", category: "irrigation", isNew: true },
  { id: "sotilma-st02t",                name: "Sotilma-st02T",                        description: "Gestion doubles parcelles, distribution optimisée.",  price: 333000,  image: "https://static.wixstatic.com/media/75ad33_70a7caed24c340fa8047ed8e23a2cad2~mv2.png/v1/fill/w_530,h_677,al_c,lg_1,q_85,enc_avif,quality_auto/75ad33_70a7caed24c340fa8047ed8e23a2cad2~mv2.png", category: "distribution" },
  { id: "vanne-simple",                 name: "Vanne motorisée standard",             description: "Simple voie, solaire, pilotage 4G.",                  price: 180000,  image: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg/v1/fill/w_446,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg", category: "vanne" },
  { id: "vanne-industrielle-papillon",  name: "Vanne industrielle papillon électrique", description: "Applications intensives. Anti-corrosion.",           price: 527000,  image: "https://static.wixstatic.com/media/75ad33_8d18ecdc976649c2af880eb99f21fa96~mv2.png/v1/fill/w_748,h_792,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_8d18ecdc976649c2af880eb99f21fa96~mv2.png", category: "vanne" },
  { id: "pack-pro",                     name: "Kit Pack Pro",                         description: "Pack complet caméra + vanne tout-en-un.",             price: 1408000, image: "https://static.wixstatic.com/media/75ad33_e7457a5da71342e382e3536852a93c3d~mv2.jpeg/v1/fill/w_748,h_512,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_e7457a5da71342e382e3536852a93c3d~mv2.jpeg", category: "pack" },
  { id: "sotilma-mobile-sm01",          name: "Sotilma Mobile SM-01 Simple",          description: "Pompe de surface solaire mobile. Puissance 1890W, débit 45 m³/h.", price: 975000, image: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png", category: "pack" },
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
  { label: "CAMÉRAS SOTILIMA",      sub: "À PARTIR DE 105 000 CFA", btn: "Voir les caméras", cat: "camera", bg: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png" },
  { label: "POMPE MOBILE SOTILMA",    sub: "TOUT-EN-UN",               btn: "Voir les packs",   cat: "pack",   bg: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png" },
  { label: "VANNES SOTILIMA", sub: "À PARTIR DE 180 000 CFA", btn: "Voir les vannes",  cat: "vanne",  bg: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg" },
];

const productDetails: Record<string, { longDesc: string; features: string[] }> = {
  "vanne-boisseau-3-voies":      { longDesc: "La vanne à boisseau sphérique 3 voies pilotée par énergie solaire permet de contrôler le débit dans deux directions. Idéale pour les systèmes d'irrigation complexes nécessitant une distribution flexible et automatisée.", features: ["Contrôle 3 directions", "100% solaire", "Pilotage 4G à distance", "Compatible IoT / LoRa", "Étanchéité IP68", "Anti-corrosion", "Faible consommation", "Installation facile", "Garantie 6 mois"] },
  "vanne-papillon-iot":          { longDesc: "La vanne papillon IoT intègre les technologies LoRa et 4G pour un pilotage total à distance. Son actionneur électrique quart de tour assure une ouverture/fermeture rapide et fiable, même dans les environnements exigeants.", features: ["LoRa & 4G intégrés", "Actionneur électrique", "Pilotage à distance", "Installation facile", "Faible consommation", "Alimentation solaire", "Étanchéité IP67", "Anti-corrosion", "Garantie 6 mois"] },
  "vanne-automatique-electrique":{ longDesc: "La vanne automatique électrique offre un pilotage à distance complet via 4G. Certifiée IP68, elle résiste à l'immersion totale et aux conditions climatiques extrêmes.", features: ["Pilotage à distance", "Étanchéité IP68", "Alimentation solaire", "Commande 4G", "Anti-corrosion", "Ouverture automatique", "Résistance -20°C à 70°C", "Matière inox / laiton", "Garantie 6 mois"] },
  "camera-agricole-4g":          { longDesc: "Découvrez nos caméras équipées de puces 4G, la solution idéale pour garder un œil sur votre ferme où que vous soyez. Surveillez vos cultures en temps réel directement depuis votre téléphone.", features: ["Pilotable avec votre téléphone", "Fonctionne en 100% solaire", "Vision nocturne", "Caméra motorisée 360°", "Supporte la carte SIM 4G", "Couverture 0 – 1 hectare", "Sécurité renforcée", "Haut-parleurs et micros intégrés", "Garantie 6 mois"] },
  "arroseur-auto-4g":            { longDesc: "L'arroseur automatique 4G combine goutte-à-goutte et aspersion dans un seul appareil pilotable à distance. Programmable depuis votre smartphone, il optimise la consommation d'eau.", features: ["Goutte-à-goutte", "Aspersion intégrée", "Pilotable à distance", "Carte SIM 4G", "Programmable via appli", "Alimentation solaire", "Économie d'eau", "Installation facile", "Garantie 6 mois"] },
  "sotilma-st02t":               { longDesc: "Le Sotilma ST-02T gère simultanément deux parcelles distinctes. Son système de distribution optimisée garantit une répartition précise de l'eau, avec pilotage complet via 4G.", features: ["Gestion double parcelle", "Distribution optimisée", "Pilotage 4G", "Alimentation solaire", "Installation facile", "Programmable via appli", "Anti-corrosion", "Robuste tout-terrain", "Garantie 6 mois"] },
  "vanne-simple":                { longDesc: "La vanne motorisée standard est la solution idéale pour automatiser votre irrigation. Alimentée par énergie solaire et pilotable via 4G, elle s'installe sur toute canalisation existante.", features: ["Simple voie", "Alimentation solaire", "Pilotage 4G", "Installation facile", "Étanchéité IP68", "Anti-corrosion", "Faible consommation", "Compatible tout réseau", "Garantie 6 mois"] },
  "vanne-industrielle-papillon": { longDesc: "La vanne industrielle papillon électrique est conçue pour les applications intensives. Sa conception anti-corrosion et sa motorisation électrique en font la solution parfaite pour les grandes exploitations.", features: ["Usage intensif", "Anti-corrosion", "Motorisation électrique", "Pilotage à distance", "Grande durabilité", "Étanchéité IP68", "Pression jusqu'à 10 bar", "Matière fonte / acier", "Garantie 12 mois"] },
  "pack-pro":                    { longDesc: "Le Kit Pack Pro regroupe tout ce dont vous avez besoin pour surveiller et irriguer votre exploitation. Caméra 4G et vanne automatique, le tout alimenté à 100% solaire. Prêt à l'emploi.", features: ["Caméra 4G incluse", "Vanne automatique", "Pilotage complet", "100% solaire", "Installation clé en main", "Surveillance 24/7", "Économie d'eau", "Application mobile incluse", "Garantie 6 mois"] },
  "sotilma-mobile":         { longDesc: "Le Sotilma Mobile SM-01 Simple est une pompe de surface solaire mobile haute performance. Puissance 1890W, débit 45 m³/h, hybride AC/DC. Suffisant pour irriguer 1 à 2 hectares.", features: ["Pompe solaire 1890W", "Débit 45 m³/h", "Hybride AC/DC", "Chariot mobile roulant", "Kit panneaux solaires 1800W", "Câblage complet", "Système monitoring", "Tuyauterie incluse", "Made in Sénégal"] },
};

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " CFA";
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } };
const cardAnim = {
  hidden: { opacity: 0, y: 28, scale: 0.95 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.4 } },
};

function ProductModal({ product, onClose, onAddToCart, added }: {
  product: Product;
  onClose: () => void;
  onAddToCart: (p: Product, e: React.MouseEvent) => void;
  added: string | null;
}) {
  const detail  = productDetails[product.id];
  const isAdded = added === product.id;

  return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
           style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
           onClick={onClose}>
        <motion.div
            className="relative bg-white w-full overflow-y-auto"
            style={{ borderRadius: 20, maxWidth: 580, maxHeight: "92vh" }}
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.26 }}
            onClick={(e) => e.stopPropagation()}
        >
          {/* Fermer */}
          <button onClick={onClose}
                  className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: "#F0F4F8", color: TEXT_M }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Séparateur */}
          <div style={{ height: 3, backgroundColor: BLUE }} />

          {/* Nom + prix */}
          <div className="px-6 pt-5 pb-4">
            <h2 className="font-medium leading-snug mb-1" style={{ fontSize: "0.85rem", color: TEXT_D }}>
              {product.name}
            </h2>
            <p className="font-semibold text-sm" style={{ color: BLUE }}>{fmt(product.price)}</p>
          </div>

          {/* Description */}
          {detail && (
              <div className="px-6 pb-5">
                <p className="text-xs leading-relaxed" style={{ color: TEXT_M }}>{detail.longDesc}</p>
              </div>
          )}

          {/* Grille caractéristiques */}
          {detail && (
              <div className="px-6 pb-6">
                <p className="text-[10px] font-semibold tracking-widest uppercase mb-3" style={{ color: TEXT_M }}>
                  Caractéristiques
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {detail.features.map((f) => (
                      <div key={f} className="flex items-center gap-2 px-3 py-2.5 rounded-lg" style={{ backgroundColor: "#EDF4FB" }}>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: BLUE }}>
                          <svg className="w-3 h-3" fill="none" stroke="#fff" strokeWidth={2.5} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span className="text-[11px] font-medium leading-tight" style={{ color: TEXT_D }}>{f}</span>
                      </div>
                  ))}
                </div>
              </div>
          )}

        </motion.div>
      </div>
  );
}


function BoutiqueContent() {
  const searchParams  = useSearchParams();
  const router        = useRouter();
  const catalogRef    = useRef<HTMLDivElement>(null);

  const [cat, setCat]                  = useState(() => searchParams.get("categorie") ?? "tous");
  const [page, setPage]                = useState(1);
  const [hoverId, setHover] = useState<string | null>(null);
  const { add }             = useCart();
  const [added, setAdded]   = useState<string | null>(null);

  useEffect(() => {
    const c = searchParams.get("categorie");
    if (c && c !== cat) { setCat(c); setPage(1); }
  }, [searchParams]); // eslint-disable-line react-hooks/exhaustive-deps

  const filtered   = cat === "tous" ? products : products.filter((p) => p.category === cat);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated  = filtered.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  function pick(id: string) {
    setCat(id); setPage(1);
    router.push(`/boutique${id !== "tous" ? `?categorie=${id}` : ""}`, { scroll: false });
    setTimeout(() => catalogRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
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
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
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
          <motion.div className="grid grid-cols-1 sm:grid-cols-3 gap-5" variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-60px" }}>
            {promos.map((pr) => (
                <motion.div key={pr.label} variants={cardAnim}>
                  <motion.button onClick={() => pick(pr.cat)} whileHover={{ y: -6, scale: 1.025 }} whileTap={{ scale: 0.97 }}
                                 className="relative overflow-hidden text-left cursor-pointer w-full" style={{ borderRadius: 20, minHeight: 170 }}>
                    <div className="absolute inset-0">
                      <Image src={pr.bg} alt={pr.label} fill className="object-cover" sizes="33vw" />
                      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(10,30,70,0.72) 0%, rgba(10,30,70,0.45) 100%)" }} />
                    </div>
                    <div className="relative z-10 p-6">
                      <p className="font-normal leading-tight mb-1" style={{ fontSize: "clamp(1rem, 2vw, 1.35rem)", color: "#FFFFFF" }}>{pr.label}</p>
                      <p className="text-xs font-medium mb-5" style={{ color: "#FFFFFF" }}>{pr.sub}</p>
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium px-8 py-3.5"
                            style={{ backgroundColor: BLUE, color: "#FFFFFF", borderRadius: 40 }}>{pr.btn}</span>
                    </div>
                  </motion.button>
                </motion.div>
            ))}
          </motion.div>
        </section>


        {/* ═══════════════════ CATALOGUE ═══════════════════ */}
        <section ref={catalogRef}>

          {/* Onglets filtres */}
          <div className="bg-white py-6 px-5 sm:px-8 lg:px-12" style={{ borderTop: "1px solid #E8EFF6" }}>
            <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
              {categories.map((c) => (
                  <motion.button
                      key={c.id}
                      onClick={() => pick(c.id)}
                      whileHover={{ scale: 1.06 }}
                      whileTap={{ scale: 0.94 }}
                      className="shrink-0 px-6 py-2.5 text-xs font-normal transition-colors duration-200"
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
          </div>

          <div style={{ backgroundColor: "#EEF3F8" }} className="px-5 sm:px-8 lg:px-12 pt-10 pb-14">
            <div className="max-w-7xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div key={cat + "-" + page}
                            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-8 items-stretch"
                            variants={stagger} initial="hidden" animate="show">
                  {paginated.map((p) => {
                    const isHov   = hoverId === p.id;
                    const isAdded = added === p.id;
                    return (
                        <motion.div key={p.id} variants={cardAnim} className="h-full">
                          <Link href={`/boutique/produit/${p.id}`}
                                className="group flex flex-col bg-white h-full"
                                style={{
                                  borderRadius: 14,
                                  border: "1px solid #DDE6F0",
                                  boxShadow: isHov ? "0 8px 28px rgba(30,114,184,0.13)" : "0 2px 8px rgba(0,0,0,0.06)",
                                  transition: "box-shadow 0.25s, transform 0.25s",
                                  transform: isHov ? "translateY(-3px)" : "translateY(0)",
                                  overflow: "hidden",
                                  display: "flex",
                                  textDecoration: "none",
                                }}
                                onMouseEnter={() => setHover(p.id)}
                                onMouseLeave={() => setHover(null)}
                          >
                            <div className="relative shrink-0" style={{ height: 150, backgroundColor: "#F5F8FC" }}>
                              <Image src={p.image} alt={p.name} fill
                                     className="object-contain p-3 transition-transform duration-500 group-hover:scale-[1.04]"
                                     sizes="(max-width: 640px) 50vw, 25vw" />
                            </div>
                            <div style={{ height: 2, backgroundColor: BLUE }} />
                            <div className="flex flex-col flex-1 px-3 pt-2.5 pb-3">
                              <p className="font-semibold leading-snug line-clamp-2 text-center mb-1" style={{ fontSize: "0.68rem", color: "#111" }}>
                                {p.name}
                              </p>
                              <div className="mx-auto mb-1.5" style={{ width: 24, height: 2, borderRadius: 2, backgroundColor: BLUE }} />
                              <p className="text-center font-medium mb-2 flex-1 flex items-end justify-center" style={{ fontSize: "0.88rem", color: "#111", lineHeight: 1 }}>
                                {fmt(p.price)}
                              </p>
                              <motion.button
                                  onClick={(e) => { e.stopPropagation(); handleAddToCart(p, e); }}
                                  className="w-full py-2 rounded-lg font-semibold text-white text-xs"
                                  animate={{ backgroundColor: isAdded ? "#22c55e" : BLUE }}
                                  whileTap={{ scale: 0.97 }}
                                  transition={{ duration: 0.15 }}
                              >
                                {isAdded ? "Ajouté au panier ✓" : "Ajouter au panier"}
                              </motion.button>
                            </div>
                          </Link>
                        </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Pagination */}
              {totalPages > 1 && (
                  <motion.div className="flex items-center justify-center gap-2 mt-10"
                              initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <motion.button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}
                                   whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                   className="w-9 h-9 rounded-full border text-xs font-medium disabled:opacity-30"
                                   style={{ borderColor: "#C8D9E8", color: TEXT_M }}>‹</motion.button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                        <motion.button key={n} onClick={() => setPage(n)}
                                       whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                       className="w-9 h-9 rounded-full text-xs font-medium transition-all"
                                       style={n === page ? { backgroundColor: BLUE, color: "#fff" } : { border: "1px solid #C8D9E8", color: TEXT_M }}>
                          {n}
                        </motion.button>
                    ))}
                    <motion.button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                                   whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
                                   className="w-9 h-9 rounded-full border text-xs font-medium disabled:opacity-30"
                                   style={{ borderColor: "#C8D9E8", color: TEXT_M }}>›</motion.button>
                  </motion.div>
              )}

              <motion.div className="text-center mt-8" initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <Link href="/contact" className="inline-flex items-center gap-2 text-sm font-normal transition-opacity hover:opacity-60" style={{ color: BLUE }}>
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
