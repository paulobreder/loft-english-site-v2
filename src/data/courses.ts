/**
 * Públicos divulgados pela Loft English (bio do Instagram, F01 — CONFIRMADO como categorias).
 *
 * Campos operacionais (`details`) são `null` até a confirmação da proprietária;
 * quando preenchidos, aparecem automaticamente na página /cursos/.
 *
 * `image`: fotos dos cursos (src/assets/images/cursos/). Imagens publicitárias geradas e
 * aprovadas pelo cliente em 16/11/2026 — ilustrativas, não alunos reais (o alt informa).
 * Para voltar à versão tipográfica, troque `image` por `null`.
 * Para trocar por fotos reais da escola: substitua os arquivos e revise alt/position.
 * Fotos reais com menores exigem autorização dos responsáveis legais.
 */
import type { ImageMetadata } from 'astro';
import type { IconName } from '../components/icons';
import kidsPhoto from '../assets/images/cursos/kids.jpg';
import teensPhoto from '../assets/images/cursos/teens.webp';
import adultsPhoto from '../assets/images/cursos/adults.jpg';

export interface CourseImage {
  src: ImageMetadata;
  alt: string;
  /**
   * Enquadramento (object-position) por slot, para não cortar rostos:
   * card = card da home (1:1) · mobile = bloco da página /cursos/ no celular/tablet (5:4)
   * · desktop = bloco da página /cursos/ no desktop (4:5).
   */
  position?: { card?: string; mobile?: string; desktop?: string };
}

export interface CourseDetails {
  /** Faixa etária, ex.: "6 a 10 anos". PENDENTE. */
  ages: string | null;
  /** Modalidades confirmadas para o público, ex.: "Presencial". PENDENTE. */
  format: string | null;
  /** Frequência/duração, ex.: "2 aulas por semana". PENDENTE. */
  schedule: string | null;
}

export interface Course {
  id: 'kids' | 'teens' | 'adults';
  name: string;
  audience: string;
  headline: string;
  summary: string;
  description: string;
  icon: IconName;
  image: CourseImage | null;
  details: CourseDetails;
}

export const courses: Course[] = [
  {
    id: 'kids',
    name: 'Kids',
    audience: 'Inglês para crianças',
    headline: 'O primeiro contato com o inglês.',
    summary: 'Para crianças começarem a conviver com o idioma.',
    description:
      'O segmento Kids é dedicado ao público infantil. Converse com a equipe para saber a partir de que idade a criança pode começar e quais turmas estão disponíveis.',
    icon: 'shapes',
    image: {
      src: kidsPhoto,
      alt: 'Criança sorridente de cabelo cacheado e camisa polo vermelha em sala de aula (imagem ilustrativa)',
      position: { card: '50% 58%', mobile: '50% 48%', desktop: '50% 70%' },
    },
    details: { ages: null, format: null, schedule: null },
  },
  {
    id: 'teens',
    name: 'Teens',
    audience: 'Inglês para adolescentes',
    headline: 'O inglês acompanhando cada etapa.',
    summary: 'Para adolescentes desenvolverem o inglês nesta fase da vida.',
    description:
      'O segmento Teens é dedicado a adolescentes. Converse com a equipe para conhecer as turmas disponíveis e como as aulas são organizadas.',
    icon: 'backpack',
    image: {
      src: teensPhoto,
      alt: 'Jovem estudante sorridente de blusa azul-marinho e mochila, segurando uma apostila da Loft English e um celular (imagem ilustrativa)',
      position: { card: '50% 45%', mobile: '50% 35%', desktop: '50% 50%' },
    },
    details: { ages: null, format: null, schedule: null },
  },
  {
    id: 'adults',
    name: 'Adults',
    audience: 'Inglês para adultos',
    headline: 'Inglês para usar na vida real.',
    summary: 'Para adultos que querem falar inglês com mais confiança.',
    description:
      'O segmento Adults é dedicado ao público adulto. Consulte a equipe sobre turmas, modalidades e condições para o seu momento.',
    icon: 'messages-square',
    image: {
      src: adultsPhoto,
      alt: 'Homem adulto estudando inglês à mesa, com caneca da Loft English e a bandeira do Reino Unido ao fundo (imagem ilustrativa)',
      position: { card: '50% 30%', mobile: '50% 25%', desktop: '50% 35%' },
    },
    details: { ages: null, format: null, schedule: null },
  },
];

/** O que o interessado pode consultar diretamente com a escola (sem afirmar valores). */
export const askTheTeam = [
  'Idades e turmas disponíveis',
  'Modalidade: presencial ou online',
  'Dias, horários e duração das aulas',
  'Valores e condições de matrícula',
] as const;
