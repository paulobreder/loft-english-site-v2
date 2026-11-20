// Gera favicon-32.png e apple-touch-icon.png a partir de public/favicon.svg (búfalo da logo C).
// Uso: node scripts/gerar-icones.mjs
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url), 'utf8');
const path = svg.match(/d="([^"]+)"/)[1];

const icon = (size, pad) => {
  const vb = 472 + pad * 2;
  const offY = (vb - 338) / 2;
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="${-pad} ${-offY} ${vb} ${vb}">` +
      `<rect x="${-pad}" y="${-offY}" width="${vb}" height="${vb}" fill="#ffffff"/>` +
      `<path fill="#C40018" fill-rule="evenodd" d="${path}"/></svg>`,
  );
};

await sharp(icon(32, 16)).png().toFile(new URL('../public/favicon-32.png', import.meta.url).pathname);
await sharp(icon(180, 70)).png().toFile(new URL('../public/apple-touch-icon.png', import.meta.url).pathname);
console.log('Ícones gerados.');
