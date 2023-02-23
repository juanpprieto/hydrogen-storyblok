import {
  json,
  type LinksFunction,
  type LoaderArgs,
  type MetaFunction,
} from '@shopify/remix-oxygen';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import type {Shop} from '@shopify/hydrogen/storefront-api-types';
import styles from './styles/app.css';
import favicon from '../public/favicon.svg';
import {apiPlugin, storyblokInit} from '@storyblok/react';
import {components, Layout} from '~/components';
import {StoryblokComponent, useStoryblokState} from '@storyblok/react';

storyblokInit({
  accessToken: 'aGv10h9fQIdYKaF0JifCRgtt',
  apiOptions: {region: 'us'},
  use: [apiPlugin],
  components,
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
  // TODO: https://github.com/storyblok/storyblok-js-client
  let cms = await context.storyblok.get(`cdn/stories`, {
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
