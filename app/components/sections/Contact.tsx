"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import ContactForm from "../ContactForm";
import { sendMailjet } from "@/app/actions/SendMailjet";


type FormState = "idle" | "loading" | "success" | "error";

function InputField({
    id,
    label,
    type = "text",
    required = false,
    value,
    onChange,
    placeholder = " ",
    autoComplete,
}: {
    id: string;
    label: string;
    type?: string;
    required?: boolean;
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    autoComplete?: string;
}) {
    return (
        <div className="relative">
            <input
                id={id}
                name={id}
                type={type}
                required={required}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="peer w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
            <label
                htmlFor={id}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 bg-white px-1 text-sm text-gray-500 transition
                 peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-gray-900"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        </div>
    );
}

function TextareaField({
    id,
    label,
    required = false,
    value,
    onChange,
    rows = 6,
    placeholder = " ",
}: {
    id: string;
    label: string;
    required?: boolean;
    value: string;
    onChange: (v: string) => void;
    rows?: number;
    placeholder?: string;
}) {
    return (
        <div className="relative">
            <textarea
                id={id}
                name={id}
                required={required}
                rows={rows}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="peer w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
            <label
                htmlFor={id}
                className="pointer-events-none absolute left-3 top-3 bg-white px-1 text-sm text-gray-500 transition
                 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400
                 peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-xs peer-focus:text-gray-900"
            >
                {label} {required && <span className="text-red-500">*</span>}
            </label>
        </div>
    );
}

export default function Contact() {
    const [state, setState] = useState<FormState>("idle");
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [form, setForm] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
        phone: "",
        // Honeypot anti-spam (doit rester vide)
        company: "",
    });

    function validate() {
        const e: Record<string, string> = {};
        if (!form.name.trim()) e.name = "Nom obligatoire";
        if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Email valide obligatoire.";
        if (!form.subject.trim()) e.subject = "Objet obligatoire.";
        if (form.message.trim().length < 3) e.message = "Message trop court.";
        // Honeypot
        if (form.company.trim() !== "") e.company = "Spam détecté.";
        setErrors(e);
        return Object.keys(e).length === 0;
    }

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!validate()) return;
        try {
            setState("loading");
            


            setState("success");
            setForm({
                name: "",
                email: "",
                subject: "",
                message: "",
                phone: "",
                company: "",
            });
            setErrors({});
        } catch {
            setState("error");
        } finally {
            setTimeout(() => setState("idle"), 4000);
        }
    }

    return (
        <section
            id="contact"
            className="w-full bg-gradient-to-b from-white to-gray-50 px-6  md:snap-start md:snap-always  "
            aria-labelledby="contact-title"
        >
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <header className="mb-10 text-center md:mb-14">
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.1 }}
                        viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                        className="text-sm font-semibold uppercase tracking-widest bg-gradient-to-r from-indigo-600 to-sky-500 bg-clip-text text-transparent">
                        Contact
                    </motion.p>
                    <motion.h2
                        id="contact-title"
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.2 }}
                        viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                        className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl"
                    >
                        Créons quelque chose de remarquable
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.3 }}
                        viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                        className="mx-auto mt-3 max-w-2xl text-gray-600">
                        Parlez-moi de votre projet (objectifs, échéances, contraintes). Je vous répondrai rapidement.          </motion.p>
                </header>

                {/* Card */}
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ type: "spring", stiffness: 60, damping: 12, delay: 0.4 }}
                    viewport={{ once: true, margin: "-20% 0px -10% 0px" }}
                    className="rounded-2xl border border-0 bg-white p-6  md:p-8">
                    <ContactForm action={sendMailjet} />
                </motion.div>

                {/* Tip de contact direct */}
                <p className="mt-6 text-center text-sm text-gray-500">
                    Plutôt par e-mail{" "}
                    <a
                        className="font-medium text-gray-900 underline underline-offset-4"
                        href="mailto:sebastien@neitsa.fr"
                    >
                        sebastien@neitsa.fr
                    </a>
                </p>
            </div>
        </section>
    );
}

function Spinner() {
    return (
        <svg
            className="h-4 w-4 animate-spin"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" fill="none" opacity="0.25" />
            <path d="M22 12a10 10 0 0 1-10 10" fill="none" stroke="currentColor" strokeWidth="3" />
        </svg>
    );
}
