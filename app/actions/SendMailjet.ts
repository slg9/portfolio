"use server";

import { Resend } from "resend";

function escapeHtml(str: string) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildHtml(name: string, email: string, phone: string, company: string, subject: string, message: string) {
  const row = (label: string, value: string, accent = "#6B7A99") => value ? `
    <tr>
      <td style="padding:6px 0;vertical-align:top;width:110px;">
        <span style="font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${accent};">${label}</span>
      </td>
      <td style="padding:6px 0;vertical-align:top;">
        <span style="font-size:14px;color:#F0F4FF;">${escapeHtml(value)}</span>
      </td>
    </tr>` : "";

  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Nouveau message — Portfolio</title>
</head>
<body style="margin:0;padding:0;background:#04040F;font-family:Inter,-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#04040F;padding:40px 16px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;">

        <!-- Top accent bar -->
        <tr>
          <td style="height:3px;background:linear-gradient(90deg,#0A84FF,#00D4FF,#00FFB3);border-radius:3px 3px 0 0;"></td>
        </tr>

        <!-- Header -->
        <tr>
          <td style="background:#080A1E;border-left:1px solid rgba(255,255,255,0.07);border-right:1px solid rgba(255,255,255,0.07);padding:28px 32px 20px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <span style="font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#00D4FF;">Portfolio</span>
                  <span style="font-size:11px;color:#3A4466;margin:0 8px;">·</span>
                  <span style="font-size:11px;color:#3A4466;letter-spacing:0.05em;">sebastienlegros.me</span>
                </td>
              </tr>
              <tr>
                <td style="padding-top:14px;">
                  <h1 style="margin:0;font-size:22px;font-weight:800;letter-spacing:-0.03em;color:#F0F4FF;line-height:1.2;">
                    Nouveau message
                  </h1>
                  <p style="margin:6px 0 0;font-size:13px;color:#6B7A99;">
                    Reçu depuis le formulaire de contact
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr>
          <td style="background:#080A1E;border-left:1px solid rgba(255,255,255,0.07);border-right:1px solid rgba(255,255,255,0.07);padding:0 32px;">
            <div style="height:1px;background:linear-gradient(90deg,#0A84FF,rgba(10,132,255,0.2),transparent);"></div>
          </td>
        </tr>

        <!-- Sender info -->
        <tr>
          <td style="background:#080A1E;border-left:1px solid rgba(255,255,255,0.07);border-right:1px solid rgba(255,255,255,0.07);padding:24px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              ${row("De", name, "#0A84FF")}
              ${row("Email", email, "#00D4FF")}
              ${row("Téléphone", phone)}
              ${row("Entreprise", company)}
              ${row("Sujet", subject)}
            </table>
          </td>
        </tr>

        <!-- Message -->
        <tr>
          <td style="background:#080A1E;border-left:1px solid rgba(255,255,255,0.07);border-right:1px solid rgba(255,255,255,0.07);padding:0 32px 28px;">
            <div style="background:#04040F;border:1px solid rgba(10,132,255,0.2);border-left:3px solid #0A84FF;border-radius:10px;padding:20px 22px;">
              <p style="margin:0 0 10px;font-size:11px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:#0A84FF;">Message</p>
              <p style="margin:0;font-size:14px;line-height:1.8;color:#C8D0E8;white-space:pre-wrap;">${escapeHtml(message)}</p>
            </div>
          </td>
        </tr>

        <!-- Reply CTA -->
        <tr>
          <td style="background:#080A1E;border-left:1px solid rgba(255,255,255,0.07);border-right:1px solid rgba(255,255,255,0.07);padding:0 32px 28px;">
            <a href="mailto:${escapeHtml(email)}"
               style="display:inline-block;background:linear-gradient(135deg,#0A84FF,#00D4FF);color:#fff;font-size:13px;font-weight:700;letter-spacing:0.06em;padding:11px 24px;border-radius:999px;text-decoration:none;">
              &#8594; Répondre à ${escapeHtml(name)}
            </a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#04080F;border:1px solid rgba(255,255,255,0.05);border-top:1px solid rgba(255,255,255,0.07);border-radius:0 0 12px 12px;padding:18px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <span style="font-size:12px;color:#3A4466;">Sébastien Legros</span>
                  <span style="font-size:12px;color:#1E2540;margin:0 6px;">·</span>
                  <span style="font-size:12px;color:#3A4466;">Développeur Full Stack</span>
                </td>
                <td align="right">
                  <span style="font-size:11px;color:#1E2540;">sebastienlegros.me</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>

</body>
</html>`;
}

export async function sendMailjet(formData: FormData) {
  const name    = (formData.get("name")    ?? "") as string;
  const email   = (formData.get("email")   ?? "") as string;
  const subject = (formData.get("subject") ?? "") as string;
  const message = (formData.get("message") ?? "") as string;
  const phone   = (formData.get("phone")   ?? "") as string;
  const company = (formData.get("company") ?? "") as string;

  if (!name || !email || !message) {
    throw new Error("Missing required fields");
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const textPart = [
    `De : ${name} <${email}>`,
    phone   ? `Téléphone : ${phone}`    : null,
    company ? `Entreprise : ${company}` : null,
    subject ? `Sujet : ${subject}`      : null,
    "",
    message,
  ].filter(Boolean).join("\n");

  const { error } = await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to:   [process.env.MAIL_TO_EMAIL!],
    replyTo: `${name} <${email}>`,
    subject: subject ? `[Portfolio] ${subject}` : `[Portfolio] Message de ${name}`,
    text: textPart,
    html: buildHtml(name, email, phone, company, subject, message),
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }

  return { ok: true };
}
