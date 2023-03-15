import {StoryblokComponent, storyblokEditable} from '@storyblok/react';
import {GridStoryblok} from '../../component-types-sb';

export function Grid({blok}: GridStoryblok) {
  return (
    <ul {...storyblokEditable(blok)}>
      {blok.columns.map((blok) => (
        <li key={blok._uid}>
          <StoryblokComponent blok={blok} />
        </li>
      ))}
    </ul>
  );
}
