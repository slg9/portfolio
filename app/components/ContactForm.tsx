"use client";
import { useFormStatus } from "react-dom";
import { useState } from "react";

function InputField({
    id,
    label,
    type = "text",
    required = false,
    placeholder = " ",
    autoComplete,
}: {
    id: string;
    label: string;
    type?: string;
    required?: boolean;
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
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="peer w-full rounded-xl border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
            />
           
        </div>
    );
}

function TextareaField({
    id,
    label,
    required = false,
    rows = 6,
    placeholder = " ",
}: {
    id: string;
    label: string;
    required?: boolean;
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

export default function ContactForm({
    action,
}: {
    action: (formData: FormData) => Promise<{ ok: boolean }>;
}) {
    const { pending } = useFormStatus();
    const [msg, setMsg] = useState<null | { type: "ok" | "err"; text: string }>(null);

    // Option: hook React 19 `formAction` si tu veux intercepter la réponse
    async function clientAction(formData: FormData) {
        try {
            const res = await action(formData);
            if (res.ok) {
                setMsg({ type: "ok", text: "✅ Message envoyé !" });
                (document.getElementById("contact-form") as HTMLFormElement)?.reset();
            }
        } catch (e: any) {
            setMsg({ type: "err", text: "❌ Échec de l’envoi." });
            console.error(e);
        }
    }

    return (
        <form id="contact-form" action={clientAction} className="space-y-4 max-w-md mx-auto">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField id="name" label="Votre nom" required placeholder="Nom" />
                <InputField id="email" label="Email" type="email" placeholder="Email" required />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField id="subject" label="Sujet" placeholder="Sujet"  />
                <InputField id="phone" label="Téléphone" placeholder="Téléphone"  />

            </div>
            <TextareaField id="message" label="Message" placeholder="Message" required />

            <button
                type="submit"
                disabled={pending}
                className="rounded-lg bg-gradient-to-r from-indigo-600 to-sky-500 px-5 py-3 text-white font-semibold disabled:opacity-60"
            >
                {pending ? "Envoi…" : "Envoyer"}
            </button>

            {msg && (
                <p className={`text-sm ${msg.type === "ok" ? "text-emerald-600" : "text-rose-600"}`}>
                    {msg.text}
                </p>
            )}
        </form>
    );
}
