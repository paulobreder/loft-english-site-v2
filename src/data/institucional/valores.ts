/**
 * Carrossel "O que faz a Loft ser a Loft" (inspirado no bloco de valores da Overlake).
 * Valores aprovados pelo responsável do projeto em 20/11/2026 para a prévia v2;
 * a proprietária deve confirmar que se reconhece neles antes da versão oficial.
 *
 * IMAGENS em src/assets/images/valores/ (enviadas pelo responsável em 20/11/2026).
 * Sem o rótulo "imagem ilustrativa" (pedido do responsável, 20/11/2026). Foto real autorizada pode substituí-la trocando só o import.
 */
import type { ImageMetadata } from 'astro';
// 1, 2 e 4: imagens geradas. 3: foto real da Loft (Instagram), com alunos menores — autorização
// confirmada em 20/11/2026 (ver 06_CONTEUDOS_PLANEJADOS/MANIFESTO-DE-ASSETS.md).
import confianca from '../../assets/images/valores/confianca.webp';
import curiosidade from '../../assets/images/valores/curiosidade.webp';
import acolhimento from '../../assets/images/valores/acolhimento-foto-loft.webp';
import alegria from '../../assets/images/valores/alegria.jpg'; // ampliada 2x com realce local (Core Image), 21/11/2026

export interface Valor {
  id: string;
  titulo: string;
  /** Palavra em inglês exibida como apoio. */
  ingles: string;
  texto: string;
  img: ImageMetadata;
  alt: string;
  /** object-position da imagem. */
  pos?: string;
}

export const valoresIntro = {
  rotulo: 'O que faz a Loft ser a Loft:',
  frase:
    'Na Loft English, o inglês sai do livro e ganha vida: em cada pergunta, conversa e conquista, nossos alunos ganham confiança para abrir o mundo.',
};

export const valores: Valor[] = [
  {
    id: 'confianca',
    titulo: 'Confiança',
    ingles: 'Confidence',
    texto: 'Aqui o erro faz parte do caminho. Cada aula é um espaço seguro para arriscar, praticar e ganhar coragem de falar.',
    img: confianca,
    alt: 'Aluno de camiseta vermelha fala sorrindo para a turma, com a professora ao fundo',
    pos: '55% 35%',
  },
  {
    id: 'curiosidade',
    titulo: 'Curiosidade',
    ingles: 'Curiosity',
    texto: 'Perguntar é o primeiro passo. Incentivamos cada aluno a explorar o idioma também por músicas, filmes, jogos e conversas do dia a dia.',
    img: curiosidade,
    alt: 'Crianças levantam a mão em sala de aula enquanto a professora explica no quadro',
    pos: '50% 45%',
  },
  {
    id: 'acolhimento',
    titulo: 'Acolhimento',
    ingles: 'Care',
    texto: 'Um ambiente acolhedor, que respeita o ritmo de cada fase, de Kids a Adults, para que todos se sintam à vontade para aprender.',
    img: acolhimento,
    alt: 'Três alunos sorriem segurando uma moldura listrada com a bandeira dos Estados Unidos e o logo da Loft English',
    pos: '50% 40%',
  },
  {
    id: 'alegria',
    titulo: 'Alegria de aprender',
    ingles: 'Fun',
    texto: 'Atividades, jogos e momentos especiais tornam o inglês parte da rotina, dentro e fora da sala de aula.',
    img: alegria,
    alt: 'Menino de camisa polo vermelha sorri para a câmera durante uma atividade de pintura em sala',
    pos: '50% 32%',
  },
];
