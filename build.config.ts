import { defineBuildConfig } from "unbuild";

export default defineBuildConfig({
  entries: [
    "src/index",
    "src/services/mailgun",
    "src/services/plunk",
    "src/services/postmark",
    "src/services/resend",
    "src/services/sendgrid",
  ],
  clean: false,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
});
