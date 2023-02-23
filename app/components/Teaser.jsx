import {storyblokEditable} from '@storyblok/react';

export function Teaser({blok}) {
  return (
    <div {...storyblokEditable(blok)}>
      <h2>{blok.headline}</h2>
    </div>
  );
}
