/**
 * PRÉVIA LOCAL — usado somente por `npm run dev:previa-fotos` (servidor de desenvolvimento).
 * Lê as reconstruções diretamente da pasta pendente, sem copiá-las para o projeto.
 * Nunca é incluído em `npm run build` enquanto as fotos não forem liberadas.
 */
import type { ImageMetadata } from 'astro';
import { buildPhotos, type VidaNaLoftData } from './tipos';

const files = import.meta.glob<{ default: ImageMetadata }>(
  '../../../05_FOTOS_ESCOLA_PENDENTES_LIBERACAO/EDITADA-*.png',
  { eager: true },
);

export const vidaNaLoft: VidaNaLoftData = { mode: 'previa', photos: buildPhotos(files) };
