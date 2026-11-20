/**
 * Links internos compatíveis com qualquer caminho base.
 * - Domínio próprio / dev local: base "/" → url('/cursos/') = '/cursos/'
 * - GitHub Pages (prévia): base "/loft-english-site/" → '/loft-english-site/cursos/'
 * Configurado por BASE_PATH em astro.config.mjs.
 */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Prefixa caminhos internos absolutos ("/...") com o base do site. */
export function url(path: string): string {
  return path.startsWith('/') && !path.startsWith('//') ? `${BASE}${path}` : path;
}

/** Remove o base de um pathname, para comparar rotas (ex.: item ativo do menu). */
export function routePath(pathname: string): string {
  return BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) || '/' : pathname;
}
