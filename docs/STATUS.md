# Loft English — Status do site

**Marco:** v0.1 — primeira versão funcional para avaliação · 16/11/2026
**Atualização v0.2:** seção "Vida na Loft" com trava de autorização (16/11/2026).
**Estado:** prévia local. **Não publicada.** Nenhum domínio, hospedagem ou serviço foi contratado.

## Stack
Astro 7 + TypeScript (estático, sem backend) · CSS próprio com tokens · `@astrojs/sitemap` · fontes auto‑hospedadas (`@fontsource-variable`) · imagens otimizadas por `astro:assets` + `sharp` (AVIF/WebP + fallback JPEG, `srcset`).

```
npm install
npm run dev        # desenvolvimento em http://localhost:4321 (como o público verá)
npm run dev:previa-fotos   # idem + PRÉVIA LOCAL da seção "Vida na Loft" com as fotos pendentes
npm run build      # gera dist/ (modo PRÉVIA: noindex + robots bloqueando)
SITE_URL=https://dominio-definitivo npm run build   # modo PRODUÇÃO: indexável, canonical, sitemap
npm run check      # verificação de tipos/Astro (lint)
```

## Páginas
| Rota | Conteúdo |
|---|---|
| `/` | Hero editorial · Kids/Teens/Adults · A escola (`#escola`) · Manifesto da bio · Vida na Loft (`#vida-na-loft`, oculta na versão pública até a liberação das fotos) · Primeiros passos · Dúvidas · CTA final |
| `/cursos/` | Âncoras `#kids` `#teens` `#adults`, blocos tipográficos, "o que consultar com a equipe", CTA por curso |
| `/contato/` | Cartão do Instagram (arroba sempre em uma linha) + "Onde estamos" com **mapa estático da cidade** (OpenStreetMap, sem pino em endereço) e link "Ver a cidade no Google Maps"; endereço/horário aparecem sozinhos quando configurados |
| `/privacidade/` | **Rascunho** fiel ao comportamento técnico real; `noindex` e fora do sitemap até revisão |
| `/404` | Página de erro com rotas de saída |

## Onde mudar dados (um único arquivo)
`src/config/site.ts` — WhatsApp, telefone, e‑mail, endereço, CEP, link do Maps, horário. `null` = oculto em todo o site e no JSON‑LD.
- Ao preencher `whatsappE164` (ex.: `5527XXXXXXXXX`), **todos** os CTAs viram "Falar pelo WhatsApp" automaticamente, com mensagem por curso.
- `flags.privacyReviewed = true` libera a privacidade para indexação/sitemap (após revisão).
- Detalhes por curso (idades, modalidade, aulas): `src/data/courses.ts` → `details`.

### Como ativar fotos (sem refatorar)
- Cards e blocos de curso: `src/data/courses.ts` → `image: { src, alt }`.
- Seção "A escola": prop `image` do `<PhotoSlot>` em `src/pages/index.astro`.
- Galeria "Vida na Loft": ver seção "Vida na Loft — prévia e liberação" abaixo.
Somente fotos **originais e autorizadas** (menores: autorização dos responsáveis).

## Imagens efetivamente publicadas
| Arquivo | Onde | Observação |
|---|---|---|
| `04_ASSETS_APROVADOS/hero-estudante-loft.png` | Hero (retrato) e `public/og-image.jpg` | Imagem publicitária gerada; alt diz "imagem ilustrativa"; rodapé informa que as fotos da home são ilustrativas |
| `04_ASSETS_APROVADOS/apoio-londres-ilustrativo.png` | Hero (apoio) | Ilustrativa; sem alegação de vínculo com Londres |
| Búfalo da logo C (traçado do estudo) | Header, rodapé, favicon, ícones, marcas d'água | Estudo técnico, não vetor oficial |

**Não publicadas:** `05_FOTOS_ESCOLA_PENDENTES_LIBERACAO/*` (também no `.gitignore`), `03_REFERENCIAS_DESIGN/*`, prancha, logo institucional reconstruída. Originais do kit intactos; cópias de trabalho em `src/assets/images/`.

## Destinos dos CTAs
- "Falar pelo Instagram" / "Perguntar sobre Kids|Teens|Adults" / "Conversar pelo Instagram" → `https://www.instagram.com/loftenglishsg/` (nova aba).
- "Conheça os cursos" e botão de seta da hero → `/cursos/`; cards → `/cursos/#kids|#teens|#adults`.
- Nenhum `wa.me`, telefone, mapa, formulário ou link `#` falso.

## Testes executados (16/11/2026)
- `astro check`: 0 erros, 0 avisos, 0 dicas. `astro build`: 5 páginas, sem erros.
- Puppeteer + Chrome nas larguras 360 / 390 / 430 / 768 / 1280 / 1440 em todas as páginas: **sem scroll horizontal**, todas as imagens carregadas, **sem erros de console**, 1 H1 por página.
- Links internos e âncoras: todos resolvem. Instagram: URL confirmada no dossiê (não acessada por robô).
- Teclado: skip‑link primeiro, foco visível (3 px) em todos os controles; menu mobile com `aria-expanded`, fecha com Esc e devolve o foco.
- Contraste AA em todos os pares de texto (valores em `docs/DESIGN-SYSTEM.md`).
- Desempenho local (servidor estático, sem throttling — não é medição de campo): home 216 KB (desktop) / 380 KB (mobile 3x) na primeira carga, 8–9 requisições, **CLS 0**.
- Modo produção (`SITE_URL` de teste): `index, follow`, canonical absoluto, robots com sitemap, sitemap com `/`, `/cursos/`, `/contato/`; JSON‑LD `EducationalOrganization` só com nome, slogan, URL, logo, Instagram e cidade/UF.
- Não executado: Lighthouse/PageSpeed oficial, leitor de tela real (VoiceOver/NVDA), Safari/Firefox, teste em aparelho físico, validação no Rich Results Test (requer URL pública).

## Versão alternativa v2 (branch `v2`, 20/11/2026)
Atende ao feedback da proprietária (`06_CONTEUDOS_PLANEJADOS/FEEDBACK-PROPRIETARIA-2026-11.md`). **Não substitui a prévia v1.**
- Prévia v2: https://paulobreder.github.io/loft-english-site-v2/ · código: https://github.com/paulobreder/loft-english-site-v2
- Prévia v1 (inalterada, branch `main`): https://paulobreder.github.io/loft-english-site/
- Publicar a v2: na branch `v2`, commit e `REMOTO=publico-v2 npm run publicar`.

| Mudança | Detalhe |
|---|---|
| Paleta | Vermelho e branco dominantes (fundos rosados, faixas, rodapé vermelho profundo `#8E0012`); azul-marinho só em títulos, Adults e detalhes |
| Hero | Estrutura igual; imagem de Londres trocada pela bandeira dos EUA + Nova York (inglês americano) |
| Mascote | Búfalo ilustrado (2 versões) com movimento suave, em Sobre nós, "em poucas palavras" e na chamada final; parado com redução de movimento |
| Barra superior | Removida em 21/11/2026 (pedido do responsável) |
| Cursos | Cards com rodapé colorido (vermelho, vermelho profundo, azul) |
| Sobre a Loft English | Reformulada em 22/11/2026 (referência Overlake): frase "Aqui, o inglês aproxima pessoas e abre caminhos para o mundo.", foto da aula (quadro em inglês, bandeiras EUA/Canadá), mapa ilustrado, bisão, avião com trajetória (desenha uma vez ao rolar), vídeo da turma numa tela em formato de celular (toca ali mesmo, sem som e em loop, como um GIF; capa vertical extraída do próprio vídeo), blocos "Nosso propósito" e "Nosso compromisso" (textos a validar com a proprietária). **Vídeo**: liberado na prévia; no site oficial fica oculto (foto liberada no lugar) e o MP4 é removido da build até `videoSobreALoft.oficialAutorizado = true` em `src/config/site.ts` |
| Carrossel de valores | "O que faz a Loft ser a Loft" após a faixa listrada: Confiança, Curiosidade, Acolhimento, Alegria de aprender (valores a validar com a proprietária). Imagens 1–2 geradas; 3–4 fotos reais da Loft com autorização confirmada em 20/11/2026 |
| Rótulo "imagem ilustrativa" | Removido de todo o site (rodapé e textos alternativos) a pedido do responsável em 21/11/2026. As imagens geradas continuam sem ser apresentadas como alunos reais |
| Página Nossa equipe | `/equipe/` (menu e rodapé): destaque da Teacher Fabiola (dona), equipe e professores, convite pelo Instagram. Fotos do kit de 21/11/2026, liberadas pelo responsável; textos editoriais a validar com a proprietária |
| Depoimentos | Seção após "Vida na Loft" (referência Overlake): painel vermelho profundo com citação curta e PT/EN; metade da seção com foto de turma em roda de conversa (imagem de apoio de 21/11/2026) sob véu vermelho; retrato do aluno em círculo junto do nome. Dados em `src/data/institucional/depoimentos.ts` (fases, níveis, áudio e vídeo opcionais). **Sofia é persona DEMONSTRATIVA**: aparece só nas prévias (selo visível removido a pedido do responsável em 21/11/2026); no site oficial não é renderizada. Substituir por depoimentos reais autorizados |
| Animação ao rolar | Elementos entram conforme a rolagem (como na Overlake): `data-reveal` em `global.css` + script em `BaseLayout`. Sem JS ou com "reduzir movimento", tudo aparece direto |
| Pontos fortes | "Como a Loft ajuda você a avançar": American English, método próprio, aprender junto, na sua cidade, com o búfalo maior no centro |
| Manifesto | Faixa listrada vermelha com cantão de estrelas e o slogan *opening the world for you* |
| Por que aprender inglês | Cards com imagem de topo em arco (1,1:1), ritmo desalinhado; imagens de apoio provisórias (abaixo) |
| Chamada final | Foto da aula com sobreposição vermelha, 3 botões coloridos e mascote |

Imagens: a de Londres saiu do site em 20/11 (substituída a pedido do responsável), mas continua em `04_ASSETS_APROVADOS/` e `src/assets/images/`.
**Imagens de apoio PROVISÓRIAS** em "Por que aprender inglês" (geradas pelo responsável, só para apresentar à proprietária; trocar depois): `src/assets/images/apoio/estudos-universidade.webp`, `carreira-aluno-estudando.webp`, `mundo-musica-aviao.webp` (cópias em `04_ASSETS_APROVADOS/v2-apoio-provisorio-*`). A de carreira mostra capas "Loft English — General English / Conversation" criadas pela IA: **não são livros reais da escola** — substituir pelas capas verdadeiras quando chegarem. **A imagem dos EUA veio do Pinterest — confirmar licença ou substituir antes da publicação oficial.** Referências da Overlake em `03_REFERENCIAS_DESIGN/OVERLAKE-REFERENCIA-V2/` (só inspiração, fora do repositório público).

## Novos recursos inspirados em benchmarking (v0.4)
Análise da landing page da Cultura Inglesa (17/11/2026). Aproveitados apenas **padrões de UX**, sem copiar textos, marca nem números.

| Recurso | Onde | Estado |
|---|---|---|
| **Sobre nós** (pilares com fatos confirmados; menu "Sobre nós" → `#sobre-nos`) | Home | Ativo |
| História, missão e equipe | `src/data/institucional/sobre.ts` | Oculto até preencher (pendências I03/I04) |
| **Por que aprender inglês?** (6 benefícios gerais do idioma) | Home | Ativo |
| **Barra de contato fixa** no celular (some no topo, na faixa de contato e no rodapé; não aparece no desktop nem em /contato/) | Todas as páginas | Ativo |
| **Formas de estudar** (abas Presencial/Online) | `modalidades` em `src/config/site.ts` | Oculto até `confirmado: true` |
| **Depoimentos** e **Reconhecimentos** (só itens com `autorizado: true`) | `src/data/institucional/prova-social.ts` | Ocultos até haver material real |

Não aproveitados por falta de dados verificáveis ou por regra do projeto: números/estatísticas, depoimentos e prêmios genéricos, promoções, teste de nível e formulário.

## Repositório público e prévia no ar (v0.3)
- Código: https://github.com/paulobreder/loft-english-site (público, **somente arquivos do site**)
- Prévia: https://paulobreder.github.io/loft-english-site/ (GitHub Pages; `noindex` + robots bloqueado — não é o site oficial)
- Para atualizar depois de editar: faça o commit e rode `npm run publicar`. O script envia apenas a lista permitida (`src`, `public`, `scripts`, `docs`, configs e workflow); dossiê, referências, fotos pendentes e instruções internas nunca saem desta pasta. O GitHub Actions refaz o site em 1–2 minutos.
- Links internos usam `url()` (`src/lib/url.ts`) para funcionar no subcaminho do Pages e na raiz de um domínio próprio.

## Fotos dos cursos Kids, Teens e Adults (v0.3)
- Imagens publicitárias geradas e aprovadas pelo cliente em 16/11/2026, recebidas pela conversa (não estavam no kit) e copiadas sem alteração para `src/assets/images/cursos/` (`kids.jpg`, `teens.webp` — blusa azul-marinho, `adults.jpg`; a versão anterior de Teens ficou em `teens-anterior-blusa-vermelha.jpg`). São ilustrativas — o texto alternativo e o rodapé informam isso.
- Ativadas nos slots já existentes (card da home — área de imagem ampliada para 1:1 a pedido do cliente; bloco da página /cursos/ 5:4 no celular e 4:5 no desktop), sem alterar layout. Enquadramento por foto em `src/data/courses.ts` → `image.position` (card / mobile / desktop), preservando rostos, a apostila (Teens) e a caneca (Adults).
- Reverter para a versão tipográfica: trocar `image` por `null` em `src/data/courses.ts`.

## Mapa da página Contato (v0.2)
- Imagem estática gerada por `node scripts/gerar-mapa.mjs` a partir de tiles do OpenStreetMap (baixados uma vez; o site não chama Google nem OSM). Atribuição "© colaboradores do OpenStreetMap" exibida no mapa (exigência da licença ODbL).
- Centralizado na **área urbana da cidade** (−19.0148, −40.5395), em estilo "mapa azul" (duotone azul-escuro → gelo), com destaque circular vermelho de "região central" — **sem pino**, porque o endereço exato ainda diverge nas fontes.
- O link usa `contact.mapsUrl` ("Como chegar") quando for preenchido; até lá, busca pela cidade no Google Maps.
- Depois que o endereço for confirmado: `node scripts/gerar-mapa.mjs <lat> <lon> 16` para centralizar na escola e, se desejar, trocar o círculo por um pino.

## Vida na Loft — LIBERADA (v0.4.1, 17/11/2026)
- O responsável pelo projeto confirmou as três condições: autorização dos estudantes e responsáveis legais, aprovação da escola e conferência de fidelidade. `mediaRelease.vidaNaLoft` está todo `true` e as fotos estão em `src/assets/images/escola/`.
- **Para retirar do ar** (ex.: revogação de autorização): voltar qualquer item de `mediaRelease.vidaNaLoft` para `false`, remover as fotos de `src/assets/images/escola/`, fazer o commit e rodar `npm run publicar`. Observação: arquivos já enviados ao repositório público continuam no histórico do Git; uma remoção completa exige reescrever esse histórico.

## Vida na Loft — prévia e liberação (v0.2)

**Seção:** "Muito além da sala de aula." na home, entre o manifesto e "Primeiros passos". Grade editorial assimétrica (sem carrossel): aula coletiva em destaque (3:2) + selfie da turma (retrato) na primeira linha; cartão navy com link para o Instagram + atividade com lanche (4:3) na segunda. Tablet e celular reorganizam/empilham; enquadramentos definidos por foto em `src/data/vida-na-loft/tipos.ts` para não cortar rostos. Fotos sem legendas sobrepostas (descrição apenas no texto alternativo).

**Como funciona a trava** (`astro.config.mjs` → módulo `virtual:vida-na-loft`):
| Modo | Quando | O que acontece |
|---|---|---|
| `oculto` | padrão; **qualquer** `npm run build` sem liberação | Seção não renderizada; `05_…` nunca é lida nem copiada para `dist/` |
| `previa` | só `npm run dev:previa-fotos` (servidor local) | Lê os 3 arquivos `EDITADA-*` direto de `05_…` (sem aviso visual na página — a trava continua na build) |
| `publicado` | os 3 itens de `mediaRelease.vidaNaLoft` = `true` | Lê as fotos de `src/assets/images/escola/` e publica (AVIF/WebP + JPEG, `srcset`, lazy) |

Verificado em 16/11/2026: build pública em modo `oculto`, 0 arquivos das fotos em `dist/`; forçar `LOFT_PREVIA_FOTOS=1` em `astro build` também resulta em `oculto`.

**Ver a prévia:** `npm run dev:previa-fotos` → http://localhost:4321/#vida-na-loft

**Liberar para produção (somente após autorização):**
1. Obter autorização escrita de uso de imagem dos estudantes e dos **responsáveis legais** dos menores; aprovação da escola; e conferir pessoas/ambiente com os registros originais (idealmente substituir pelas fotos originais da escola, em boa resolução).
2. Copiar (sem apagar os originais) para `src/assets/images/escola/` com os nomes `aula-coletiva.png`, `selfie-turma.png`, `atividade-lanche.png` (ou .jpg/.webp).
3. Em `src/config/site.ts`, marcar `true` os três itens de `mediaRelease.vidaNaLoft`.
4. `npm run build` — o log deve mostrar `Vida na Loft: modo "publicado"`. Revisar a home antes de publicar.

**Divergências encontradas na conferência das reconstruções × prints originais** (resolver no item 1):
- *Aula coletiva:* enquadramento ampliado pela IA; texto da parede, pôsteres ("LONDON/NEW YORK/DUBAI/TORONTO") e a parte inferior (coberta pelo logo no print) foram recriados; rostos à direita reconstruídos.
- *Selfie da turma:* a mais fiel; estante, livros e pôster ao fundo reinventados.
- *Atividade com lanche:* camiseta "Palm Angels" virou "Quiksilver" (marca trocada); imagem da TV e alguns rostos alterados.
Todas retratam menores de idade.

## Pendências para a proprietária (antes de publicar)
1. **WhatsApp oficial** completo + quem atende + horário de atendimento.
2. **Endereço atual** (rua, número, bairro, CEP) e link correto do Google Maps — as fontes consultadas divergem (detalhes no dossiê interno, fora do repositório público).
3. **Por curso:** idades, presencial/online, frequência/duração, como funciona a matrícula. (Valores podem continuar "sob consulta".)
4. **Logo:** aprovar a aplicação da versão minimalista C no site e, se existir, enviar o vetor original (SVG/PDF) da marca.
5. **Fotos originais autorizadas** da escola, turmas e equipe (com autorização dos responsáveis para menores) — para ativar cards, "A escola" e liberar "Vida na Loft" (3 confirmações em `mediaRelease.vidaNaLoft`).
6. **Domínio e hospedagem:** titular, acesso ao DNS. Depois, revisar `/privacidade/` com o provedor real e ativar `flags.privacyReviewed`.
7. Opcional: método/diferenciais comprováveis, reconhecimentos documentados, e‑mail de contato.

## Decisões técnicas registradas
- Header usa a logo C em uma linha, fiel à prancha (o SVG de estudo distorcia o búfalo).
- Texto "Inglês de verdade, para a vida." / "Fale inglês com confiança." vem da bio do Instagram (F01), apresentado como comunicação da escola, não como promessa.
- Seção "Experiências de aprendizagem/metodologia" **omitida** (sem descrição real da escola).
- "Vida na Loft" implementada com trava de autorização na build (v0.2): sem liberação, a pasta 05_ nunca é lida pela build pública.
- Sem analytics, cookies, pixels, embeds ou fontes externas.
- Repositório Git na raiz do kit; commit inicial com a v0.1 (sem a pasta 05_, ignorada no `.gitignore`).
