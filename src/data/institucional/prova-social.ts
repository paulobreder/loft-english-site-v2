/**
 * Prova social — DEPOIMENTOS e RECONHECIMENTOS.
 * Ficam vazios até haver material REAL, com fonte verificável e autorização de uso.
 * Cada item só é exibido se `autorizado: true`. Listas vazias = seções ocultas.
 *
 * Nunca escrever depoimentos fictícios nem transformar menção jornalística em prêmio.
 * Ex.: a menção ao Prêmio Destaque Hoje Notícias (dossiê, F05/F06) só entra depois de
 * confirmar o vínculo com a Loft English e a permissão de uso (pendência I05).
 */
export interface Depoimento {
  texto: string;
  nome: string;
  /** Ex.: "Aluna do curso Adults" ou "Mãe de aluno Kids". */
  contexto: string;
  /** Link da publicação/avaliação original, se houver. */
  fonte?: string;
  autorizado: boolean;
}

export interface Reconhecimento {
  titulo: string;
  /** Quem concedeu/publicou. */
  emissor: string;
  ano: string;
  /** Link para a fonte pública. */
  url?: string;
  autorizado: boolean;
}

export const depoimentos: Depoimento[] = [];

export const reconhecimentos: Reconhecimento[] = [];
