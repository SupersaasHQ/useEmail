import { describe, expect, it } from "vitest";
import { useEmail } from "../src";
// import { PlunkService } from "../src/services/plunk";
// import { PostmarkService } from "../src/services/postmark";
import { ResendService } from "../src/services/resend";
// import { SendGridService } from "../src/services/sendgrid";

describe("useEmail", () => {
  it("should return the correct service for each provider", () => {
    // expect(useEmail("plunk")).toBeInstanceOf(PlunkService);
    // expect(useEmail("postmark")).toBeInstanceOf(PostmarkService);
    expect(useEmail("resend")).toBeInstanceOf(ResendService); // testing only this for now because I dont have access to the other services yet
    // expect(useEmail("sendgrid")).toBeInstanceOf(SendGridService);
  });

  it("should throw an error for unsupported provider", () => {
    // @ts-expect-error: Testing invalid provider
    expect(() => useEmail("unsupported")).toThrow(
      "Unsupported email provider: unsupported",
    );
  });
});
