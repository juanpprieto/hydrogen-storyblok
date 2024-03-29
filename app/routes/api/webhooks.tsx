import {json, LoaderArgs, redirect} from '@shopify/remix-oxygen';

export async function loader() {
  return redirect('/');
}

// Experiment not in use.
// This api enpoint aims to receive product/collection webhooks from Shopify and then
// process them in order to create/update/delete product and collection page entries
// in Storyblok via the managment API. This is a work in progress.
// Sadly, there is currently a limitation with Shopify's webhooks adming that prevents
// us from using a Hydrogen API route url as a target for a webhook notification.
export async function action({context, request}: LoaderArgs) {
  const env = context.env;
  const headers = request.headers;
  const shop = headers.get('x-shopify-shop-domain');

  if (env.PUBLIC_STORE_DOMAIN !== shop) {
    return json({error: 'Invalid shop'}, {status: 403});
  }

  const valid = await verifySignature(
    request,
    env.PRIVATE_SHOPIFY_WEBHOOK_SECRET,
  );
  if (!valid) {
    return new Response('Unauthorized', {status: 401});
  }

  const body = await request.text();
  return json(body ? JSON.parse(body) : {});
}

async function verifySignature(request: Request, secret: string) {
  const hmac = request.headers.get('x-shopify-hmac-sha256');
  const data = await request.clone().arrayBuffer();
  const computedHmac = await crypto.subtle
    .importKey(
      'raw',
      new TextEncoder().encode(secret),
      {name: 'HMAC', hash: {name: 'SHA-256'}},
      true,
      ['sign'],
    )
    .then((key) =>
      crypto.subtle.sign({name: 'HMAC', hash: {name: 'SHA-256'}}, key, data),
    )
    .then((signature) => new Uint8Array(signature))
    .then((bytes) => btoa(String.fromCharCode(...bytes)));

  if (computedHmac !== hmac) {
    return false;
  }
  return true;
}
