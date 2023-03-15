import {StoryblokComponent, type ISbStoryData} from '@storyblok/react';

export function Layout({stories}: {stories: ISbStoryData[]}) {
  return (
    <>
      {stories?.map((story) => (
        <StoryblokComponent key={story.id} blok={story.content} />
      ))}
    </>
  );
}
