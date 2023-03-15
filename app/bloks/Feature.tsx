import {storyblokEditable} from '@storyblok/react';
import {FeatureStoryblok} from '../../component-types-sb';

export function Feature({blok}: FeatureStoryblok) {
  return (
    <div {...storyblokEditable(blok)}>
      <h2>{blok.name}</h2>
      <p>{JSON.stringify(blok.description)}</p>
    </div>
  );
}
