/**
 * LOFT ENGLISH — CONFIGURAÇÃO CENTRAL DE DADOS INSTITUCIONAIS
 * ------------------------------------------------------------------
 * Este é o ÚNICO lugar onde contatos e dados operacionais são definidos.
 *
 * Regra: `null` = dado ainda NÃO confirmado pela proprietária.
 * Campos `null` são ocultados automaticamente em todo o site
 * (páginas, rodapé, dados estruturados). Nunca preencha por suposição.
 *
 * Origem: 06_CONTEUDOS_PLANEJADOS/DADOS-OPERACIONAIS-A-CONFIRMAR.json
 * e 01_DOSSIE_PESQUISA/BRIEFING-MESTRE.md (consulta 16/11/2026).
 */

export interface ContactConfig {
  /** WhatsApp comercial em formato E.164 só com dígitos, ex.: "5527999999999". PENDENTE. */
  whatsappE164: string | null;
  /** Telefone para exibição, ex.: "(27) 9999-9999". PENDENTE. */
  phoneDisplay: string | null;
  /** E-mail de atendimento. PENDENTE. */
  email: string | null;
  /** Endereço completo (rua, número, bairro). PENDENTE — fontes divergentes no dossiê. */
  addressLine: string | null;
  /** CEP. PENDENTE. */
  zip: string | null;
  /** Link da ficha correta no Google Maps. PENDENTE. */
  mapsUrl: string | null;
  /** Horário de atendimento em texto livre. PENDENTE. */
  businessHours: string | null;
  /** Instagram oficial — CONFIRMADO. */
  instagramUrl: string;
  instagramHandle: string;
}

export const site = {
  name: 'Loft English',
  /** Slogan observado na marca original. */
  slogan: 'opening the world for you',
  city: 'São Gabriel da Palha',
  state: 'ES',
  stateName: 'Espírito Santo',
  country: 'BR',
  locale: 'pt-BR',
} as const;

export const contact: ContactConfig = {
  whatsappE164: null,
  phoneDisplay: null,
  email: null,
  addressLine: null,
  zip: null,
  mapsUrl: null,
  businessHours: null,
  instagramUrl: 'https://www.instagram.com/loftenglishsg/',
  instagramHandle: '@loftenglishsg',
};

/**
 * Sinalizadores de publicação.
 * privacyReviewed: mude para `true` somente depois que a escola revisar
 * o aviso de privacidade (com a hospedagem já definida). Enquanto `false`,
 * a página /privacidade/ fica com noindex e fora do sitemap.
 */
export const flags = {
  privacyReviewed: false,
} as const;

/**
 * LIBERAÇÃO DE FOTOGRAFIAS — seção "Vida na Loft" (home).
 * As fotos de 05_FOTOS_ESCOLA_PENDENTES_LIBERACAO/ são reconstruções por IA
 * de prints do Instagram e mostram MENORES DE IDADE.
 *
 * A seção só entra na versão publicada quando os TRÊS itens forem `true`.
 * Enquanto isso, ela aparece apenas em `npm run dev:previa-fotos` (máquina local),
 * e a build pública nem sequer lê os arquivos pendentes.
 * Passo a passo de liberação: docs/STATUS.md › "Vida na Loft".
 */
export const mediaRelease = {
  /** Liberado em 17/11/2026 — confirmação das 3 autorizações pelo responsável do projeto (registro em docs/STATUS.md). */
  vidaNaLoft: {
    /** Estudantes retratados e seus responsáveis legais autorizaram a publicação no site. */
    studentsAndGuardiansAuthorized: true,
    /** A escola aprovou o uso destas fotografias. */
    schoolApproved: true,
    /** Pessoas e ambiente foram conferidos com os registros originais (fidelidade da reconstrução). */
    fidelityChecked: true,
  },
};

export const isVidaNaLoftReleased = Object.values(mediaRelease.vidaNaLoft).every((ok) => ok === true);

/**
 * FORMAS DE ESTUDAR (Presencial / Online) — seção com alternância na home.
 * Só aparece quando ao menos uma modalidade for confirmada (`confirmado: true`).
 * Descreva apenas o que a escola confirmar (para quais públicos, como funciona).
 */
export const modalidades = {
  presencial: {
    confirmado: false,
    /** Ex.: 'Aulas na sede da Loft English, em São Gabriel da Palha, para Kids, Teens e Adults.' */
    texto: null as string | null,
  },
  online: {
    confirmado: false,
    /** Ex.: 'Aulas ao vivo pela internet para adultos.' — o dossiê só confirma a MENÇÃO ao online. */
    texto: null as string | null,
  },
};

/** Mensagem inicial sugerida para o WhatsApp (sem dados pessoais na URL). */
const WHATSAPP_MESSAGE = 'Olá! Vim pelo site da Loft English e gostaria de informações';

export interface ContactAction {
  href: string;
  label: string;
  shortLabel: string;
  channel: 'whatsapp' | 'instagram';
  external: true;
}

/**
 * CTA principal de contato. Usa o WhatsApp automaticamente quando
 * `contact.whatsappE164` for preenchido; até lá, Instagram oficial.
 * @param topic categoria opcional (ex.: "Kids") usada na mensagem do WhatsApp.
 */
export function primaryContact(topic?: string): ContactAction {
  if (contact.whatsappE164) {
    const text = topic ? `${WHATSAPP_MESSAGE} sobre ${topic}.` : `${WHATSAPP_MESSAGE}.`;
    return {
      href: `https://wa.me/${contact.whatsappE164}?text=${encodeURIComponent(text)}`,
      label: 'Falar pelo WhatsApp',
      shortLabel: 'WhatsApp',
      channel: 'whatsapp',
      external: true,
    };
  }
  return {
    href: contact.instagramUrl,
    label: 'Falar pelo Instagram',
    shortLabel: 'Instagram',
    channel: 'instagram',
    external: true,
  };
}

/** true quando a build tem domínio definitivo (SITE_URL). Sem ele: prévia não indexável. */
export const isProductionSite =
  Boolean(import.meta.env?.SITE) &&
  !String(import.meta.env.SITE).includes('localhost') &&
  // PUBLIC_NOINDEX=true: prévia publicada (ex.: GitHub Pages) que não deve ser indexada.
  import.meta.env?.PUBLIC_NOINDEX !== 'true';
