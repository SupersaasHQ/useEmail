import { useEmail } from "../src";

console.log(
  useEmail("resend").send({
    to: "test@test.com",
    from: "test@test.com",
    subject: "Test",
    text: "Test",
  }),
);
