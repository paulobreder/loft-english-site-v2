/**
 * Perguntas frequentes — somente respostas sustentadas pelo dossiê ou pela
 * configuração central. Quando a proprietária confirmar dados (endereço,
 * idades, modalidades), as respostas passam a usá-los automaticamente.
 */
import { site, contact, primaryContact } from '../config/site';
import { url } from '../lib/url';

export interface FaqItem {
  q: string;
  /** HTML simples e controlado (sem conteúdo de terceiros). */
  a: string;
}

const channel = primaryContact();
const channelLink = `<a href="${channel.href}" target="_blank" rel="noopener noreferrer">${
  channel.channel === 'whatsapp' ? 'WhatsApp' : `Instagram oficial (${contact.instagramHandle})`
}</a>`;

const whereAnswer = contact.addressLine
  ? `A Loft English fica em ${contact.addressLine}, ${site.city} – ${site.state}.${
      contact.mapsUrl ? ` <a href="${contact.mapsUrl}" target="_blank" rel="noopener noreferrer">Ver no mapa</a>.` : ''
    }`
  : `A Loft English está em ${site.city}, no ${site.stateName}. Para orientações sobre endereço e atendimento presencial, fale com a equipe pelo ${channelLink}.`;

export const faq: FaqItem[] = [
  {
    q: 'Para quem são os cursos da Loft English?',
    a: 'A escola organiza seus cursos em três públicos: <strong>Kids</strong> (crianças), <strong>Teens</strong> (adolescentes) e <strong>Adults</strong> (adultos). Idades, turmas e organização das aulas são informadas diretamente pela equipe.',
  },
  {
    q: 'Onde fica a escola?',
    a: whereAnswer,
  },
  {
    q: 'A Loft English oferece aulas online?',
    a: `O ensino online é mencionado no perfil oficial da escola. Para saber se essa modalidade está disponível para o seu caso e para o público desejado, consulte a equipe pelo ${channelLink}.`,
  },
  {
    q: 'Quanto custa estudar na Loft English?',
    a: `Valores e condições são informados diretamente pela escola. Entre em contato pelo ${channelLink} para consultar.`,
  },
  {
    q: 'Como faço para começar?',
    a: `O primeiro passo é conhecer os <a href="${url('/cursos/')}">cursos</a> e conversar com a equipe pelo ${channelLink}. Pergunte sobre turmas, horários e como funciona a matrícula.`,
  },
];
