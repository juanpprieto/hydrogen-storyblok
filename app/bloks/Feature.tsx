import {storyblokEditable} from '@storyblok/react';
import {FeatureStoryblok} from '../../component-types-sb';

export function Feature({blok}: FeatureStoryblok) {
  return (
    <div {...storyblokEditable(blok)}>
      <h2>Feature Section</h2>
      <p>Name: {blok.name}</p>
      {/* <pre>{JSON.stringify(blok, null, 2)}</pre> */}
    </div>
  );
}
