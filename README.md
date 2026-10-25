# OrcasDesk — site oficial

Site estático (HTML, CSS e JavaScript puros) gerado por um script Node. Sem framework, sem banco de dados e sem backend: carrega rápido, é fácil de hospedar e ótimo para SEO.

## Estrutura

```
build.mjs              gera o site em dist/
src/config.mjs         domínio, WhatsApp, e-mail, preço, mensagens do WhatsApp
src/layout.mjs         <head> com SEO, cabeçalho, rodapé, dados estruturados
src/pages.mjs          páginas principais (início, serviços, planos, contato, galeria, legais, 404)
src/demos-a.mjs        demos: restaurante, barbearia, clínica, academia, imobiliária
src/demos-b.mjs        demos: oficina, loja, advocacia, freelancer, reparos
src/assets/            CSS e JS do site e das demos
static/                favicon, ícones e imagens de compartilhamento (geradas)
scripts/images.py      gera ícones e imagens Open Graph
scripts/check.py       testa links, WhatsApp, SEO, layout e interações
```

## Como gerar

```bash
SITE_URL=https://www.seudominio.com.br node build.mjs
```

O resultado fica em `dist/`. Envie o conteúdo dessa pasta para a hospedagem.

**Antes de publicar, defina o domínio definitivo** (em `SITE_URL` ou em `src/config.mjs`). Ele é usado no canonical, no Open Graph, no `sitemap.xml`, no `robots.txt` e nos dados estruturados. O padrão é `https://www.orcasdesk.com.br`.

Variáveis opcionais:

| Variável | Para quê |
|---|---|
| `GOOGLE_SITE_VERIFICATION` | Código da meta tag do Google Search Console |
| `BING_SITE_VERIFICATION` | Código do Bing Webmaster Tools |
| `GA4_ID` | ID do Google Analytics 4 (ex.: `G-XXXXXXX`). Se usar, revise a política de privacidade e considere um aviso de cookies. |

## Hospedagem

Funciona em qualquer hospedagem estática. Os arquivos de configuração já vêm prontos:

- **Netlify / Cloudflare Pages**: `_headers` e `_redirects` (pasta de publicação: `dist`)
- **Vercel**: `vercel.json` (URLs limpas, barra no final, cabeçalhos de segurança e cache)
- **Hospedagem compartilhada com Apache** (Hostinger, Locaweb etc.): `.htaccess` (HTTPS, página 404, cache e compressão)

A página `404.html` é usada automaticamente por essas plataformas.

## SEO incluído

- `lang="pt-BR"`, título e descrição únicos por página, um `h1` por página
- Canonical, `hreflang` pt-BR e x-default, meta robots (404 com `noindex`)
- Open Graph e Twitter Card com imagem 1200×630 para cada página (demos com imagem própria)
- Dados estruturados JSON-LD: `Organization`, `WebSite`, `WebPage`, `Service` com oferta em BRL (R$ 79/mês), `FAQPage`, `BreadcrumbList`, `ItemList` e `ContactPage`
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, favicon, ícones Apple e Android
- Fontes com `preconnect` e `display=swap`, CSS e JS leves, sem bibliotecas externas, animações que respeitam "reduzir movimento"
- Páginas das demos com títulos voltados a buscas como "exemplo de site para barbearia"

As demos são marcadas como negócios fictícios. Elas não recebem dados estruturados de empresa local, para não confundir o Google.

## Depois de publicar (passo a passo do Google)

1. **Google Search Console**: adicione a propriedade do domínio, verifique (DNS ou meta tag via `GOOGLE_SITE_VERIFICATION`) e envie `https://seudominio/sitemap.xml` em *Sitemaps*.
2. **Inspeção de URL**: peça a indexação da página inicial, de `/planos/` e de `/demonstracoes/`.
3. **Perfil da Empresa no Google** (Google Meu Negócio): crie o perfil da OrcasDesk com o mesmo nome, telefone e site. Isso ajuda muito em buscas locais.
4. **Teste de pesquisa aprimorada**: valide uma página em https://search.google.com/test/rich-results
5. **PageSpeed Insights**: confira o desempenho em https://pagespeed.web.dev
6. Quando tiver Instagram ou outras redes, preencha `instagram` em `src/config.mjs` (entra no `sameAs` dos dados estruturados).

## Imagens e testes

```bash
pip install playwright && playwright install chromium   # uma vez
node build.mjs && python3 scripts/images.py && node build.mjs   # regenera ícones e imagens OG
python3 scripts/check.py                                        # testa tudo
```

`check.py` verifica: links internos e âncoras, número e mensagem de todos os links do WhatsApp, e-mail, títulos e descrições, canonical, Open Graph, JSON-LD válido, sitemap, rolagem horizontal em 375, 768 e 1440 px, erros de console, filtros, abas, menu móvel e o montador de mensagem da página de contato.

## Para confirmar antes de publicar

- Domínio definitivo (`SITE_URL`).
- Prazo padrão de alterações simples: está como "até 2 dias úteis" em `src/config.mjs` (`updateTurnaround`). Ajuste para o prazo que você realmente oferece.
- Política de privacidade e termos de uso: são textos-base. Vale uma revisão jurídica.
