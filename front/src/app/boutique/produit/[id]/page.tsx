"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/cartContext";

// ─── Design tokens ─────────────────────────────────────────────
const BLUE   = "#1E72B8";
const TEXT_D = "#0D2235";
const TEXT_M = "#5A7A94";
const LIGHT  = "#F7F9FC";

// ─── Types ─────────────────────────────────────────────────────
interface Product {
  id: string; name: string; description: string; longDescription?: string;
  price: number; originalPrice?: number; image: string; images?: string[];
  category: string; specs?: string[]; features?: string[];
}

// ─── Données ───────────────────────────────────────────────────
const products: Product[] = [
  { id: "vanne-boisseau-3-voies",      name: "Vanne à boisseau sphérique intelligente à trois voies à énergie solaire",        description: "Vanne intelligente à trois voies QT-02ET, contrôle du débit dans deux directions pour une irrigation optimisée.",                                                                                                                                                                                                                                                                                                                                                                      longDescription: "La vanne intelligente à trois voies QT-02ET adopte une technologie de débit constant et peut ajuster automatiquement le débit d'eau entre la vanne à courte et longue distance, évitant ainsi l'arrosage excessif dans le champ agricole proche de la pompe et la sécheresse dans le champ distant. L'irrigation devient uniforme et plus fiable.", price: 287000, originalPrice: 317000, image: "https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png", images: ["https://static.wixstatic.com/media/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png/v1/fill/w_749,h_852,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0850deeacbde464f946746f6996a0bee~mv2.png","https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg/v1/fill/w_446,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg"], category: "vanne", specs: ["Débitmètre ultrasons intégré", "Connexion rapide", "Technologie flux stable", "Énergie solaire"], features: ["Conception unique vanne verticale 3 voies","Débitmètre à ultrasons intégré","Technologie à flux stable haute performance","Débit constant et irrigation uniforme","Montage et démontage rapide"] },
  { id: "vanne-papillon-iot",           name: "Vanne papillon IoT LoRa/4G avec actionneur électrique quart de tour",                description: "Vanne papillon avec actionneur électrique quart de tour. Communication LoRa et 4G intégrée.",                                                                                                                                                                                                                                                                                                                                                                                        longDescription: "Vanne papillon industrielle avec actionneur électrique quart de tour. Équipée des technologies LoRa et 4G pour une communication fiable à longue distance. Idéale pour les applications industrielles nécessitant un contrôle précis du débit.", price: 332500, originalPrice: 350000, image: "https://static.wixstatic.com/media/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png/v1/fill/w_748,h_780,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_0bfea267808b4dc0b1cb3a376674b5b3~mv2.png", category: "vanne", specs: ["LoRa", "4G intégrée", "Quart de tour", "Monitoring"], features: ["Communication longue distance","Actionneur électrique précis","Contrôle à distance fiable","Maintenance simplifiée"] },
  { id: "vanne-automatique-electrique", name: "Vanne automatique électrique",               description: "Vanne motorisée solaire pour l'automatisation de votre irrigation. Pilotage à distance, programmation horaire, étanche IP68.",                                                                                                                                                                                                                                                                                                                                                       longDescription: "Vanne automatique électrique conçue pour l'automatisation complète de votre système d'irrigation. Pilotage à distance via application mobile, programmation horaire et contrôle du débit. Certifiée IP68 pour une utilisation en toutes conditions.", price: 720000, originalPrice: 800000, image: "https://static.wixstatic.com/media/75ad33_864369e7d3be47febc58a04e28851451~mv2.png/v1/fill/w_749,h_749,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_864369e7d3be47febc58a04e28851451~mv2.png", category: "vanne", specs: ["Motorisation solaire", "Pilotage distant", "Programmation", "Étanche IP68"], features: ["Contrôle à distance","Programmation horaire","Économie d'eau jusqu'à 40%","Installation simple et rapide"] },
  { id: "camera-agricole-4g",           name: "Camera agricole 4G",                        description: "Caméra solaire connectée 4G pour la surveillance de vos parcelles. Vision HD 24/7 avec alertes instantanées.",                                                                                                                                                                                                                                                                                                                                                                       longDescription: "Caméra de surveillance agricole alimentée par énergie solaire avec connexion 4G. Vision nocturne HD, détection de mouvement, alertes en temps réel et stockage cloud. Résistante aux intempéries (IP66).", price: 105000, originalPrice: 125000, image: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png/v1/fill/w_575,h_625,al_c,lg_1,q_85,enc_avif,quality_auto/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png", category: "camera", specs: ["Vision HD 24/7", "100% solaire", "Alertes instantanées", "Stockage cloud"], features: ["Surveillance 24h/24","Vision nocturne infrarouge","Détection de mouvement","Étanche IP66"] },
  { id: "arroseur-auto-4g",             name: "Arroseur automatique 4G pour système d'arrosage",                   description: "Système d'arrosage automatique pilotable à distance. Compatible goutte-à-goutte et aspersion.",                                                                                                                                                                                                                                                                                                                                                                                      longDescription: "Système d'irrigation intelligent pilotable via application mobile. Compatible avec les systèmes goutte-à-goutte et aspersion. Programmation personnalisable selon les besoins de vos cultures.", price: 145000, originalPrice: 165000, image: "https://static.wixstatic.com/media/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png/v1/fill/w_748,h_785,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_96d249a4714640d39ac9a456cc6aaa83~mv2.png", category: "irrigation", specs: ["Pilotage 4G", "Goutte-à-goutte", "Aspersion", "Programmation"], features: ["Application mobile intuitive","Économie d'eau optimale","Multi-programmes","Capteurs intégrés"] },
  { id: "st-02x",                       name: "ST-02_X",                                   description: "Solution polyvalente adaptée aux systèmes goutte-à-goutte et aspersion. La référence des agriculteurs.",                                                                                                                                                                                                                                                                                                                                                                               longDescription: "La solution ST-02_X est la référence des agriculteurs pour l'irrigation de précision. Compatible goutte-à-goutte et aspersion, elle s'adapte à tous types de cultures et de configurations de terrain.", price: 195000, image: "https://static.wixstatic.com/media/75ad33_5ae75292849c40308616364b4b782980~mv2.png/v1/fill/w_950,h_719,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_5ae75292849c40308616364b4b782980~mv2.png", category: "irrigation", specs: ["Goutte-à-goutte", "Aspersion", "Pilotage mobile", "Robuste"], features: ["Haute compatibilité","Robustesse maximale","Maintenance facile","Pilotage intuitif"] },
  { id: "st-03i",                       name: "ST-03_I",                                   description: "Conçu pour l'industrie, la distribution d'eau, les pipelines et les canalisations.",                                                                                                                                                                                                                                                                                                                                                                                                  longDescription: "Le ST-03_I est spécialement conçu pour les applications industrielles exigeantes. Distribution d'eau, pipelines, canalisations : ce système robuste assure un monitoring 24/7 pour une fiabilité maximale.", price: 420000, image: "https://static.wixstatic.com/media/75ad33_f441855cdd1743b8982ad0a497d536c8~mv2.jpeg/v1/fill/w_1895,h_926,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_f441855cdd1743b8982ad0a497d536c8~mv2.jpeg", category: "industriel", specs: ["Usage intensif", "Pipeline", "Canalisation", "Monitoring 24/7"], features: ["Construction robuste","Contrôle précis du débit","Alertes automatiques","Maintenance préventive"] },
  { id: "sotilma-st02t",                name: "Sotilma-st02T",                             description: "Gestion de doubles parcelles et distribution d'eau optimisée. Solution complète pour les exploitants.",                                                                                                                                                                                                                                                                                                                                                                                longDescription: "Le Sotilma-st02T est la solution idéale pour la gestion de doubles parcelles. Distribution d'eau optimisée, contrôle autonome et connectivité avancée pour une irrigation sans compromis.", price: 333000, originalPrice: 370000, image: "https://static.wixstatic.com/media/75ad33_70a7caed24c340fa8047ed8e23a2cad2~mv2.png/v1/fill/w_530,h_677,al_c,lg_1,q_85,enc_avif,quality_auto/75ad33_70a7caed24c340fa8047ed8e23a2cad2~mv2.png", category: "distribution", specs: ["Double parcelle", "Distribution eau", "Autonome", "Connecté"], features: ["Gestion intelligente","Économie d'eau maximale","Application dédiée","Support technique inclus"] },
  { id: "camera-basic",                 name: "Caméra Basic",                              description: "Caméra solaire d'entrée de gamme pour la surveillance visuelle de vos parcelles.",                                                                                                                                                                                                                                                                                                                                                                                                    longDescription: "Solution de surveillance abordable pour démarrer le monitoring de vos parcelles agricoles. Alimentée par énergie solaire, installation simple et rapide.", price: 75000, originalPrice: 85000, image: "https://static.wixstatic.com/media/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png/v1/fill/w_575,h_625,al_c,lg_1,q_85,enc_avif,quality_auto/75ad33_2b84b31e551f42e8ba634f3823910159~mv2.png", category: "camera", specs: ["Full HD", "Solaire", "WiFi/4G", "Étanche IP66"], features: ["Installation simple","Qualité HD","Vision de jour","Application mobile"] },
  { id: "vanne-simple",                 name: "Vanne motorisée standard",                  description: "Vanne motorisée solaire simple voie. Idéale pour débuter l'automatisation de votre irrigation.",                                                                                                                                                                                                                                                                                                                                                                                     longDescription: "La solution idéale pour débuter dans l'automatisation de l'irrigation. Simple à installer et à utiliser, cette vanne motorisée solaire vous permet de contrôler votre irrigation à distance.", price: 180000, originalPrice: 210000, image: "https://static.wixstatic.com/media/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg/v1/fill/w_446,h_544,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_82b826c91cd44c88954123ab55cbc531~mv2.jpg", category: "vanne", specs: ["Simple voie", "Solaire", "Pilotage 4G", "Étanche"], features: ["Prise en main rapide","Application intuitive","Économie d'énergie","Garantie 2 ans"] },
  { id: "vanne-industrielle-papillon",  name: "Vanne industrielle papillon électrique",               description: "Vanne industrielle papillon avec actionneur électrique pour applications intensives.",                                                                                                                                                                                                                                                                                                                                                                                                 longDescription: "Vanne papillon électrique conçue pour les environnements industriels les plus exigeants. Actionneur puissant, matériaux résistants à la corrosion, contrôle précis du débit.", price: 527000, image: "https://static.wixstatic.com/media/75ad33_8d18ecdc976649c2af880eb99f21fa96~mv2.png/v1/fill/w_748,h_792,al_c,q_90,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_8d18ecdc976649c2af880eb99f21fa96~mv2.png", category: "vanne", specs: ["Usage industriel", "Haute pression", "Anti-corrosion", "Contrôle précis"], features: ["Matériaux haute résistance","Contrôle PID précis","Retour d'état en temps réel","Sécurité intégrée"] },
  { id: "pack-pro",                     name: "Kit Pack Pro",                              description: "Pack complet caméra + vanne pour une solution d'irrigation intégrale.",                                                                                                                                                                                                                                                                                                                                                                                                                longDescription: "1. Pack d’Automatisation pour 2 Hectares\n• Description : Système d’irrigation intelligente pour les petites exploitations.\n• Fonctionnalités : Gestion de l’eau à distance, ajustement automatique en fonction des conditions climatiques, monitoring en temps réel.\n• Avantages : Réduction des coûts de main-d’œuvre, optimisation des rendements.\n• Énergie : 100% solaire.\n\n2. Pack d’Automatisation pour 5 Hectares\n• Description : Système d’irrigation de précision pour des exploitations de taille moyenne.\n• Fonctionnalités : Commande à distance via application mobile, irrigation intelligente basée sur l’humidité du sol.\n• Avantages : Économies d’eau jusqu’à 40%, optimisation du temps de gestion.\n• Énergie : 100% solaire avec backup intégré.\n\n3. Pack d’Automatisation pour 7 Hectares\n• Description : Automatisation avancée avec gestion optimisée des ressources pour une efficacité accrue.\n• Fonctionnalités : Régulation automatique selon les prévisions météo, contrôle centralisé.\n• Avantages : Réduction significative de la consommation d’eau et d’énergie.\n• Énergie : Alimentation solaire, contrôle 24/7.", price: 1408000, image: "https://static.wixstatic.com/media/75ad33_e7457a5da71342e382e3536852a93c3d~mv2.jpeg/v1/fill/w_748,h_512,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/75ad33_e7457a5da71342e382e3536852a93c3d~mv2.jpeg", category: "pack", specs: ["Caméra + Vanne", "Panneau solaire", "Accessoires", "Application"], features: ["Installation complète","Économisez 15%","Support prioritaire","Garantie étendue 3 ans"] },
];

const catLabels: Record<string, string> = {
  vanne: "Vannes", irrigation: "Irrigation", camera: "Caméras",
  industriel: "Industriel", distribution: "Distribution", pack: "Packs",
};

function fmt(n: number) {
  return new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 0 }).format(n) + " CFA";
}

// ─── Page ──────────────────────────────────────────────────────
export default function ProduitPage() {
  const { id } = useParams();
  const router = useRouter();
  const { add } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  function handleAddToCart() {
    if (!product) return;
    add({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function handleBuyNow() {
    if (!product) return;
    add({ id: product.id, name: product.name, price: product.price, image: product.image, quantity: 1 });
    router.push("/panier");
  }

  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center space-y-3">
          <p className="text-sm font-semibold" style={{ color: TEXT_D }}>Produit introuvable</p>
          <Link href="/boutique" className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 rounded-full text-white inline-block" style={{ backgroundColor: BLUE }}>
            Retour boutique
          </Link>
        </div>
      </main>
    );
  }

  const images  = product.images ?? [product.image];
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <main className="bg-white min-h-screen">

      {/* ── Fil d'Ariane ── */}
      <div className="border-b" style={{ borderColor: "#EEF3F8" }}>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-3 flex items-center gap-1.5 text-[10px]" style={{ color: TEXT_M }}>
          <Link href="/" className="hover:opacity-60 transition-opacity">Accueil</Link>
          <span>/</span>
          <Link href="/boutique" className="hover:opacity-60 transition-opacity">Boutique</Link>
          <span>/</span>
          <span className="font-semibold line-clamp-1" style={{ color: TEXT_D }}>{product.name}</span>
        </div>
      </div>

      {/* ── Contenu principal ── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-8 md:py-12">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ── Galerie ── */}
          <div className="space-y-3">
            {/* Image principale */}
            <div
              className="relative aspect-square rounded-2xl overflow-hidden"
              style={{ backgroundColor: LIGHT }}
            >
              <Image
                src={images[selectedImage]}
                alt={product.name}
                fill
                className="object-contain p-8 transition-opacity duration-300"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {discount && (
                <span className="absolute top-4 left-4 bg-red-500 text-white text-[9px] font-black px-2.5 py-1 rounded-full">
                  -{discount}%
                </span>
              )}
            </div>

            {/* Miniatures */}
            {images.length > 1 && (
              <div className="flex gap-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className="relative w-16 h-16 rounded-xl overflow-hidden transition-all duration-200"
                    style={{
                      backgroundColor: LIGHT,
                      border: selectedImage === i ? `2px solid ${BLUE}` : "2px solid #E8EEF4",
                    }}
                  >
                    <Image src={img} alt={`Vue ${i + 1}`} fill className="object-contain p-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Infos produit ── */}
          <div>
            {/* Catégorie */}
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] mb-2" style={{ color: BLUE }}>
              {catLabels[product.category] ?? product.category}
            </p>

            {/* Nom */}
            <h1
              className="font-bold leading-tight tracking-tight mb-5"
              style={{ fontSize: "clamp(1.3rem, 2.5vw, 1.9rem)", color: TEXT_D }}
            >
              {product.name}
            </h1>

            {/* Prix */}
            <div
              className="flex flex-wrap items-baseline gap-3 pb-5 mb-5"
              style={{ borderBottom: "1px solid #EEF3F8" }}
            >
              <span className="font-black" style={{ fontSize: "clamp(1.4rem, 2.5vw, 1.8rem)", color: BLUE }}>
                {fmt(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-sm line-through" style={{ color: "#A0B4C8" }}>
                    {fmt(product.originalPrice)}
                  </span>
                  <span
                    className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                    style={{ backgroundColor: "#DCFCE7", color: "#16A34A" }}
                  >
                    -{discount}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="text-sm leading-relaxed mb-6 space-y-4" style={{ color: TEXT_M, whiteSpace: "pre-line" }}>
              {product.longDescription ? product.longDescription : product.description}
            </div>

            {/* Specs — pills */}
            {product.specs && product.specs.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {product.specs.map((s) => (
                  <span
                    key={s}
                    className="text-[10px] font-semibold px-3 py-1.5 rounded-full"
                    style={{ color: BLUE, backgroundColor: `${BLUE}0E`, border: `1px solid ${BLUE}22` }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}

            {/* Features — checklist */}
            {product.features && product.features.length > 0 && (
              <div className="space-y-2.5 pb-6 mb-6" style={{ borderBottom: "1px solid #EEF3F8" }}>
                {product.features.map((f) => (
                  <div key={f} className="flex items-center gap-3">
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${BLUE}12` }}
                    >
                      <svg className="w-3 h-3" fill="none" stroke={BLUE} strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    <span className="text-sm" style={{ color: TEXT_D }}>{f}</span>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-2.5 mb-6">
              <button
                onClick={handleAddToCart}
                className="flex items-center justify-center gap-2 w-full text-white font-semibold text-sm py-3.5 rounded-xl transition-all duration-300 hover:brightness-110"
                style={{ backgroundColor: added ? "#16A34A" : BLUE, boxShadow: `0 6px 20px ${BLUE}35` }}
              >
                {added ? (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Ajouté au panier !
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    Ajouter au panier
                  </>
                )}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex items-center justify-center gap-2 w-full font-semibold text-sm py-3.5 rounded-xl transition-all duration-300 hover:brightness-110"
                style={{ border: `2px solid ${BLUE}`, color: BLUE }}
              >
                Commander maintenant →
              </button>
              <Link
                href="/contact"
                className="flex items-center justify-center gap-2 w-full text-sm py-3 rounded-xl transition-all duration-300 hover:opacity-75"
                style={{ color: TEXT_M }}
              >
                Demander un devis personnalisé
              </Link>
            </div>

            {/* Badges de confiance */}
            <div className="grid grid-cols-3 gap-3 pt-5" style={{ borderTop: "1px solid #EEF3F8" }}>
              {[
                { icon: "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4", label: "Livraison rapide" },
                { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", label: "Support 24/7" },
                { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Garantie 2 ans" },
              ].map((b) => (
                <div key={b.label} className="flex flex-col items-center text-center gap-1.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: `${BLUE}10` }}>
                    <svg className="w-4 h-4" fill="none" stroke={BLUE} strokeWidth={1.8} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d={b.icon} />
                    </svg>
                  </div>
                  <p className="text-[9px] font-semibold leading-tight" style={{ color: TEXT_M }}>{b.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Retour boutique ── */}
        <div className="mt-12 pt-8 flex justify-center" style={{ borderTop: "1px solid #EEF3F8" }}>
          <Link
            href="/boutique"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-opacity hover:opacity-70"
            style={{ color: TEXT_M }}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Retour à la boutique
          </Link>
        </div>
      </div>
    </main>
  );
}
