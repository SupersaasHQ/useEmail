import { describe, expect, it, vi } from "vitest";
import { ResendService } from "../src/services/resend";

describe("ResendService", () => {
  it("should send an email", async () => {
    const mockApiToken = "test_api_token";
    const resendService = new ResendService(mockApiToken);

    vi.mock("ofetch", () => ({
      ofetch: vi.fn().mockResolvedValue({ id: "mock_email_id" }),
    }));

    const response = await resendService.send({
      from: "fayaz@test.com",
      to: "fayaz@test.com",
      subject: "Test",
      text: "Test",
    });

    expect(response).toBeDefined();
  });
});
