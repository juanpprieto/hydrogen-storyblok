import {StoryblokStory} from 'storyblok-generate-ts'

export interface FeatureStoryblok {
  name?: string;
  _uid: string;
  component: "feature";
  [k: string]: any;
}

export interface GridStoryblok {
  columns?: any[];
  _uid: string;
  component: "grid";
  [k: string]: any;
}

export interface HeaderStoryblok {
  menu: MenuItemStoryblok[];
  _uid: string;
  component: "header";
  [k: string]: any;
}

export interface MainStoryblok {
  _uid: string;
  component: "main";
  [k: string]: any;
}

export type MultilinkStoryblok =
  | {
      cached_url?: string;
      linktype?: string;
      [k: string]: any;
    }
  | {
      id?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "story";
      story?: {
        name: string;
        created_at?: string;
        published_at?: string;
        id: number;
        uuid: string;
        content?: {
          [k: string]: any;
        };
        slug: string;
        full_slug: string;
        sort_by_date?: null | string;
        position?: number;
        tag_list?: string[];
        is_startpage?: boolean;
        parent_id?: null | number;
        meta_data?: null | {
          [k: string]: any;
        };
        group_id?: string;
        first_published_at?: string;
        release_id?: null | number;
        lang?: string;
        path?: null | string;
        alternates?: any[];
        default_full_slug?: null | string;
        translated_slugs?: null | any[];
        [k: string]: any;
      };
      [k: string]: any;
    }
  | {
      url?: string;
      cached_url?: string;
      anchor?: string;
      linktype?: "asset" | "url";
      [k: string]: any;
    }
  | {
      email?: string;
      linktype?: "email";
      [k: string]: any;
    };

export interface AssetStoryblok {
  alt?: string;
  copyright?: string;
  id: number;
  filename: string;
  name: string;
  title?: string;
  focus?: string;
  [k: string]: any;
}

export interface MenuItemStoryblok {
  Text: string;
  link: MultilinkStoryblok;
  image?: AssetStoryblok;
  subMenuItem?: MenuItemStoryblok[];
  _uid: string;
  component: "menuItem";
  [k: string]: any;
}

export interface PageStoryblok {
  body?: any[];
  Title?: string;
  Description?: string;
  _uid: string;
  component: "page";
  uuid?: string;
  [k: string]: any;
}

export interface ProductStoryblok {
  image?: AssetStoryblok;
  body?: any[];
  shopifyId?: string;
  Title?: string;
  Description?: string;
  _uid: string;
  component: "product";
  [k: string]: any;
}

export interface TeaserStoryblok {
  headline?: string;
  description?: string;
  link?: MultilinkStoryblok;
  blocks?: any[];
  _uid: string;
  component: "teaser";
  [k: string]: any;
}
