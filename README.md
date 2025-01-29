# Supersaas/UseEmail

<!-- automd:badges color=yellow -->

[![npm version](https://img.shields.io/npm/v/use-email?color=yellow)](https://npmjs.com/package/use-email)
[![npm downloads](https://img.shields.io/npm/dm/use-email?color=yellow)](https://npmjs.com/package/use-email)

<!-- /automd -->

A unified TypeScript hook for sending emails across multiple providers with a single interface. This package simplifies email sending operations by providing a consistent API regardless of the underlying email service provider.

## Features

Unified interface for multiple email providers
TypeScript support for enhanced developer experience
Works with Node.js, Bun, Deno, and Cloudflare Workers
Easy to switch between providers without changing your code
Supports modern email providers

## Supported Providers

1. Resend
2. SendGrid
3. Postmark
4. Plunk
5. Mailgun

Installation
You can install the package using your preferred package manager:

## Before calling any provider

Update the .env file with the provider that you wil support:

```env
# Mailgun
MAILGUN_API_KEY=<TOKEN>
MAILGUN_DOMAIN=<DOMAIN>

#Plunk
PLUNK_API_TOKEN=<TOKEN>

#Postmark
POSTMARK_SERVER_TOKEN=<token>

#Resend
RESEND_API_TOKEN=<TOKEN>

#Sendgrid
SENDGRID_API_KEY=<TOKEN>
```


## Usage

```ts
import { useEmail } from "use-email";

const emailService = useEmail("resend"); // Choose your provider

await emailService.send({
  from: "sender@example.com",
  to: "recipient@example.com",
  subject: "Hello from use-email!",
  text: "This is a test email sent using use-email package.",
});
```

## Switching Providers

```ts
const resendService = useEmail("resend");
const sendgridService = useEmail("sendgrid");
const postmarkService = useEmail("postmark");
const plunkService = useEmail("plunk");
const mailgunService = useEmail("mailgun");
```

## Email Options

The send method accepts an EmailOptions object with the following properties:

```ts
type EmailOptions = {
  from: string;
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
};
```

## Error Handling

The package throws errors for common issues such as missing API keys or required email fields. Always wrap your email sending code in a try-catch block:

```ts
try {
  await emailService.send({
    from: "sender@example.com",
    to: "recipient@example.com",
    subject: "Test Email",
    text: "This is a test.",
  });
  console.log("Email sent successfully");
} catch (error) {
  console.error("Failed to send email:", error);
}
```

## TypeScript Support

This package is written in TypeScript and provides type definitions out of the box. You'll get full IntelliSense and type checking when using it in a TypeScript project.

## Installation

You can install the package using your preferred package manager:

<!-- automd:pm-install -->

```sh
# ✨ Auto-detect
npx nypm install use-email

# npm
npm install use-email

# yarn
yarn add use-email

# pnpm
pnpm install use-email

# bun
bun install use-email
```

<!-- /automd -->

Import:

<!-- automd:jsimport cjs cdn name="pkg" -->

**ESM** (Node.js, Bun)

```js
import {} from "pkg";
```

**CommonJS** (Legacy Node.js)

```js
const {} = require("pkg");
```

**CDN** (Deno, Bun and Browsers)

```js
import {} from "https://esm.sh/pkg";
```

<!-- /automd -->

## Development

<details>

<summary>local development</summary>

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

</details>

## License

Published under the [MIT](https://github.com/SupersaasHQ/useEmail/blob/main/LICENSE) license.
Made by [community](https://github.com/SupersaasHQ/useEmail/graphs/contributors) 💛
<br><br>
<a href="https://github.com/SupersaasHQ/useEmail/graphs/contributors">
<img src="https://contrib.rocks/image?repo=SupersaasHQ/useEmail" />
</a>
