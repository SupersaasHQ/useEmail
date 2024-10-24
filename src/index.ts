import type { EmailProvider } from "./types/email-options";
import type { EmailService } from "./types/email-service";

/**
 * Factory function to get the email service based on the provider
 * @param provider - The email provider
 * @returns A Promise that resolves to the email service instance
 * @throws Error if the provider is not supported
 */
export async function useEmail(provider: EmailProvider): Promise<EmailService> {
  switch (provider) {
    case "resend": {
      const { ResendService } = await import("./services/resend");
      return new ResendService();
    }
    case "plunk": {
      const { PlunkService } = await import("./services/plunk");
      return new PlunkService();
    }
    case "sendgrid": {
      const { SendGridService } = await import("./services/sendgrid");
      return new SendGridService();
    }
    case "postmark": {
      const { PostmarkService } = await import("./services/postmark");
      return new PostmarkService();
    }
    default: {
      throw new Error(`Unsupported email provider: ${provider}`);
    }
  }
}
