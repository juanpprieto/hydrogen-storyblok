import {StoryblokComponent, storyblokEditable} from '@storyblok/react';

export function Grid({blok}) {
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
