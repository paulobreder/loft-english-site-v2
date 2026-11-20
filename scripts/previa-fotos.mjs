// Inicia o servidor local COM a prévia da seção "Vida na Loft" (fotos pendentes de autorização).
// Funciona em macOS, Linux e Windows. Uso: npm run dev:previa-fotos
// A prévia nunca entra em `npm run build`.
import { spawn } from 'node:child_process';

const child = spawn('npx', ['astro', 'dev', ...process.argv.slice(2)], {
  stdio: 'inherit',
  shell: process.platform === 'win32',
  env: { ...process.env, LOFT_PREVIA_FOTOS: '1' },
});
child.on('exit', (code) => process.exit(code ?? 0));
