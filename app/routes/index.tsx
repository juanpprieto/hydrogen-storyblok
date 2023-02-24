import {json, type LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {StoryblokComponent, useStoryblokState} from '@storyblok/react';

export async function loader({context}: LoaderArgs) {
  let slug = 'home';
  let cms = await context.storyblok.get(`cdn/stories/${slug}`, {
    version: 'draft',
  });

  const story = cms?.data?.story || null;
  return json({story});
}

export default function Homepage() {
  let {story} = useLoaderData<typeof loader>();
  story = useStoryblokState(story);
  return <StoryblokComponent blok={story?.content} />;
}
