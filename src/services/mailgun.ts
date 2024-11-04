import { ofetch as $fetch } from "ofetch";
import type { EmailOptions } from "../types/email-options";
import type { EmailService } from "../types/email-service";

/**
 * Email service implementation for Mailgun
 */
export const MailgunService = (): EmailService => {
  const MAILGUN_API_KEY = process.env.MAILGUN_API_KEY;
  const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN;
  const MAILGUN_API_URL = `https://api.mailgun.net/v3/${MAILGUN_DOMAIN}/messages`;

  const send = async (emailOptions: EmailOptions): Promise<void> => {
    if (!MAILGUN_API_KEY || !MAILGUN_DOMAIN) {
      throw new Error("Mailgun API key or domain is missing");
    }

    const { to, from, subject, text, html } = emailOptions;
    if (!to || !from || (!text && !html)) {
      throw new Error("Required email fields are missing");
    }

    const formData = new FormData();
    formData.append("from", from);
    formData.append("to", Array.isArray(to) ? to.join(",") : to);
    formData.append("subject", subject);
    if (text) formData.append("text", text);
    if (html) formData.append("html", html);

    try {
      
      const encodedCredentials = Buffer.from(`api:${MAILGUN_API_KEY}`).toString("base64");

      await $fetch(MAILGUN_API_URL, {
        method: "POST",
        headers: {
          Authorization: `Basic ${encodedCredentials}`,
        },
        body: formData,
      });
      console.log("Email sent via Mailgun");
    } catch (error) {
      console.error("Failed to send email with Mailgun:", error);
      throw new Error("Email sending failed with Mailgun");
    }
  };

  return { send };
};
