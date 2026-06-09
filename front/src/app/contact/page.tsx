"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type FormState = "idle" | "loading" | "success" | "error";

const INITIAL_FORM = { firstName: "", lastName: "", email: "", phone: "", message: "" };

const BLUE   = "#1E72B8";
const DARK   = "#0D2235";
const GOLD   = "#E8B84B";
const TEXT_D = "#0D2235";
const TEXT_M = "#3D5C78";

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

export default function ContactPage() {
  const [form, setForm]         = useState(INITIAL_FORM);
  const [state, setState]       = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:    `${form.firstName} ${form.lastName}`.trim(),
          email:   form.email,
          phone:   form.phone,
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
    <main className="overflow-hidden">

      {/* ── FORMULAIRE + INFOS ── */}
      <section style={{ backgroundColor: "#F5F9FD" }}>
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-10 md:py-14">

          {/* En-tête de section */}
          <motion.div className="text-center mb-12"
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.55 }}>
            <p className="text-[10px] font-medium tracking-[0.35em] uppercase mb-3" style={{ color: BLUE }}>
              SOTILMA BUSINESS
            </p>
            <p className="mt-6 text-gray-300 max-w-2xl mx-auto">
              Une plateforme intelligente pour automatiser, surveiller et optimiser vos systèmes d’irrigation et équipements agricoles en temps réel.
            </p>
            <div className="mx-auto" style={{ width: 44, height: 3, backgroundColor: BLUE, borderRadius: 4 }} />
          </motion.div>
        </div>
      </section>
      {/* PROBLEMES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 py-10 md:py-14">

          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: DARK }}>
            Les problèmes que nous résolvons
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "Gestion manuelle des systèmes d’irrigation",
              "Perte d’eau et gaspillage des ressources",
              "Manque de visibilité en temps réel",
            ].map((p, i) => (
                <div key={i} className="p-6 border rounded-xl">
                  <p style={{ color: TEXT_M }}>{p}</p>
                </div>
            ))}

          </div>
        </div>
      </section>

      {/* SOLUTIONS */}
      <section className="py-16" style={{ backgroundColor: "#F5F9FD" }}>
        <div className="max-w-6xl mx-auto px-6">

          <h2 className="text-2xl font-bold text-center mb-10" style={{ color: DARK }}>
            Nos solutions intelligentes
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              {
                title: "Contrôle à distance",
                desc: "Activez et gérez vos pompes et vannes depuis votre téléphone."
              },
              {
                title: "Automatisation IoT",
                desc: "Scénarios intelligents basés sur le temps, la météo et l’humidité."
              },
              {
                title: "Monitoring en temps réel",
                desc: "Suivi instantané des débits, capteurs et performances."
              }
            ].map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow">
                  <h3 className="font-semibold mb-2" style={{ color: DARK }}>
                    {s.title}
                  </h3>
                  <p style={{ color: TEXT_M }}>{s.desc}</p>
                </div>
            ))}

          </div>
        </div>
      </section>

      {/* BENEFICES */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-2xl font-bold mb-10" style={{ color: DARK }}>
            Pourquoi SOTILMA ?
          </h2>

          <div className="grid md:grid-cols-4 gap-6">

            {[
              "Jusqu’à -40% de consommation d’eau",
              "Gain de temps opérationnel",
              "Réduction des erreurs humaines",
              "Pilotage 100% digital"
            ].map((b, i) => (
                <div key={i} className="p-5 border rounded-xl">
                  <p style={{ color: TEXT_M }}>{b}</p>
                </div>
            ))}

          </div>
        </div>
      </section>

      {/* CAS D'USAGE */}
      <section className="py-16" style={{ backgroundColor: "#F5F9FD" }}>
        <div className="max-w-6xl mx-auto px-6 text-center">

          <h2 className="text-2xl font-bold mb-10" style={{ color: DARK }}>
            Cas d’utilisation
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            {[
              "Agriculture intelligente",
              "Exploitations agricoles",
              "Projets d’irrigation gouvernementaux",
            ].map((c, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow">
                  <p style={{ color: TEXT_M }}>{c}</p>
                </div>
            ))}

          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="text-white py-20">
        <div className="max-w-4xl mx-auto text-center px-6">

          <h2 className="text-3xl font-bold">
            Prêt à moderniser votre système ?
          </h2>

          <p className="mt-4 text-gray-300">
            Passez à une gestion intelligente et connectée avec SOTILMA Business.
          </p>

        </div>
      </section>
    </main>
  );
}
