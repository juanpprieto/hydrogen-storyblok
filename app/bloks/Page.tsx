import {StoryblokComponent, storyblokEditable} from '@storyblok/react';
import {PageStoryblok} from '../../component-types-sb';

export function Page({blok}: PageStoryblok) {
  return (
    <main {...storyblokEditable(blok)}>
      {blok.body.map((nestedBlok) => (
        <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
      ))}
    </main>
  );
}
