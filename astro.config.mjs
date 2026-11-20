// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { fileURLToPath } from 'node:url';
import { flags, isVidaNaLoftReleased } from './src/config/site.ts';

/**
 * Trava de fotografias da seção "Vida na Loft".
 * - publicado: somente se os 3 itens de mediaRelease.vidaNaLoft forem true.
 * - previa: somente no servidor de desenvolvimento com LOFT_PREVIA_FOTOS=1 (npm run dev:previa-fotos).
 * - oculto: todo o resto — inclusive QUALQUER `astro build` sem liberação. Nesse modo a pasta
 *   05_FOTOS_ESCOLA_PENDENTES_LIBERACAO/ nunca é lida nem copiada para dist/.
 */
function vidaNaLoftGate() {
  const VIRTUAL = 'virtual:vida-na-loft';
  return {
    name: 'loft-vida-na-loft',
    hooks: {
      'astro:config:setup': ({ command, updateConfig, logger }) => {
        const mode = isVidaNaLoftReleased
          ? 'publicado'
          : command === 'dev' && process.env.LOFT_PREVIA_FOTOS === '1'
            ? 'previa'
            : 'oculto';
        const file = fileURLToPath(new URL(`./src/data/vida-na-loft/${mode}.ts`, import.meta.url));
        logger.info(`Vida na Loft: modo "${mode}"`);
        updateConfig({
          vite: {
            plugins: [{ name: 'loft-vida-na-loft-resolve', resolveId: (id) => (id === VIRTUAL ? file : null) }],
          },
        });
      },
    },
  };
}

/**
 * SITE_URL: domínio definitivo (ex.: https://www.dominio-da-escola.com.br).
 * Sem SITE_URL, a build é tratada como PRÉVIA: noindex + robots bloqueando rastreadores.
 */
const SITE_URL = process.env.SITE_URL;
/** Caminho base (ex.: "/loft-english-site" no GitHub Pages). Padrão: raiz. */
const BASE_PATH = process.env.BASE_PATH ?? '/';

export default defineConfig({
  site: SITE_URL ?? 'http://localhost:4321',
  base: BASE_PATH,
  trailingSlash: 'always',
  build: { format: 'directory' },
  integrations: [
    vidaNaLoftGate(),
    sitemap({
      // A política de privacidade só entra no sitemap depois de revisada (ver src/config/site.ts).
      filter: (page) => flags.privacyReviewed || !page.includes('/privacidade/'),
    }),
  ],
  image: { responsiveStyles: false },
  devToolbar: { enabled: false },
});
