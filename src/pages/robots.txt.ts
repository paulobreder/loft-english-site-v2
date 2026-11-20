import type { APIRoute } from 'astro';
import { isProductionSite } from '../config/site';

/** Prévia (sem SITE_URL): bloqueia rastreadores. Produção: libera e aponta o sitemap. */
export const GET: APIRoute = ({ site }) => {
  const body = isProductionSite
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL(`${import.meta.env.BASE_URL.replace(/\/$/, '')}/sitemap-index.xml`, site).href}\n`
    : `# Prévia — não indexar até a publicação oficial.\nUser-agent: *\nDisallow: /\n`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
