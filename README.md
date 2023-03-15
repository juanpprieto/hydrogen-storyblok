# Hydrogen + Oxygen + Storyblok CMS

Integration Notes

- Added [public/editor.html](https://github.com/juanpprieto/hydrogen-storyblok/blob/main/public/editor.html)
- Created a storyblok [client](https://github.com/juanpprieto/hydrogen-storyblok/blob/0bc6c8af33b4d3e97fdac96d3c0f24d955aa0acd/server.ts#L55)
instance on `server.ts`
- Exposed the `storyblok` client to the server [context](https://github.com/juanpprieto/hydrogen-storyblok/blob/0bc6c8af33b4d3e97fdac96d3c0f24d955aa0acd/server.ts#L64)
- [Initiated](https://github.com/juanpprieto/hydrogen-storyblok/blob/0bc6c8af33b4d3e97fdac96d3c0f24d955aa0acd/app/root.tsx#L30)
the storyblok client at `./app/root.tsx`
- Created some storyblok blok components at `./app/bloks`
- Pulled and generated types for storyblok components folowing the instructions
from [package](https://github.com/dohomi/storyblok-generate-ts)
- Queried storyblok content in the root layout (header and menu) and routes
[products example](https://github.com/juanpprieto/hydrogen-storyblok/blob/0bc6c8af33b4d3e97fdac96d3c0f24d955aa0acd/app/routes/products/%24handle.tsx#L6)
- Added a `cert` script to generate ssl certificates required by storblok's admin
content previewer
- Added a `proxy` script to serve localhost via https which also required by storyblok's
admin content previewer

## /.env

Required env variables

```bash
SESSION_SECRET="foobar"
PUBLIC_STOREFRONT_API_TOKEN="...."
PUBLIC_STOREFRONT_API_VERSION="2023-01"
PUBLIC_STORE_DOMAIN="your-store.myshopify.com"
PUBLIC_STORYBLOK_CLIENT_ID="1234567"
PUBLIC_STORYBLOK_TOKEN="...."
```

Devlopment:

- run `npm run cert` (once) to generate ssl certificates. You might need to also
run `brew install mkcert` if not already installed
- run `npm run dev` in one terminal which exposes `http://localhost:3000` and then,
- run `npm run proxy` in another terminal which exposes the dev enviroment over ssl
at `https://localhost:3010`

Note: You'll need to configure storyblok Visual Editor url to point to the ssl localhost
at port 3010 and also provide the Oxygen deployed URL when editing content within
a live deployment.

---;

Hydrogen is Shopify’s stack for headless commerce. Hydrogen is designed to dovetail with [Remix](https://remix.run/), Shopify’s full stack web framework. This template contains a **minimal setup** of components, queries and tooling to get started with Hydrogen.

[Check out Hydrogen docs](https://shopify.dev/custom-storefronts/hydrogen)
[Get familiar with Remix](https://remix.run/docs/en/v1)

## What's included

- Remix
- Hydrogen
- Oxygen
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript and JavaScript flavors
- Minimal setup of components and routes

## Getting started

**Requirements:**

- Node.js version 16.14.0 or higher

```bash
npm create @shopify/hydrogen@latest --template hello-world
```

Remember to update `.env` with your shop's domain and Storefront API token!

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```
