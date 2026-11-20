// Envia o SITE (e somente o site) para o repositório público "publico".
// Uso: npm run publicar   (publica o último commit local)
//
// Apenas os itens da lista PERMITIDOS vão para o repositório público.
// Dossiê, referências de terceiros, fotos pendentes e instruções internas NUNCA são enviados.
import { execSync } from 'node:child_process';

const PERMITIDOS = new Set([
  '.github', '.gitignore', 'README.md', 'astro.config.mjs', 'docs',
  'package-lock.json', 'package.json', 'public', 'scripts', 'src', 'tsconfig.json',
]);
/** Remoto de destino: "publico" (prévia v1) por padrão; ex.: REMOTO=publico-v2 npm run publicar */
const REMOTO = process.env.REMOTO ?? 'publico';
const sh = (cmd, opts = {}) => execSync(cmd, { encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], ...opts }).trim();

try { sh(`git remote get-url ${REMOTO}`); } catch {
  console.error(`Remoto "${REMOTO}" não configurado. Veja docs/STATUS.md › Repositório público.`); process.exit(1);
}
if (sh('git status --porcelain')) {
  console.warn('Atenção: há alterações sem commit. Só o ÚLTIMO COMMIT será publicado — faça o commit antes, se quiser incluí-las.\n');
}

const entradas = sh('git ls-tree HEAD').split('\n').filter((l) => PERMITIDOS.has(l.split('\t')[1]));
const arvore = sh('git mktree', { input: entradas.join('\n') + '\n' });

let pai = null;
try { sh(`git fetch ${REMOTO} main`); pai = sh(`git rev-parse ${REMOTO}/main`); } catch { /* primeiro envio */ }
if (pai && sh(`git rev-parse ${pai}^{tree}`) === arvore) { console.log('Nada novo para publicar.'); process.exit(0); }

const assunto = sh('git log -1 --format=%s HEAD');
const msg = `${assunto}\n\nPublicado a partir do repositório de trabalho (somente arquivos do site).\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`;
const commit = sh(`git commit-tree ${arvore}${pai ? ` -p ${pai}` : ''} -F -`, { input: msg });
sh(`git push ${REMOTO} ${commit}:refs/heads/main`);
console.log(`Publicado: ${commit.slice(0, 7)} — "${assunto}". O GitHub Pages atualiza o site em 1–2 minutos.`);
