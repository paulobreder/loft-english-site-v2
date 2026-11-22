/**
 * DEPOIMENTOS de alunos — fonte única da seção "Depoimentos" (src/components/home/Depoimentos.astro).
 *
 * Como adicionar um depoimento: copie um objeto da lista, troque os campos e salve.
 * A seção se adapta sozinha (1 item = sem setas; 2+ itens = setas e indicadores).
 *
 * REGRAS DE PUBLICAÇÃO
 * - status 'real': só aparece com `autorizado: true` (autorização de uso de nome, foto e fala;
 *   para menores, dos responsáveis).
 * - status 'demonstrativo': persona fictícia para apresentar a proposta à proprietária.
 *   Aparece SOMENTE nas prévias (dev e GitHub Pages com PUBLIC_NOINDEX=true), sempre com o
 *   rótulo "Depoimento demonstrativo". NUNCA é renderizada no site oficial (isProductionSite).
 * - Campos opcionais (textoEn, audio, video) só geram interface quando preenchidos.
 */
import type { ImageMetadata } from 'astro';
import sofia from '../../assets/images/depoimentos/sofia-demonstrativo.webp';
// Foto de turma que ocupa metade da seção (imagem de apoio enviada pelo responsável em 21/11/2026).
import fotoTurma from '../../assets/images/depoimentos/turma-conversa.webp';

export type StatusDepoimento = 'real' | 'demonstrativo';
export type Fase = 'Kids' | 'Teens' | 'Adults';

export interface Depoimento {
  id: string;
  status: StatusDepoimento;
  /** Obrigatório `true` para status 'real'. */
  autorizado: boolean;
  nome: string;
  /** Ex.: 15 → "15 anos". */
  idade?: number;
  /** Ex.: "Inglês avançado". */
  nivel?: string;
  fase?: Fase;
  /** Depoimento em português (obrigatório). */
  textoPt: string;
  /** Versão em inglês (opcional): habilita o botão "English". */
  textoEn?: string;
  /** Retrato do aluno (aparece pequeno, em círculo, junto do nome). */
  foto?: ImageMetadata;
  fotoAlt?: string;
  /** object-position do retrato. */
  fotoPos?: string;
  /** Foto de ambiente que ocupa metade da seção; se omitida, usa `fundoPadrao`. */
  fundo?: ImageMetadata;
  fundoAlt?: string;
  fundoPos?: string;
  /** Gravação em áudio (arquivo em /public). Só renderiza com `src`. */
  audio?: { src: string; tipo?: string; transcricao?: string };
  /** Depoimento em vídeo (arquivo em /public). Só renderiza com `src`. */
  video?: { src: string; tipo?: string; poster?: string; legendasVtt?: string };
}

export const depoimentos: Depoimento[] = [
  {
    id: 'sofia-demonstrativo',
    status: 'demonstrativo',
    autorizado: false,
    nome: 'Sofia',
    idade: 15,
    nivel: 'Inglês avançado',
    textoPt:
      'Eu tinha medo de errar ao falar inglês. Na Loft, aprendi que errar faz parte. Hoje assisto a séries sem legenda e converso com muito mais confiança.',
    textoEn:
      'I used to be afraid of making mistakes in English. At Loft, I learned that mistakes are part of learning. Now I watch shows without subtitles and speak with much more confidence.',
    foto: sofia,
    fotoAlt: 'Retrato de Sofia, de camiseta branca, sorrindo diante da parede vermelha da Loft English',
    fotoPos: '50% 28%',
  },
];

/** Foto de turma usada quando o depoimento não define `fundo`. */
export const fundoPadrao = {
  img: fotoTurma,
  alt: 'Professora e alunos conversam sentados em roda na sala de aula',
  pos: '55% 35%',
};
