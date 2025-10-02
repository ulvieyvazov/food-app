import { useEffect } from 'react';

function upsertMeta(name, content) {
  if (!name) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  if (content != null) el.setAttribute('content', content);
}

function upsertOg(property, content) {
  if (!property) return;
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('property', property);
    document.head.appendChild(el);
  }
  if (content != null) el.setAttribute('content', content);
}

function setCanonical(href) {
  if (!href) return;
  let link = document.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function injectJsonLd(id, json) {
  const scriptId = `seo-jsonld-${id}`;
  let el = document.getElementById(scriptId);
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = scriptId;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(json);
}

export default function SEO({ title, description, canonical, ogImage, jsonLdId, jsonLd }) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMeta('description', description);
    if (canonical) setCanonical(canonical);
    if (title) upsertOg('og:title', title);
    if (description) upsertOg('og:description', description);
    if (canonical) upsertOg('og:url', canonical);
    if (ogImage) upsertOg('og:image', ogImage);
    if (jsonLd && jsonLdId) injectJsonLd(jsonLdId, jsonLd);
  }, [title, description, canonical, ogImage, jsonLdId, jsonLd]);

  return null;
}


