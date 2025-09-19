"use client";
import { useState } from "react";

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
    if (!form.name.trim()) e.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Valid email required.";
    if (!form.subject.trim()) e.subject = "Subject is required.";
    if (form.message.trim().length < 10) e.message = "Message is too short.";
    // Honeypot
    if (form.company.trim() !== "") e.company = "Spam detected.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    try {
      setState("loading");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Request failed");
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
      id="Contact"
      className="w-full bg-gradient-to-b from-white to-gray-50 px-6 py-20"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <header className="mb-10 text-center md:mb-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
            Contact
          </p>
          <h2
            id="contact-title"
            className="mt-2 text-3xl font-extrabold text-gray-900 md:text-4xl"
          >
            Let’s build something great
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            Tell me about your project (goals, timeline, constraints). I’ll get back to you quickly.
          </p>
        </header>

        {/* Card */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={onSubmit} noValidate className="space-y-6">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputField
                id="name"
                label="Your name"
                required
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
                autoComplete="name"
              />
              <InputField
                id="email"
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                autoComplete="email"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <InputField
                id="phone"
                label="Phone (optional)"
                type="tel"
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
                autoComplete="tel"
              />
              <InputField
                id="subject"
                label="Subject"
                required
                value={form.subject}
                onChange={(v) => setForm((f) => ({ ...f, subject: v }))}
              />
            </div>

            <TextareaField
              id="message"
              label="Your message"
              required
              value={form.message}
              onChange={(v) => setForm((f) => ({ ...f, message: v }))}
              rows={8}
            />

            {/* Honeypot anti-spam (visuellement caché) */}
            <div className="hidden">
              <label htmlFor="company">Company (leave empty)</label>
              <input
                id="company"
                name="company"
                type="text"
                value={form.company}
                onChange={(e) =>
                  setForm((f) => ({ ...f, company: e.target.value }))
                }
                autoComplete="off"
                tabIndex={-1}
              />
            </div>

            {/* Errors */}
            {Object.keys(errors).length > 0 && (
              <ul className="space-y-1 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {Object.entries(errors).map(([k, v]) => (
                  <li key={k}>{v}</li>
                ))}
              </ul>
            )}

            {/* CTA */}
            <div className="flex items-center justify-between gap-4">
              <p className="text-xs text-gray-500">
                By submitting, you agree to be contacted about your request.
              </p>
              <button
                type="submit"
                disabled={state === "loading"}
                className="px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-200"

              >
                {state === "loading" ? (
                  <>
                    <Spinner /> Sending…
                  </>
                ) : state === "success" ? (
                  "Message sent ✓"
                ) : state === "error" ? (
                  "Retry"
                ) : (
                  "Send message"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Tip de contact direct */}
        <p className="mt-6 text-center text-sm text-gray-500">
          Prefer email?{" "}
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
