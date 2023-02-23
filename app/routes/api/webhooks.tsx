import {json, LoaderArgs, redirect} from '@shopify/remix-oxygen';

export async function loader({context, params}: LoaderArgs) {
  return redirect('/');
}

export async function action({context, params, request}: LoaderArgs) {
  const env = context.env;
  const headers = request.headers;
  const topic = headers.get('x-shopify-topic');
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

  console.log('computedHmac', computedHmac);
  console.log('hmac', hmac);

  if (computedHmac !== hmac) {
    return false;
  }
  return true;
}
