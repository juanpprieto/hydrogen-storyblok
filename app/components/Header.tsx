import {Link} from '@remix-run/react';
import {storyblokEditable} from '@storyblok/react';

export function Header({blok}) {
  return (
    <>
      <div {...storyblokEditable(blok)}>
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
