import { ofetch as $fetch } from "ofetch";
import type { EmailOptions } from "../types/email-options";
import type { EmailService } from "../types/email-service";

/**
 * Email service implementation for SendGrid
 */
export class SendGridService implements EmailService {
  private apiKey: string;
  private apiUrl: string;

  constructor(
    apiKey?: string,
    apiUrl = "https://api.sendgrid.com/v3/mail/send",
  ) {
    this.apiKey = apiKey || process.env.SENDGRID_API_KEY || "";
    this.apiUrl = apiUrl;
  }

  async send(emailOptions: EmailOptions): Promise<void> {
    if (!this.apiKey) {
      throw new Error("SendGrid API key is missing");
    }

    const { to, from, subject, text, html } = emailOptions;
    if (!to || !from || (!text && !html)) {
      throw new Error("Required email fields are missing");
    }

    const payload = {
      personalizations: [
        {
          to: Array.isArray(to)
            ? to.map((email) => ({ email }))
            : [{ email: to }],
          subject,
        },
      ],
      from: {
        email: from,
      },
      content: [
        {
          type: text ? "text/plain" : "text/html",
          value: text || html,
        },
      ],
    };

    try {
      const response = await $fetch(this.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify(payload),
      });
      return response;
    } catch (error) {
      console.error("Failed to send email with SendGrid:", error);
      throw new Error("Email sending failed with SendGrid");
    }
  }
}
