/**
 * VERSÃO PUBLICADA — usado somente quando mediaRelease.vidaNaLoft estiver totalmente liberado.
 * Lê as fotos de src/assets/images/escola/ (aula-coletiva.*, selfie-turma.*, atividade-lanche.*),
 * que devem ser copiadas para lá manualmente APÓS a autorização. Os originais permanecem intactos.
 */
import type { ImageMetadata } from 'astro';
import { buildPhotos, type VidaNaLoftData } from './tipos';

const files = import.meta.glob<{ default: ImageMetadata }>('../../assets/images/escola/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
});

export const vidaNaLoft: VidaNaLoftData = { mode: 'publicado', photos: buildPhotos(files) };
