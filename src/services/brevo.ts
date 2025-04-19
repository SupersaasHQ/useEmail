import { ofetch as $fetch } from "ofetch";
import type { EmailOptions } from "../types/email-options";
import type { EmailService } from "../types/email-service";

/**
 * Email service implementation for Mailgun
 */
export const BrevoService = (): EmailService => {
  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email" as const;

  const send = async (emailOptions: EmailOptions): Promise<void> => {
    if (!BREVO_API_KEY) {
      throw new Error("Brevo API key is missing");
    }

    const { to, from, subject, text, html } = emailOptions;
    if (!to || !from || (!text && !html)) {
      throw new Error("Required email fields are missing");
    }

    const payload = {
      sender: { email: from },
      to: Array.isArray(to) ? to.map((email) => ({ email })) : [{ email: to }],
      subject: subject,
      textContent: text,
      htmlContent: html,
    };

    try {
      await $fetch(BREVO_API_URL, {
        method: "POST",
        headers: {
          "api-key": BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      console.log("Email sent via Brevo");
    } catch (error) {
      console.error("Failed to send email with Brevo:", error);
      throw new Error("Email sending failed with Brevo");
    }
  };

  return { send };
};
