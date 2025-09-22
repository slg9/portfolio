"use server";

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendMailjet(formData: FormData) {
  const name = (formData.get("name") ?? "") as string;
  const email = (formData.get("email") ?? "") as string;
  const subject = (formData.get("subject") ?? "") as string;
  const message = (formData.get("message") ?? "") as string;
  const phone = (formData.get("phone") ?? "") as string;
  const company = (formData.get("company") ?? "") as string;

  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }

  const html = `
    <div style="font-family:Inter,Arial,sans-serif;font-size:14px;color:#0f172a">
      <h2 style="margin:0 0 8px 0;">Nouveau message depuis le portfolio</h2>
      <p><strong>Nom:</strong> ${escapeHtml(name)}</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      ${phone ? `<p><strong>Téléphone:</strong> ${escapeHtml(phone)}</p>` : ""}
      ${company ? `<p><strong>Entreprise:</strong> ${escapeHtml(company)}</p>` : ""}
      ${subject ? `<p><strong>Sujet:</strong> ${escapeHtml(subject)}</p>` : ""}
      <hr style="border:none;border-top:1px solid #e2e8f0;margin:12px 0"/>
      <p style="white-space:pre-wrap">${escapeHtml(message)}</p>
    </div>
  `;

  const payload = {
    Messages: [
      {
        From: { Email: process.env.MAIL_FROM_EMAIL!, Name: process.env.MAIL_FROM_NAME || "Portfolio" },
        To:   [{ Email: process.env.MAIL_TO_EMAIL!, Name: process.env.MAIL_TO_NAME || "Recipient" }],
        ReplyTo: { Email: email, Name: name },
        Subject: subject || `Nouveau message de ${name}`,
        TextPart: `De: ${name} <${email}>\nTéléphone: ${phone || "-"}\nEntreprise: ${company || "-"}\n\n${message}`,
        HTMLPart: html,
        CustomID: "portfolio-contact",
      },
    ],
  };

  const auth = Buffer.from(
    `${process.env.MJ_APIKEY_PUBLIC}:${process.env.MJ_APIKEY_PRIVATE}`
  ).toString("base64");

  const res = await fetch("https://api.mailjet.com/v3.1/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${auth}`,
    },
    body: JSON.stringify(payload),
    // Important: rester en runtime Node (pas Edge)
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Mailjet error ${res.status}: ${text || res.statusText}`);
  }

  return { ok: true };
}
