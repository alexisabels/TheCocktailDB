import { useEffect } from 'react';

const SITE_NAME = 'The Cocktail Compendium';
const DEFAULT_DESCRIPTION = 'Discover hundreds of classic and modern cocktail recipes. Browse drinks by name, letter or ingredient.';

function setMeta(name, content, attr = 'name') {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href) {
  if (!href) return;
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export default function usePageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  image,
  path,
  type = 'website',
} = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
    document.title = fullTitle;

    setMeta('description', description);
    setMeta('og:title', fullTitle, 'property');
    setMeta('og:description', description, 'property');
    setMeta('og:type', type, 'property');
    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', description);

    if (image) {
      setMeta('og:image', image, 'property');
      setMeta('twitter:image', image);
    }

    if (typeof window !== 'undefined') {
      const url = path
        ? `${window.location.origin}${path}`
        : window.location.href;
      setMeta('og:url', url, 'property');
      setCanonical(url);
    }
  }, [title, description, image, path, type]);
}
