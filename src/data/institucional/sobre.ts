/**
 * "Sobre nós" — conteúdo institucional.
 * Pilares: só fatos já confirmados (públicos, cidade, assinatura da marca).
 * História, missão e equipe ficam `null`/vazios até a escola confirmar (pendências I03 e I04);
 * quando preenchidos, aparecem automaticamente na seção "Sobre nós" da home.
 */
import type { ImageMetadata } from 'astro';
import type { IconName } from '../../components/icons';

export interface Pilar {
  icon: IconName;
  titulo: string;
  texto: string;
}

export interface MembroEquipe {
  nome: string;
  cargo: string;
  /** Foto real com autorização de uso de imagem. */
  foto?: ImageMetadata;
  alt?: string;
}

export const pilares: Pilar[] = [
  {
    icon: 'users',
    titulo: 'Para cada fase da vida',
    texto: 'Cursos organizados para crianças, adolescentes e adultos: Kids, Teens e Adults.',
  },
  {
    icon: 'home',
    titulo: 'Em São Gabriel da Palha',
    texto: 'Uma escola de inglês da cidade, com atendimento pelos canais oficiais da Loft English.',
  },
  {
    icon: 'messages-square',
    titulo: 'Inglês americano',
    texto: 'O inglês americano é a referência das aulas, como confirmou a escola.',
  },
  {
    icon: 'globe',
    titulo: 'Opening the world for you',
    texto: 'A assinatura da marca resume o convite da escola: usar o inglês para abrir caminhos.',
  },
];

/** Ex.: 'A Loft English começou em 20XX, quando…' — PENDENTE de confirmação (I03). */
export const historia: string | null = null;

/** Missão/propósito oficial da escola, se existir — PENDENTE (I03). Não usar o slogan como missão. */
export const missao: string | null = null;

/** Equipe com nomes, cargos e fotos autorizados — PENDENTE (I04). Vazio = bloco oculto. */
export const equipe: MembroEquipe[] = [];
