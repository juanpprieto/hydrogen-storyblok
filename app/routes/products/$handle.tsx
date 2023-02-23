import {json, type LoaderArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {StoryblokComponent, useStoryblokState} from '@storyblok/react';

export async function loader({context, params}: LoaderArgs) {
  let cms = await context.storyblok.get(
    `cdn/stories/products/${params.handle}`,
    {
      version: 'draft',
    },
  );

  const story = cms?.data?.story || null;
  return json({story, handle: params.handle});
}

export default function ProductTemplate() {
  let {story, handle} = useLoaderData<typeof loader>();
  story = useStoryblokState(story);
  return (
    <>
      <h1>Product: {handle}</h1>
      <StoryblokComponent blok={story?.content} />
    </>
  );
}
