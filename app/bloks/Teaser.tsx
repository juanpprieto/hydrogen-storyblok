import {storyblokEditable} from '@storyblok/react';
import {TeaserStoryblok} from '../../component-types-sb';

export function Teaser({blok}: TeaserStoryblok) {
  return (
    <div {...storyblokEditable(blok)}>
      <h2>Teaser Section</h2>
      <h2>{blok.headline}</h2>
      <br />
      <p>{blok.description}</p>
    </div>
  );
}
