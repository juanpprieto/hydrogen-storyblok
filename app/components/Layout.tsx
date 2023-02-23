import {StoryblokComponent} from '@storyblok/react';

export function Layout({stories}: {stories: any}) {
  return (
    <>
      {stories?.map((story) => (
        <StoryblokComponent key={story.id} blok={story.content} />
      ))}
    </>
  );
}
