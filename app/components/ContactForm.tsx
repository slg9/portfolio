"use client";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { useTranslations } from 'next-intl';

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
                className="peer w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-4 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:text-slate-100"
            />
            <label
                htmlFor={id}
                className="pointer-events-none absolute left-4 top-4 bg-[var(--surface)] px-1 text-sm text-slate-500 transition
                 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-slate-900
                 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs
                 dark:peer-focus:text-white"
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
                className="peer w-full rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-4 outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 dark:text-slate-100"
            />
            <label
                htmlFor={id}
                className="pointer-events-none absolute left-4 top-4 bg-[var(--surface)] px-1 text-sm text-slate-500 transition
                 peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm
                 peer-focus:-top-2 peer-focus:text-xs peer-focus:text-slate-900
                 peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-xs
                 dark:peer-focus:text-white"
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
    const t = useTranslations('contact.form');
    const { pending } = useFormStatus();
    const [msg, setMsg] = useState<null | { type: "ok" | "err"; text: string }>(null);

    // Option: hook React 19 `formAction` si tu veux intercepter la réponse
    async function clientAction(formData: FormData) {
        try {
            const res = await action(formData);
            if (res.ok) {
                setMsg({ type: "ok", text: t('success') });
                (document.getElementById("contact-form") as HTMLFormElement)?.reset();
            }
        } catch (e: any) {
            setMsg({ type: "err", text: t('error') });
            console.error(e);
        }
    }

    return (
        <form id="contact-form" action={clientAction} className="space-y-4">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField id="name" label={t('name')} required />
                <InputField id="email" label={t('email')} type="email" required />
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <InputField id="subject" label={t('subject')} />
                <InputField id="phone" label={t('phone')} />

            </div>
            <TextareaField id="message" label={t('message')} required />

            <button
                type="submit"
                disabled={pending}
                className="rounded-full bg-slate-950 px-6 py-3 text-white font-semibold disabled:opacity-60 dark:bg-white dark:text-slate-950"
            >
                {pending ? t('sending') : t('send')}
            </button>

            {msg && (
                <p className={`text-sm ${msg.type === "ok" ? "text-emerald-700" : "text-rose-700"}`}>
                    {msg.text}
                </p>
            )}
        </form>
    );
}
