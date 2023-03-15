import {
  json,
  type LinksFunction,
  type LoaderArgs,
  type MetaFunction,
} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type {Shop} from '@shopify/hydrogen/storefront-api-types';
import styles from './styles/app.css';
import favicon from '../public/favicon.svg';
import {apiPlugin, storyblokInit} from '@storyblok/react';
import {components, Layout} from '~/components';
import {useStoryblokState} from '@storyblok/react';

const shouldUseBridge =
  typeof window !== 'undefined'
    ? window.location !== window.parent.location
    : false;

// Initiating the client is a little funky. I tried to do it at server.ts but it seems to
// not like being initiated in the server realm. This means I also had to hardcode the
// public access token because .env variables are not available outside exported remix
// functions
storyblokInit({
  accessToken: 'aGv10h9fQIdYKaF0JifCRgtt',
  apiOptions: {region: 'us'},
  use: [apiPlugin],
  components,
  bridge: shouldUseBridge,
});

export const links: LinksFunction = () => {
  return [
    {rel: 'stylesheet', href: styles},
    {
      rel: 'preconnect',
      href: 'https://cdn.shopify.com',
    },
    {
      rel: 'preconnect',
      href: 'https://shop.app',
    },
    {rel: 'icon', type: 'image/svg+xml', href: favicon},
  ];
};

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  viewport: 'width=device-width,initial-scale=1',
});

export async function loader({context}: LoaderArgs) {
  const layout = await context.storefront.query<{shop: Shop}>(LAYOUT_QUERY);
  const cms = await context.storyblok.get(`cdn/stories`, {
    version: 'draft',
    starts_with: 'global/',
  });

  const stories = cms?.data?.stories || null;
  return json({stories, layout});
}

export default function App() {
  let {stories} = useLoaderData<typeof loader>();
  stories = useStoryblokState(stories);
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body style={{padding: 0}}>
        <Layout stories={stories} />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const LAYOUT_QUERY = `#graphql
  query layout {
    shop {
      name
      description
    }
  }
`;
