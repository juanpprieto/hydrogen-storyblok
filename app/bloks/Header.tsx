import {Link, useRouteLoaderData} from '@remix-run/react';
import {type SbBlokData, storyblokEditable} from '@storyblok/react';

export function Header({blok}: {blok: SbBlokData}) {
  const {layout} = useRouteLoaderData('root');
  return (
    <header
      {...storyblokEditable(blok)}
      style={{display: 'flex', borderBottom: '1px solid black'}}
    >
      <h1>{layout.shop.name}</h1>
      <nav
        style={{
          display: 'flex',
        }}
      >
        <ul
          style={{
            display: 'flex',
            gridGap: '1rem',
            listStyleType: 'none',
            alignItems: 'center',
          }}
        >
          {blok.menu.map((item) => {
            const url =
              item.link.cached_url === 'home' ? '/' : item.link.cached_url;
            return (
              <Link key={item._uid} to={url}>
                {item.Text}
              </Link>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
