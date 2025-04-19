import type { EmailOptions } from "../types/email-options";
import type { EmailService } from "../types/email-service";
import { consola } from "consola";
import { colors } from "consola/utils";

/**
 * Email service implementation for Mocking
 */
export const MockService = (): EmailService => {
  const send = async (emailOptions: EmailOptions): Promise<void> => {
    const { to, from, subject, text, html } = emailOptions;
    if (!to || !from || (!text && !html)) {
      throw new Error("Required email fields are missing");
    }

    const redactedHtml = html ? colors.blue("[html]") : colors.red("-");

    const payload: string = `to: ${to}\nfrom: ${from}\nsubject: ${subject}\ntext: ${text}\nhtml: ${redactedHtml}`;

    consola.box({
      title: "Email sent",
      message: payload,
    });
  };

  return { send };
};
