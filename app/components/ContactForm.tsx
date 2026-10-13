"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle, CircleNotch, WarningCircle } from "@phosphor-icons/react";

function Field({
  id,
  label,
  type = "text",
  required = false,
  autoComplete,
  multiline = false,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>
        {label}
        {required && <span className="req" aria-hidden>*</span>}
      </label>
      {multiline ? (
        <textarea id={id} name={id} required={required} rows={5} />
      ) : (
        <input id={id} name={id} type={type} required={required} autoComplete={autoComplete} />
      )}
    </div>
  );
}

function SubmitButton({ label, loadingLabel }: { label: string; loadingLabel: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" className="btn btn-solid" disabled={pending} aria-busy={pending}>
      {pending ? (
        <>
          <CircleNotch size={18} weight="bold" className="spin" aria-hidden />
          {loadingLabel}
        </>
      ) : (
        <>
          {label}
          <ArrowRight size={18} weight="bold" aria-hidden />
        </>
      )}
    </button>
  );
}

export default function ContactForm({
  action,
}: {
  action: (formData: FormData) => Promise<{ ok: boolean }>;
}) {
  const t = useTranslations("contact.form");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  async function clientAction(formData: FormData) {
    try {
      const res = await action(formData);
      setStatus(res.ok ? "success" : "error");
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="form-done" role="status">
        <CheckCircle size={40} weight="bold" aria-hidden />
        <p>{t("success")}</p>
        <button type="button" className="btn btn-line" style={{ color: "inherit", borderColor: "currentColor" }} onClick={() => setStatus("idle")}>
          {t("sendAnother")}
        </button>
      </div>
    );
  }

  return (
    <form id="contact-form" action={clientAction} className="form">
      <div className="form-row">
        <Field id="name" label={t("name")} required autoComplete="name" />
        <Field id="email" label={t("email")} type="email" required autoComplete="email" />
      </div>
      <div className="form-row">
        <Field id="subject" label={t("subject")} />
        <Field id="phone" label={t("phone")} type="tel" autoComplete="tel" />
      </div>
      <Field id="message" label={t("message")} required multiline />

      <div style={{ display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" }}>
        <SubmitButton label={t("send")} loadingLabel={t("sending")} />
        {status === "error" && (
          <p className="form-msg" role="alert">
            <WarningCircle size={20} weight="bold" aria-hidden />
            {t("error")}
          </p>
        )}
      </div>
    </form>
  );
}
