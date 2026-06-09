"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cartContext";

const BLUE   = "#1E72B8";
const DARK   = "#111111";
const TEXT_M = "#6B7280";
const RED    = "#C0392B";

interface Product {
  id: string; name: string; description: string;
  price: number; oldPrice?: number; image: string; category: string; isNew?: boolean;
}

const products: Product[] = [
  { id: "vanne-boisseau-3-voies",      name: "Vanne à boisseau sphérique intelligente à trois voies à énergie solaire", description: "Contrôle du débit dans deux directions.",            price: 287000,  image: "https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png", category: "vanne" },
  { id: "vanne-papillon-iot",           name: "Vanne papillon IoT LoRa/4G avec actionneur électrique quart de tour",    description: "LoRa et 4G intégrés. Actionneur électrique.",        price: 332500,  image: "https://static.wixstatic.com/media/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png", category: "vanne", isNew: true },
  { id: "vanne-automatique-electrique", name: "Vanne automatique électrique",         description: "Pilotage à distance, IP68.",                          price: 720000,  image: "https://static.wixstatic.com/media/75ad33_864369e7d3be47febc58a04e28851451~mv2.png/v1/fill/w_749,h_749,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_864369e7d3be47febc58a04e28851451~mv2.png", category: "vanne", isNew: true },
  { id: "camera-agricole-4g",           name: "Camera agricole 4G",                   description: "Vision HD 24/7, solaire, stockage cloud.",            price: 105000,  oldPrice: 125000, image: "/c2.png",        category: "camera" },
  { id: "camera-agricole-v1",           name: "Caméra Agricole 4G — Version 1",       description: "Vision HD 24/7, solaire, stockage cloud.",            price: 105000,  oldPrice: 125000, image: "/c2.png",        category: "camera" },
  { id: "camera-agricole-v2",           name: "Caméra Agricole Sotilma V2",            description: "Sécurité 24/7 - Solaire.",                           price: 125000,  image: "/camera V2.png", category: "camera" },
  { id: "arroseur-auto-4g",             name: "Arroseur automatique 4G pour système d'arrosage",              description: "Goutte-à-goutte & aspersion. Pilotable à distance.", price: 145000,  image: "https://static.wixstatic.com/media/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png", category: "irrigation", isNew: true },
  { id: "sotilma-st02t",                name: "Sotilma-st02T",                        description: "Gestion doubles parcelles, distribution optimisée.",  price: 333000,  image: "https://static.wixstatic.com/media/75ad33_70a7caed24c340fa8047ed8e23a2cad2~mv2.png/v1/fill/w_530,h_677,al_c,lg_1,q_85,enc_avif,quality_auto/75ad33_70a7caed24c340fa8047ed8e23a2cad2~mv2.png", category: "distribution" },
  { id: "vanne-simple",                 name: "Vanne motorisée standard",             description: "Simple voie, solaire, pilotage 4G.",                  price: 180000,  image: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg/v1/fill/w_446,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg", category: "vanne" },
  { id: "vanne-industrielle-papillon",  name: "Vanne industrielle papillon électrique", description: "Applications intensives. Anti-corrosion.",           price: 527000,  image: "https://static.wixstatic.com/media/75ad33_8d18ecdc976649c2af880eb99f21fa96~mv2.png/v1/fill/w_748,h_792,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_8d18ecdc976649c2af880eb99f21fa96~mv2.png", category: "vanne" },
  { id: "pack-pro",                     name: "Kit Pack Pro",                         description: "Pack complet caméra + vanne tout-en-un.",             price: 1408000, image: "https://static.wixstatic.com/media/75ad33_e7457a5da71342e382e3536852a93c3d~mv2.jpeg/v1/fill/w_748,h_512,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_e7457a5da71342e382e3536852a93c3d~mv2.jpeg", category: "pack" },
  { id: "Sotilma Mobile",                     name: "Sotilma Mobile",                         description: "Pack complet caméra + vanne tout-en-un.",             price: 1408000, image: "https://static.wixstatic.com/media/75ad33_e7457a5da71342e382e3536852a93c3d~mv2.jpeg/v1/fill/w_748,h_512,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_e7457a5da71342e382e3536852a93c3d~mv2.jpeg", category: "pack" },
];

const productDetails: Record<string, { longDesc: string; features: string[]; featureItems?: { title: string; desc: string }[] }> = {
  "vanne-boisseau-3-voies":      { longDesc: "La vanne à boisseau sphérique 3 voies pilotée par énergie solaire permet de contrôler le débit dans deux directions. Idéale pour les systèmes d'irrigation complexes nécessitant une distribution flexible et automatisée.", features: ["Contrôle 3 directions", "100% solaire", "Pilotage 4G à distance", "Compatible IoT / LoRa", "Étanchéité IP68", "Anti-corrosion", "Faible consommation", "Installation facile", "Garantie 6 mois"] },
  "vanne-papillon-iot":          { longDesc: "La vanne papillon IoT intègre les technologies LoRa et 4G pour un pilotage total à distance. Son actionneur électrique quart de tour assure une ouverture/fermeture rapide et fiable.", features: ["LoRa & 4G intégrés", "Actionneur électrique", "Pilotage à distance", "Installation facile", "Faible consommation", "Alimentation solaire", "Étanchéité IP67", "Anti-corrosion", "Garantie 6 mois"] },
  "vanne-automatique-electrique":{ longDesc: "La vanne automatique électrique offre un pilotage à distance complet via 4G. Certifiée IP68, elle résiste à l'immersion totale et aux conditions climatiques extrêmes.", features: ["Pilotage à distance", "Étanchéité IP68", "Alimentation solaire", "Commande 4G", "Anti-corrosion", "Ouverture automatique", "Résistance -20°C à 70°C", "Matière inox / laiton", "Garantie 6 mois"] },
  "camera-agricole-4g":          { longDesc: "Caméra de surveillance agricole alimentée par énergie solaire avec connexion 4G. Vision nocturne HD, détection de mouvement, alertes en temps réel et stockage cloud. Résistante aux intempéries (IP66).", features: ["Vision HD 24/7", "100% solaire", "Alertes instantanées", "Stockage cloud", "Surveillance 24h/24", "Vision nocturne infrarouge", "Détection de mouvement", "Étanche IP66"] },
  "camera-agricole-v1":          { longDesc: "Caméra de surveillance agricole alimentée par énergie solaire avec connexion 4G. Vision nocturne HD, détection de mouvement, alertes en temps réel et stockage cloud. Résistante aux intempéries (IP66).", features: ["Vision HD 24/7", "100% solaire", "Alertes instantanées", "Stockage cloud", "Surveillance 24h/24", "Vision nocturne infrarouge", "Détection de mouvement", "Étanche IP66"] },
  "camera-agricole-v2":          { longDesc: "La Caméra Agricole Sotilma V2 offre une surveillance AI en continu, jour et nuit, avec double objectif et vision 360° auto-tracking. Alimentée par panneau solaire 6W + batterie intégrée, elle fonctionne en totale autonomie. Qualité 2K avec vision nocturne couleur (5 LEDs) et résistance IP66.", features: [], featureItems: [
    { title: "Surveillance AI en continu",          desc: "Enregistre jour & nuit automatiquement, même sans mouvement." },
    { title: "Vision 360° auto-tracking",           desc: "Rotation 355°/90°, suit les intrus sans angle mort." },
    { title: "Double objectif",                     desc: "Large angle + zoom pour couvrir champs + zones sensibles." },
    { title: "Capteur PIR haute précision",         desc: "Détection humaine jusqu'à 27 m : alertes ultra-rapides." },
    { title: "Énergie solaire 6W + batterie intégrée", desc: "2h de soleil/jour = autonomie annuelle. Installation sans câbles." },
    { title: "Qualité 2K + nuit en couleur (5 LEDs)", desc: "Images nettes des personnes, même dans le noir total." },
    { title: "Matériel robuste",                    desc: "4G + Bluetooth, micro & haut-parleur (interphone), IP66 anti-pluie/poussière." },
  ]},
  "arroseur-auto-4g":            { longDesc: "L'arroseur automatique 4G combine goutte-à-goutte et aspersion dans un seul appareil pilotable à distance. Programmable depuis votre smartphone, il optimise la consommation d'eau.", features: ["Goutte-à-goutte", "Aspersion intégrée", "Pilotable à distance", "Carte SIM 4G", "Programmable via appli", "Alimentation solaire", "Économie d'eau", "Installation facile", "Garantie 6 mois"] },
  "sotilma-st02t":               { longDesc: "Le Sotilma ST-02T gère simultanément deux parcelles distinctes. Son système de distribution optimisée garantit une répartition précise de l'eau, avec pilotage complet via 4G.", features: ["Gestion double parcelle", "Distribution optimisée", "Pilotage 4G", "Alimentation solaire", "Installation facile", "Programmable via appli", "Anti-corrosion", "Robuste tout-terrain", "Garantie 6 mois"] },
  "vanne-simple":                { longDesc: "La vanne motorisée standard est la solution idéale pour automatiser votre irrigation. Alimentée par énergie solaire et pilotable via 4G.", features: ["Simple voie", "Alimentation solaire", "Pilotage 4G", "Installation facile", "Étanchéité IP68", "Anti-corrosion", "Faible consommation", "Compatible tout réseau", "Garantie 6 mois"] },
  "vanne-industrielle-papillon": { longDesc: "La vanne industrielle papillon électrique est conçue pour les applications intensives. Sa conception anti-corrosion et sa motorisation électrique en font la solution parfaite pour les grandes exploitations.", features: ["Usage intensif", "Anti-corrosion", "Motorisation électrique", "Pilotage à distance", "Grande durabilité", "Étanchéité IP68", "Pression jusqu'à 10 bar", "Matière fonte / acier", "Garantie 12 mois"] },
  "pack-pro":                    { longDesc: "Le Kit Pack Pro regroupe tout ce dont vous avez besoin pour surveiller et irriguer votre exploitation. Caméra 4G et vanne automatique, le tout alimenté à 100% solaire.", features: ["Caméra 4G incluse", "Vanne automatique", "Pilotage complet", "100% solaire", "Installation clé en main", "Surveillance 24/7", "Économie d'eau", "Application mobile incluse", "Garantie 6 mois"] },
  "Sotilma Mobile":                    { longDesc: "Le Kit Pack Pro regroupe tout ce dont vous avez besoin pour surveiller et irriguer votre exploitation. Caméra 4G et vanne automatique, le tout alimenté à 100% solaire.", features: ["Caméra 4G incluse", "Vanne automatique", "Pilotage complet", "100% solaire", "Installation clé en main", "Surveillance 24/7", "Économie d'eau", "Application mobile incluse", "Garantie 6 mois"] },
};

function getIcon(feature: string) {
  const f = feature.toLowerCase();
  if (f.includes("téléphone") || f.includes("pilotable") || f.includes("distance") || f.includes("appli"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="9" y1="6" x2="15" y2="6"/><circle cx="12" cy="17" r="1" fill="#fff"/></svg>;
  if (f.includes("solaire") || f.includes("solar") || f.includes("panneau"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><rect x="2" y="6" width="20" height="12" rx="1"/><line x1="7" y1="6" x2="7" y2="18"/><line x1="12" y1="6" x2="12" y2="18"/><line x1="17" y1="6" x2="17" y2="18"/><line x1="2" y1="12" x2="22" y2="12"/></svg>;
  if (f.includes("nocturne") || f.includes("vision") || f.includes("infrarouge"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>;
  if (f.includes("motorisée") || f.includes("360") || f.includes("caméra"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M23 7l-7 5 7 5V7z"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>;
  if (f.includes("sim") || f.includes("4g") || f.includes("lora") || f.includes("iot") || f.includes("réseau"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><rect x="7" y="2" width="10" height="20" rx="1"/><path d="M7 6h10M7 18h10M11 21h2"/></svg>;
  if (f.includes("hectare") || f.includes("couverture") || f.includes("portée"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>;
  if (f.includes("sécurité") || f.includes("ip6") || f.includes("étanche"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M12 2L3 7v5c0 5.25 3.75 10.17 9 11.33C17.25 22.17 21 17.25 21 12V7L12 2z"/></svg>;
  if (f.includes("haut-parleur") || f.includes("micro") || f.includes("son") || f.includes("audio"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07"/></svg>;
  if (f.includes("garantie") || f.includes("mois") || f.includes("an"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>;
  if (f.includes("installation") || f.includes("facile"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>;
  if (f.includes("anti-corrosion") || f.includes("inox") || f.includes("matière"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M12 2a10 10 0 100 20A10 10 0 0012 2z"/><path d="M12 6v6l4 2"/></svg>;
  if (f.includes("pression") || f.includes("bar"))
    return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>;
  return <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>;
}

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n);
}

export default function ProductPage() {
  const params  = useParams();
  const router  = useRouter();
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  const id      = params.id as string;
  const product = products.find((p) => p.id === id);
  const detail  = productDetails[id];

  const extraImages: Record<string, string[]> = {
    "camera-agricole-4g": ["/c2.png", "/camera V2.png"],
  };
  const images = extraImages[id] ?? (product ? [product.image] : []);
  const [imgIdx, setImgIdx] = useState(0);

  if (!product) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-lg font-semibold" style={{ color: DARK }}>Produit introuvable</p>
        <Link href="/boutique" className="text-sm underline" style={{ color: BLUE }}>← Retour à la boutique</Link>
      </main>
    );
  }

  function handleAddToCart() {
    add({ id: product!.id, name: product!.name, price: product!.price, image: product!.image, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  }

  return (
    <main className="min-h-screen" style={{ backgroundColor: "#F0F4F8" }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-16 py-12">

        {/* Retour */}
        <button onClick={() => router.back()}
          className="flex items-center gap-2 text-sm font-medium mb-8 transition-opacity hover:opacity-60"
          style={{ color: TEXT_M }}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Retour à la boutique
        </button>

        {/* Layout 2 colonnes */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* Image / carrousel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
            className="rounded-2xl flex flex-col items-center justify-center p-10 gap-4"
            style={{ backgroundColor: "#E8EFF6", minHeight: 380 }}>
            <div className="relative w-full" style={{ aspectRatio: "1/1", maxWidth: 320 }}>
              <Image src={images[imgIdx]} alt={product.name} fill className="object-contain" sizes="380px" priority />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3">
                {images.map((src, i) => (
                  <button key={i} onClick={() => setImgIdx(i)}
                    className="relative rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      width: 56, height: 56,
                      border: i === imgIdx ? `2px solid ${BLUE}` : "2px solid transparent",
                      backgroundColor: "#fff",
                    }}>
                    <Image src={src} alt={`Vue ${i + 1}`} fill className="object-contain p-1" sizes="60px" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Infos */}
          <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col">

            {/* Marque */}
            <p className="font-semibold tracking-[0.22em] uppercase mb-1.5" style={{ fontSize: "0.68rem", color: BLUE }}>
              Sotilma
            </p>

            {/* Nom */}
            <h1 className="font-bold leading-snug mb-2" style={{ fontSize: "clamp(1rem, 2vw, 1.3rem)", color: DARK }}>
              {product.name}
            </h1>

            {/* Prix */}
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <p className="font-black" style={{ fontSize: "clamp(1.1rem, 2.2vw, 1.4rem)", color: RED }}>
                {fmt(product.price)} <span style={{ fontSize: "0.7em", fontWeight: 600 }}>FCFA</span>
              </p>
              {product.oldPrice && (
                <>
                  <p className="font-medium line-through" style={{ fontSize: "0.85rem", color: TEXT_M }}>
                    {fmt(product.oldPrice)} FCFA
                  </p>
                  <span className="px-2 py-0.5 rounded-full text-white font-bold text-xs"
                    style={{ backgroundColor: "#C0392B" }}>
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* Séparateur */}
            <div style={{ height: 1, backgroundColor: "#DDE6F0", marginBottom: 14 }} />

            {/* Description */}
            {detail && (
              <p className="leading-relaxed mb-5" style={{ fontSize: "0.82rem", color: TEXT_M }}>
                {detail.longDesc}
              </p>
            )}

            {/* Caractéristiques avec sous-texte (featureItems) */}
            {detail?.featureItems && detail.featureItems.length > 0 && (
              <div className="grid grid-cols-2 gap-3 mb-6">
                {detail.featureItems.map((f) => (
                  <div key={f.title}
                    className="flex items-start gap-2.5 px-3 py-3 rounded-xl"
                    style={{ backgroundColor: "#EDF4FB", border: "1px solid #D0E4F5" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                      style={{ backgroundColor: BLUE }}>
                      {getIcon(f.title)}
                    </div>
                    <div>
                      <p className="font-semibold leading-tight mb-0.5" style={{ fontSize: "0.72rem", color: DARK }}>{f.title}</p>
                      <p className="leading-snug" style={{ fontSize: "0.65rem", color: TEXT_M }}>{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Grille caractéristiques simples avec icônes */}
            {detail && detail.features.length > 0 && (
              <div className="grid grid-cols-3 gap-2 mb-6">
                {detail.features.map((f) => (
                  <div key={f}
                    className="flex items-center gap-2 px-2.5 py-2.5 rounded-xl"
                    style={{ backgroundColor: "#EDF4FB", border: "1px solid #D0E4F5" }}>
                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ backgroundColor: BLUE }}>
                      {getIcon(f)}
                    </div>
                    <span className="leading-tight" style={{ fontSize: "0.68rem", fontWeight: 500, color: DARK }}>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Boutons */}
            <div className="flex flex-row gap-3 mb-6">
              <motion.button
                onClick={handleAddToCart}
                className="flex-1 py-2 px-4 rounded-full font-semibold text-xs border-2"
                animate={{ borderColor: added ? "#22c55e" : BLUE, color: added ? "#22c55e" : BLUE }}
                whileTap={{ scale: 0.97 }}
                style={{ backgroundColor: "#FFF" }}
                transition={{ duration: 0.15 }}
              >
                {added ? "Ajouté ✓" : "Ajouter au panier"}
              </motion.button>
              <Link href="/panier"
                className="flex-1 py-2 px-4 rounded-full font-semibold text-xs text-center transition-all hover:opacity-90 border-2"
                style={{ backgroundColor: "#FFF", color: BLUE, borderColor: BLUE }}
                onClick={handleAddToCart}>
                Commander →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
