/**
 * Seção "Vida na Loft" — dados compartilhados pelos três modos.
 * O módulo efetivamente usado é escolhido NA BUILD pelo alias `@vida-na-loft`
 * (ver astro.config.mjs):
 *   - oculto.ts    → padrão; nenhuma foto, seção não renderizada
 *   - previa.ts    → só em `npm run dev:previa-fotos`; lê 05_FOTOS_ESCOLA_PENDENTES_LIBERACAO/
 *   - publicado.ts → só quando mediaRelease.vidaNaLoft estiver 100% liberado; lê src/assets/images/escola/
 */
import type { ImageMetadata } from 'astro';

export type VidaNaLoftMode = 'oculto' | 'previa' | 'publicado';
export type PhotoId = 'aula-coletiva' | 'selfie-turma' | 'atividade-lanche';

export interface VidaPhoto {
  id: PhotoId;
  src: ImageMetadata;
  alt: string;
  /** Enquadramento por tamanho de tela — escolhido para não cortar rostos. */
  position: { mobile: string; desktop: string };
}

export interface VidaNaLoftData {
  mode: VidaNaLoftMode;
  photos: VidaPhoto[];
}

/** Ordem de exibição, textos e enquadramentos (independem do arquivo de origem). */
export const photoMeta: Record<PhotoId, Omit<VidaPhoto, 'id' | 'src'>> = {
  'aula-coletiva': {
    alt: 'Estudantes em aula ao redor de uma mesa branca, com uma adulta em pé junto ao quadro ao fundo da sala',
    position: { mobile: '50% 50%', desktop: '50% 50%' },
  },
  'selfie-turma': {
    alt: 'Jovem adulto faz uma selfie sorridente com estudantes reunidos ao redor da mesa de aula',
    position: { mobile: '50% 30%', desktop: '50% 30%' },
  },
  'atividade-lanche': {
    alt: 'Grupo de estudantes sorrindo ao redor de uma mesa com lanches, com um filme passando na TV ao fundo',
    position: { mobile: '50% 28%', desktop: '50% 30%' },
  },
};

export const photoOrder: PhotoId[] = ['aula-coletiva', 'selfie-turma', 'atividade-lanche'];

/** Monta a lista a partir de um resultado de import.meta.glob, casando pelo nome do arquivo. */
export function buildPhotos(files: Record<string, { default: ImageMetadata }>): VidaPhoto[] {
  const entries = Object.entries(files);
  return photoOrder.flatMap((id) => {
    const hit = entries.find(([path]) => path.toLowerCase().includes(id));
    return hit ? [{ id, src: hit[1].default, ...photoMeta[id] }] : [];
  });
}
