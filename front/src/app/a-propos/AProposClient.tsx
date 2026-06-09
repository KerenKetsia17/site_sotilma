"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

import { Reveal } from "@/components/ui/Reveal";
import { GalleryLightbox } from "@/components/ui/GalleryLightbox";

const BLUE   = "#1E72B8";
const LIGHT  = "#F5F9FD";
const TEXT_D = "#0D2235";
const TEXT_M = "#5A7A94";
const DARK   = "#0D2235";
const GOLD   = "#E8B84B";

type FormState = "idle" | "loading" | "success" | "error";
const INITIAL_FORM = { firstName: "", lastName: "", email: "", phone: "", message: "" };
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
const contacts = [
    {
        label: "Besoin d'aide ?",
        value: "sntech.afrique@gmail.com",
        href:  "mailto:sntech.afrique@gmail.com",
        icon:  "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
        desc:  "Écrivez-nous directement",
    },
    {
        label: "Appel téléphonique",
        value: "+221 77 674 09 24 / +221 78 155 94 16",
        href:  "tel:+221776740924",
        icon:  "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
        desc:  "",
    },
];

export default function AProposPage() {
    const [form, setForm] = useState(INITIAL_FORM);
    const [state, setState] = useState<FormState>("idle");
    const [errorMsg, setErrorMsg] = useState("");

    function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setForm((prev) => ({...prev, [e.target.name]: e.target.value}));
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setState("loading");
        setErrorMsg("");
        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({
                    name: `${form.firstName} ${form.lastName}`.trim(),
                    email: form.email,
                    phone: form.phone,
                    message: form.message,
                }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error ?? "Erreur serveur");
            }
            setState("success");
            setForm(INITIAL_FORM);
        } catch (err) {
            setState("error");
            setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue.");
        }
    }

    return (
        <main className="overflow-hidden bg-white">

            {/* ══ 1. HEADER — titre centré + barre bleue ══ */}
            <section className="bg-white" style={{borderBottom: "1px solid #E8EFF6"}}>
                <div className="max-w-2xl mx-auto px-6 sm:px-10 py-10 text-center">
                    <Reveal>
                        <p className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3" style={{color: BLUE}}>
                            À PROPOS DE NOUS
                        </p>
                        <h1 className="font-normal leading-tight mb-0"
                            style={{fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", color: TEXT_D}}>
                            Ce que nous <span style={{color: BLUE}}>faisons</span>
                        </h1>
                        <div className="mx-auto my-5"
                             style={{width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4}}/>
                        <p className="text-base mb-4" style={{color: TEXT_M, lineHeight: 1.9}}>
                            SOTILMA révolutionne la gestion de l&apos;eau dans l&apos;agriculture et l&apos;industrie en
                            offrant
                            des solutions intelligentes et automatisées. Grâce à notre technologie innovante, vous
                            pouvez
                            contrôler et optimiser l&apos;irrigation de votre ferme directement depuis votre smartphone,
                            sans besoin d&apos;internet.
                        </p>
                        <p className="text-base mb-8" style={{color: TEXT_M, lineHeight: 1.9}}>
                            Nos solutions sont conçues pour simplifier votre quotidien tout en maximisant
                            l&apos;efficacité
                            et la rentabilité de vos opérations — une start-up sénégalaise au service de l&apos;Afrique.
                        </p>
                        <Link href="/expertise"
                              className="inline-flex items-center gap-2 font-medium text-sm px-8 py-3.5 transition-all hover:opacity-85"
                              style={{backgroundColor: BLUE, color: "#FFFFFF", borderRadius: 40}}>
                            EN SAVOIR PLUS
                        </Link>
                    </Reveal>
                </div>
            </section>

            {/* ══ 3. NOTRE HISTOIRE ══ */}
            <section style={{backgroundColor: LIGHT, borderBottom: "1px solid #E8EFF6"}}>
                <div className="max-w-2xl mx-auto px-6 sm:px-10 py-14">
                    <Reveal>
                        <div className="text-center mb-8">
                            <p className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3"
                               style={{color: BLUE}}>
                                NOTRE PARCOURS
                            </p>
                            <h2 className="font-normal leading-tight mb-0"
                                style={{fontSize: "clamp(1.4rem, 2.5vw, 2rem)", color: TEXT_D}}>
                                Notre <span style={{color: BLUE}}>histoire</span>
                            </h2>
                            <div className="mx-auto mt-4"
                                 style={{width: 40, height: 3, backgroundColor: BLUE, borderRadius: 4}}/>
                        </div>
                    </Reveal>
                    <div className="space-y-5 mt-8">
                        <Reveal delay={0.1}>
                            <p className="text-base" style={{color: TEXT_M, lineHeight: 1.9}}>
                                Notre histoire a commencé avec une simple observation : la gestion de l&apos;eau, une
                                ressource
                                si précieuse, était souvent inefficace et source de gaspillage, particulièrement dans le
                                secteur
                                agricole. Au Sénégal, comme dans de nombreux autres pays africains, les agriculteurs
                                faisaient face
                                à des défis liés à la disponibilité de l&apos;eau, l&apos;irrégularité des
                                précipitations et la
                                difficulté de surveiller et d&apos;optimiser l&apos;irrigation.
                            </p>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="text-base" style={{color: TEXT_M, lineHeight: 1.9}}>
                                Face à ces défis, nous avons décidé d&apos;agir. Nous sommes partis d&apos;une idée
                                ambitieuse :
                                créer une solution technologique locale, adaptée aux réalités du terrain, pour aider les
                                agriculteurs
                                à mieux gérer leur eau et à maximiser leurs rendements. C&apos;est ainsi qu&apos;est née
                                SOTILMA,
                                une start-up sénégalaise dédiée à la conception et au développement de technologies de
                                gestion de
                                l&apos;eau.
                            </p>
                        </Reveal>
                        <Reveal delay={0.3}>
                            <p className="text-base" style={{color: TEXT_M, lineHeight: 1.9}}>
                                Notre innovation repose sur une technologie de comptage d&apos;eau intelligente,
                                intégrant des vannes
                                autonomes fonctionnant à l&apos;énergie solaire. Ce système permet aux agriculteurs de
                                contrôler
                                l&apos;irrigation à distance, même sans connexion internet, grâce à une application
                                mobile ou notre
                                plateforme SOTILMA_Connect.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* ══ 4. NOS RÉALISATIONS — galerie style Solari gallery ══ */}
            <section className="bg-white pb-16 md:pb-24" style={{borderBottom: "1px solid #E8EFF6"}}>
                <div className="max-w-4xl mx-auto px-6 sm:px-10 pt-14 pb-10 text-center">
                    <Reveal>
                        <p className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3" style={{color: BLUE}}>
                            GALERIE
                        </p>
                        <h2 className="font-normal leading-tight mb-0"
                            style={{fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: TEXT_D}}>
                            Nos réalisations
                        </h2>
                        <div className="mx-auto my-4"
                             style={{width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4}}/>
                        <p className="text-base mx-auto" style={{color: TEXT_M, maxWidth: 480, lineHeight: 1.8}}>
                            Des installations déployées sur le terrain, au service des agriculteurs africains.
                        </p>
                    </Reveal>
                </div>

                {/* Grille bento/masonry avec lightbox */}
                <GalleryLightbox items={realisations}/>
            </section>
            <section style={{backgroundColor: "#F5F9FD"}}>
                <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-10 md:py-14">

                    {/* En-tête de section */}
                    <motion.div className="text-center mb-12"
                                initial={{opacity: 0, y: 24}} whileInView={{opacity: 1, y: 0}}
                                viewport={{once: true, margin: "-40px"}} transition={{duration: 0.55}}>
                        <p className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3" style={{color: BLUE}}>
                            CONTACTEZ-NOUS
                        </p>
                        <div className="mx-auto"
                             style={{width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4}}/>
                    </motion.div>

                    <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">

                        {/* ── Formulaire gauche ── */}
                        <motion.div
                            initial={{opacity: 0, x: -30}} whileInView={{opacity: 1, x: 0}}
                            viewport={{once: true, margin: "-40px"}} transition={{duration: 0.55, delay: 0.1}}>
                            {state === "success" ? (
                                <div className="flex items-center gap-4 rounded-xl p-6"
                                     style={{
                                         backgroundColor: "rgba(34,160,71,0.15)",
                                         border: "1px solid rgba(34,160,71,0.3)"
                                     }}>
                                    <svg className="w-7 h-7 shrink-0" fill="none" stroke="#4ade80" strokeWidth={2}
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                    </svg>
                                    <div>
                                        <p className="font-medium text-sm" style={{color: "#15803D"}}>Message envoyé
                                            !</p>
                                        <p className="text-xs mt-0.5" style={{color: "#166534"}}>
                                            Nous vous répondrons dans les 24 heures.
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-7">
                                    {/* Prénom / Nom */}
                                    <div className="grid sm:grid-cols-2 gap-7">
                                        {[
                                            {
                                                label: "Votre prénom",
                                                name: "firstName",
                                                value: form.firstName,
                                                placeholder: "Jean"
                                            },
                                            {
                                                label: "Votre nom",
                                                name: "lastName",
                                                value: form.lastName,
                                                placeholder: "Dupont"
                                            },
                                        ].map((f) => (
                                            <div key={f.name} className="border-b" style={{borderColor: BLUE}}>
                                                <label className="block text-xs font-normal mb-2"
                                                       style={{color: TEXT_M}}>{f.label}</label>
                                                <input
                                                    name={f.name} type="text" value={f.value} onChange={handleChange}
                                                    placeholder={f.placeholder}
                                                    className="w-full bg-transparent pb-2 text-sm outline-none transition-all"
                                                    style={{color: TEXT_D}}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Email */}
                                    <div className="border-b" style={{borderColor: BLUE}}>
                                        <label className="block text-xs font-normal mb-2" style={{color: TEXT_M}}>Votre
                                            e-mail *</label>
                                        <input
                                            name="email" type="email" required value={form.email}
                                            onChange={handleChange}
                                            placeholder="contact@exemple.com"
                                            className="w-full bg-transparent pb-2 text-sm outline-none"
                                            style={{color: TEXT_D}}
                                        />
                                    </div>

                                    {/* Téléphone */}
                                    <div className="border-b" style={{borderColor: BLUE}}>
                                        <label className="block text-xs font-normal mb-2" style={{color: TEXT_M}}>Votre
                                            téléphone</label>
                                        <input
                                            name="phone" type="tel" value={form.phone} onChange={handleChange}
                                            placeholder="+221 77 000 00 00"
                                            className="w-full bg-transparent pb-2 text-sm outline-none"
                                            style={{color: TEXT_D}}
                                        />
                                    </div>

                                    {/* Message */}
                                    <div className="border-b" style={{borderColor: BLUE}}>
                                        <label className="block text-xs font-normal mb-2" style={{color: TEXT_M}}>Message
                                            *</label>
                                        <textarea
                                            name="message" required rows={4} value={form.message}
                                            onChange={handleChange}
                                            placeholder="Comment pouvons-nous vous aider ?"
                                            className="w-full bg-transparent pb-2 text-sm outline-none resize-none"
                                            style={{color: TEXT_D}}
                                        />
                                    </div>

                                    {state === "error" && (
                                        <p className="text-xs px-4 py-3 rounded-lg" style={{
                                            color: "#fca5a5",
                                            backgroundColor: "rgba(220,38,38,0.15)",
                                            border: "1px solid rgba(220,38,38,0.3)"
                                        }}>
                                            {errorMsg}
                                        </p>
                                    )}

                                    <button type="submit" disabled={state === "loading"}
                                            className="px-8 py-3.5 font-normal text-sm transition-all hover:opacity-85 disabled:opacity-50"
                                            style={{backgroundColor: GOLD, color: DARK, borderRadius: 40}}>
                                        {state === "loading" ? "Envoi en cours…" : "Envoyer la demande"}
                                    </button>
                                </form>
                            )}
                        </motion.div>

                        {/* ── Infos droite ── */}
                        <motion.div className="space-y-8 px-8 py-10 rounded-2xl"
                                    style={{backgroundColor: "#EDF4FB", border: "1px solid #D0E6F5"}}
                                    initial={{opacity: 0, x: 30}} whileInView={{opacity: 1, x: 0}}
                                    viewport={{once: true, margin: "-40px"}} transition={{duration: 0.55, delay: 0.15}}>
                            {contacts.map((c) => (
                                <div key={c.label} className="flex items-start gap-5">
                                    <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                                         style={{border: "2px solid rgba(30,114,184,0.25)", color: BLUE}}>
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}
                                             viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d={c.icon}/>
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="font-medium text-base mb-1" style={{color: TEXT_D}}>{c.label}</p>
                                        <p className="text-sm mb-1" style={{color: TEXT_M}}>{c.desc}</p>
                                        {c.href ? (
                                            <a href={c.href}
                                               className="text-base font-normal transition-opacity hover:opacity-80"
                                               style={{color: BLUE}}>
                                                {c.value}
                                            </a>
                                        ) : (
                                            <p className="text-base font-normal" style={{color: BLUE}}>{c.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}

                            {/* WhatsApp */}
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                                     style={{border: "2px solid rgba(30,114,184,0.25)", color: BLUE}}>
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-base mb-1" style={{color: TEXT_D}}>WhatsApp</p>
                                    <a href="https://web.whatsapp.com/send?phone=221770982290" target="_blank"
                                       rel="noopener noreferrer"
                                       className="text-base font-normal" style={{color: BLUE}}>
                                        +221 77 098 22 90
                                    </a>
                                </div>
                            </div>

                            {/* Adresse */}
                            <div className="flex items-start gap-5">
                                <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0"
                                     style={{border: "2px solid rgba(30,114,184,0.25)", color: BLUE}}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8}
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-medium text-base mb-1" style={{color: TEXT_D}}>Localisation</p>
                                    <p className="text-base font-normal" style={{color: BLUE}}>Keur Massar, Dakar —
                                        Sénégal</p>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

        </main>
    );
}