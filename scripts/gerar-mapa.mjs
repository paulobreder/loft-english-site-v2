// Gera a imagem estática do mapa da página Contato a partir de tiles do OpenStreetMap.
// Uso: node scripts/gerar-mapa.mjs [lat] [lon] [zoom]
//
// Dados do mapa © colaboradores do OpenStreetMap (ODbL) — a atribuição é exibida
// junto ao mapa no site. Os tiles são baixados uma única vez, na geração;
// o site publicado não faz nenhuma requisição ao OpenStreetMap nem ao Google.
//
// Centro padrão: área urbana de São Gabriel da Palha – ES (Nominatim, "town").
// Quando o endereço da escola for confirmado, gere novamente com as coordenadas dele.
import sharp from 'sharp';

const lat = Number(process.argv[2] ?? -19.0148349);
const lon = Number(process.argv[3] ?? -40.539464);
const z = Number(process.argv[4] ?? 15);
const W = 900;
const H = 560;
const TILE = 256;
const UA = 'static-site-map-builder/1.0 (one-time static render)';

const n = 2 ** z;
const px = ((lon + 180) / 360) * n * TILE;
const latRad = (lat * Math.PI) / 180;
const py = ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n * TILE;

const left = Math.round(px - W / 2);
const top = Math.round(py - H / 2);
const tx0 = Math.floor(left / TILE);
const ty0 = Math.floor(top / TILE);
const tx1 = Math.floor((left + W - 1) / TILE);
const ty1 = Math.floor((top + H - 1) / TILE);

const composites = [];
for (let tx = tx0; tx <= tx1; tx++) {
  for (let ty = ty0; ty <= ty1; ty++) {
    const url = `https://tile.openstreetmap.org/${z}/${tx}/${ty}.png`;
    const res = await fetch(url, { headers: { 'User-Agent': UA } });
    if (!res.ok) throw new Error(`Falha ao baixar ${url}: ${res.status}`);
    composites.push({ input: Buffer.from(await res.arrayBuffer()), left: (tx - tx0) * TILE, top: (ty - ty0) * TILE });
    await new Promise((r) => setTimeout(r, 150)); // respeita a política de uso dos tiles
  }
}

const mosaic = await sharp({
  create: { width: (tx1 - tx0 + 1) * TILE, height: (ty1 - ty0 + 1) * TILE, channels: 3, background: '#ffffff' },
})
  .composite(composites)
  .png()
  .toBuffer();

const out = new URL('../src/assets/images/mapa-sao-gabriel-da-palha-azul.png', import.meta.url).pathname;

// Estilo "mapa azul" (duotone): tons de cinza mapeados de azul-escuro → azul-gelo,
// coerente com a paleta da marca. O destaque vermelho da cidade é feito em CSS, por cima.
const DARK = [16, 52, 112]; // #103470 — textos e linhas
const LIGHT = [234, 241, 252]; // #EAF1FC — fundo
const { data, info } = await sharp(mosaic)
  .extract({ left: left - tx0 * TILE, top: top - ty0 * TILE, width: W, height: H })
  .grayscale()
  .linear(1.12, -14) // um pouco mais de contraste antes da coloração
  .raw()
  .toBuffer({ resolveWithObject: true });

const rgb = Buffer.alloc(info.width * info.height * 3);
for (let i = 0; i < info.width * info.height; i++) {
  const g = data[i * info.channels] / 255;
  for (let c = 0; c < 3; c++) rgb[i * 3 + c] = Math.round(DARK[c] + (LIGHT[c] - DARK[c]) * g);
}
await sharp(rgb, { raw: { width: info.width, height: info.height, channels: 3 } }).png().toFile(out);

console.log(`Mapa gerado: ${out} (${W}x${H}, z${z}, ${composites.length} tiles, centro ${lat}, ${lon})`);
