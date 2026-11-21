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
  foto?: ImageMetadata;
  fotoAlt?: string;
  /** object-position da foto. */
  fotoPos?: string;
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
      'Antes, eu tinha medo de falar inglês e errar. Na Loft, aprendi que errar também faz parte do aprendizado. Hoje, consigo assistir a séries sem legenda, conversar em inglês e me sentir muito mais confiante. Aprender outro idioma me mostrou que o mundo é muito maior do que eu imaginava.',
    textoEn:
      'I used to be afraid of speaking English and making mistakes. At Loft, I learned that making mistakes is part of learning. Now, I can watch shows without subtitles, have conversations in English and feel much more confident. Learning another language has opened up a whole new world for me.',
    foto: sofia,
    fotoAlt: 'Retrato de Sofia, de camiseta branca, sorrindo diante da parede vermelha da Loft English',
    fotoPos: '50% 30%',
  },
];
