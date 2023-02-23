import {storyblokEditable} from '@storyblok/react';

export function Feature({blok}) {
  return (
    <div {...storyblokEditable(blok)}>
      <h2>{blok.name}</h2>
    </div>
  );
}
