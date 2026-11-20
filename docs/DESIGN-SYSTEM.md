# Loft English — Design system do site

Definido com a skill **ui-ux-pro-max** (fluxo: análise → design system → regras por prioridade → checklist de entrega). Tokens em `src/styles/global.css`.

## Direção
- **Tipo de produto:** site institucional de escola de idiomas local; público misto (responsáveis, adolescentes, adultos).
- **Estilo:** editorial claro, tipografia forte, muito respiro, molduras de cantos generosos. Sem gradientes decorativos, glassmorphism ou "cara de SaaS".
- **Dials:** variância 5/10 (hero assimétrica, resto em grade calma) · movimento 2/10 (só micro‑interações) · densidade 3/10 (marketing espaçoso).
- **Referências:** composição da hero inspirada no print SpeakEasy (moldura gelo, texto à esquerda, retrato com recorte de canto, apoio inferior); ritmo narrativo de seções inspirado na Overlake (públicos → escola → manifesto → primeiros passos → dúvidas → contato). Nada copiado literalmente.

## Cores (semânticas)
| Token | Valor | Uso |
|---|---|---|
| `--color-primary` | `#C40018` | CTAs, ícones, acentos |
| `--color-primary-hover` / `-active` | `#A00014` / `#85000F` | Estados |
| `--color-ink` | `#071D3D` | Títulos, estrutura, faixas escuras |
| `--color-surface-alt` | `#EEF2FA` | Molduras e seções alternadas |
| `--color-surface` | `#FFFFFF` | Fundo |
| `--color-muted` | `#55565B` | Texto de apoio |
| `--color-text` | `#2A2C33` | Texto corrido |
| `--color-focus` | `#0B5FFF` (branco em superfícies escuras) | Anel de foco |

### Contrastes medidos (WCAG 2.x)
navy/branco 16,77 · navy/gelo 14,95 · vermelho/branco 6,25 · vermelho/gelo 5,57 · branco sobre botão vermelho 6,25 (hover 8,38) · cinza/branco 7,32 · cinza/gelo 6,53 · texto/branco 13,94 · foco azul/branco 5,13 · foco azul/gelo 4,57. Todos os pares de texto passam AA.

Tema único claro por decisão de marca (prancha aprovada é clara); sem modo escuro nesta versão.

## Tipografia
- **Montserrat** (variável, 700–800) em títulos, logo e destaques; **Inter** (variável, 400–600) em corpo, navegação e botões.
- Fontes **auto‑hospedadas** via `@fontsource-variable` (sem requisição ao Google; só o subconjunto latino é baixado).
- Escala fluida: 13 / 15 / 16 / 18 / 20–24 / 24–32 / 30–44 / 38–68 px. Corpo 16 px, entrelinha 1,6–1,75; títulos com `text-wrap: balance`.

## Espaço, raio, elevação, movimento
- Ritmo 4/8 (`--sp-1`…`--sp-11`), seções `clamp(4rem … 7.5rem)`, container 1216 px + gutter fluido.
- Raios: 10 / 16 / 24 / 32 px; molduras 24–40 px; botões em pílula.
- Uma escala de sombra (`--shadow-1`, `--shadow-2`).
- 140 ms / 220 ms com `cubic-bezier(.22,1,.36,1)`; só `transform`/cor; `prefers-reduced-motion` zera transições.

## Componentes
`Logo` (búfalo + divisor + "Loft English" em texto real) · `BuffaloMark` · `Icon` (família única Lucide‑style, traço 1,75) · `Button` (primary / secondary / light / ghost‑light) · `Header` (sticky, menu mobile acessível com Esc e retorno de foco) · `Footer` · `Hero` · `AudienceCard` (tipográfico, slot de foto pronto) · `PhotoSlot` (foto real ou composição de marca neutra) · `Faq` (`<details>` nativo) · `ContactBand` · `PageHero` · `VidaNaLoft` (galeria editorial assimétrica, condicional à liberação das fotos).

## Logo — nota de fidelidade
O SVG de estudo (`02_IDENTIDADE_VISUAL/logo-minimalista-site-estudo.svg`) aplicava escala não uniforme (0,507 × 0,649) e o nome em duas linhas. A prancha aprovada mostra o búfalo na proporção original (~1,4 : 1) e "Loft English" em uma linha. O site usa o mesmo traçado **sem distorção**, em uma linha, conforme a prancha.

## Anti‑padrões evitados
Números/depoimentos fictícios, carrossel, autoplay, emoji como ícone, mistura de bibliotecas de ícones, botões `#`, mapa sem endereço confirmado, formulário sem destinatário, banner de cookies falso.
