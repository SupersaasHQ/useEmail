import { ofetch as $fetch } from "ofetch";
import type { EmailOptions } from "../types/email-options";
import type { EmailService } from "../types/email-service";

/**
 * Email service implementation for Zepto Mail
 */
export class ZeptoMailService implements EmailService {
  private apiKey: string;
  private apiUrl: string;

  constructor(apiKey?: string, apiUrl = "https://api.zeptomail.in/v1.1/email") {
    this.apiKey = apiKey || process.env.ZEPTOMAIL_API_KEY || "";
    this.apiUrl = apiUrl;
  }

  async send(emailOptions: EmailOptions): Promise<void> {
    if (!this.apiKey) {
      throw new Error("Zepto Mail API key is missing");
    }

    const { to, from, subject, text, html } = emailOptions;
    if (!to || !from || (!text && !html)) {
      throw new Error("Required email fields are missing");
    }

    const toRecipients = Array.isArray(to)
      ? to.map((email) => ({
          email_address: {
            address: email,
            name: email.split("@")[0], // Using part before @ as name if not provided
          },
        }))
      : [
          {
            email_address: {
              address: to,
              name: to.split("@")[0],
            },
          },
        ];

    const payload = {
      from: {
        address: from,
      },
      to: toRecipients,
      subject,
      htmlbody: html || text, // If html is not provided, use text content
    };

    try {
      const response = await $fetch(this.apiUrl, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Zoho-enczapikey ${this.apiKey}`,
        },
        body: JSON.stringify(payload),
      });
      return response;
    } catch (error) {
      console.error("Failed to send email with Zepto Mail:", error);
      throw new Error("Email sending failed with Zepto Mail");
    }
  }
}
