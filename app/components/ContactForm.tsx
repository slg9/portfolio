"use client";
import { useFormStatus } from "react-dom";
import { useState } from "react";
import { useTranslations } from 'next-intl';
import Lottie from "lottie-react";
import sendAnimation from "@/public/lotties/send-success.json";

const fieldStyle: React.CSSProperties = {
    width: "100%",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(255,255,255,0.04)",
    padding: "14px 16px",
    fontSize: "0.9rem",
    color: "#F0F4FF",
    outline: "none",
    transition: "border-color 0.2s, box-shadow 0.2s",
    fontFamily: "var(--font-body), sans-serif",
};

const labelStyle: React.CSSProperties = {
    display: "block",
    marginBottom: 6,
    fontSize: "0.75rem",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#6B7A99",
};

function InputField({
    id,
    label,
    type = "text",
    required = false,
    autoComplete,
}: {
    id: string;
    label: string;
    type?: string;
    required?: boolean;
    autoComplete?: string;
}) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label htmlFor={id} style={labelStyle}>
                {label}{required && <span style={{ color: "#FF5F57", marginLeft: 4 }}>*</span>}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                required={required}
                autoComplete={autoComplete}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    ...fieldStyle,
                    borderColor: focused ? "#0A84FF" : "rgba(255,255,255,0.08)",
                    boxShadow: focused ? "0 0 0 3px rgba(10,132,255,0.15)" : "none",
                }}
            />
        </div>
    );
}

function TextareaField({
    id,
    label,
    required = false,
    rows = 5,
}: {
    id: string;
    label: string;
    required?: boolean;
    rows?: number;
}) {
    const [focused, setFocused] = useState(false);
    return (
        <div>
            <label htmlFor={id} style={labelStyle}>
                {label}{required && <span style={{ color: "#FF5F57", marginLeft: 4 }}>*</span>}
            </label>
            <textarea
                id={id}
                name={id}
                required={required}
                rows={rows}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                style={{
                    ...fieldStyle,
                    resize: "vertical",
                    borderColor: focused ? "#0A84FF" : "rgba(255,255,255,0.08)",
                    boxShadow: focused ? "0 0 0 3px rgba(10,132,255,0.15)" : "none",
                }}
            />
        </div>
    );
}

function SubmitButton({ label, loadingLabel }: { label: string; loadingLabel: string }) {
    const { pending } = useFormStatus();
    return (
        <button
            type="submit"
            disabled={pending}
            style={{
                borderRadius: 999,
                background: "linear-gradient(135deg, #0A84FF, #00D4FF)",
                padding: "13px 32px",
                fontSize: "0.875rem",
                fontWeight: 700,
                color: "#fff",
                border: "none",
                cursor: pending ? "not-allowed" : "pointer",
                opacity: pending ? 0.6 : 1,
                transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 0 24px rgba(10,132,255,0.35)",
                letterSpacing: "0.04em",
            }}
            onMouseEnter={(e) => {
                if (!pending) {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-2px)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 8px 32px rgba(10,132,255,0.55)";
                }
            }}
            onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.transform = "";
                (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 0 24px rgba(10,132,255,0.35)";
            }}
        >
            {pending ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" style={{ animation: "cfSpin 0.8s linear infinite" }}>
                        <circle cx="7" cy="7" r="5" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
                        <path d="M7 2 A5 5 0 0 1 12 7" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                    {loadingLabel}
                </span>
            ) : label}
        </button>
    );
}

export default function ContactForm({
    action,
}: {
    action: (formData: FormData) => Promise<{ ok: boolean }>;
}) {
    const t = useTranslations('contact.form');
    const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    async function clientAction(formData: FormData) {
        setStatus("sending");
        try {
            const res = await action(formData);
            if (res.ok) {
                setStatus("success");
                (document.getElementById("contact-form") as HTMLFormElement)?.reset();
            }
        } catch (e: any) {
            setStatus("error");
            setErrorMsg(t('error'));
            console.error(e);
        }
    }

    // Success overlay: Lottie plays once then stays on last frame
    if (status === "success") {
        return (
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: 16,
                padding: "24px 0",
                minHeight: 280,
            }}>
                <div style={{ width: 200, maxWidth: "80%" }}>
                    <Lottie
                        animationData={sendAnimation}
                        loop={false}
                        style={{ width: "100%", height: "auto" }}
                    />
                </div>
                <p style={{
                    margin: 0,
                    fontSize: "1rem",
                    fontWeight: 700,
                    color: "#F0F4FF",
                    textAlign: "center",
                }}>
                    {t('success')}
                </p>
                <button
                    onClick={() => setStatus("idle")}
                    style={{
                        marginTop: 8,
                        background: "transparent",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 999,
                        padding: "8px 20px",
                        fontSize: "0.8rem",
                        color: "#6B7A99",
                        cursor: "pointer",
                        transition: "all 0.2s",
                    }}
                    onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "#00D4FF";
                        (e.currentTarget as HTMLButtonElement).style.color = "#00D4FF";
                    }}
                    onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.12)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#6B7A99";
                    }}
                >
                    {t('sendAnother')}
                </button>
            </div>
        );
    }

    return (
        <>
        <style>{`
            @keyframes cfSpin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
            #contact-form input::placeholder,
            #contact-form textarea::placeholder { color: rgba(107,122,153,0.6); }
            #contact-form input:-webkit-autofill,
            #contact-form input:-webkit-autofill:focus {
                -webkit-box-shadow: 0 0 0 1000px #080a1e inset;
                -webkit-text-fill-color: #F0F4FF;
                caret-color: #F0F4FF;
            }
        `}</style>
        <form id="contact-form" action={clientAction} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="contact-grid-2">
                <InputField id="name" label={t('name')} required />
                <InputField id="email" label={t('email')} type="email" required />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="contact-grid-2">
                <InputField id="subject" label={t('subject')} />
                <InputField id="phone" label={t('phone')} />
            </div>
            <TextareaField id="message" label={t('message')} required rows={5} />

            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <SubmitButton label={t('send')} loadingLabel={t('sending')} />
                {status === "error" && (
                    <p style={{
                        fontSize: "0.875rem", fontWeight: 500,
                        color: "#FF5F57", display: "flex", alignItems: "center", gap: 6, margin: 0,
                    }}>
                        ✕ {errorMsg}
                    </p>
                )}
            </div>
        </form>
        </>
    );
}
