import {Link} from '@remix-run/react';
import {storyblokEditable} from '@storyblok/react';

export function Header({blok}) {
  console.log('[app/components/Header.tsx:3] blok: ', {blok});

  return (
    <>
      <div {...storyblokEditable(blok)}>
        <h2>{blok.name}</h2>
        <nav>
          <ul>
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
      </div>
    </>
  );
}
