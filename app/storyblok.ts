import {apiPlugin, storyblokInit} from '@storyblok/react';
import {Feature, Grid, Page, Teaser} from '~/components';

const components = {
  feature: Feature,
  grid: Grid,
  teaser: Teaser,
  page: Page,
};

storyblokInit({
  accessToken: 'aGv10h9fQIdYKaF0JifCRgtt',
  apiOptions: {region: 'us'},
  use: [apiPlugin],
  components,
});

console.log('hello world');
