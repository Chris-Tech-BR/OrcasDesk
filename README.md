# OrcasDesk — site estático (HTML, CSS e JS puros)

Sem build, sem dependências. Basta subir a pasta para qualquer hospedagem estática
(Netlify, Vercel, Cloudflare Pages, GitHub Pages, Hostinger etc.).

## Estrutura de pastas

Crie uma pasta chamada `orcasdesk` e organize os arquivos exatamente assim:

```
orcasdesk/
├── index.html            ← página inicial
├── demonstracoes.html
├── servicos.html
├── planos.html
├── contato.html
├── privacidade.html
├── termos.html
├── 404.html
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── favicon.ico
├── README.md
├── demos/
│   ├── restaurante.html
│   ├── barbearia.html
│   ├── clinica.html
│   ├── academia.html
│   ├── imobiliaria.html
│   ├── oficina.html
│   ├── loja.html
│   ├── advocacia.html
│   ├── freelancer.html
│   └── servicos-locais.html
└── assets/
    ├── css/   style.css, demo-kit.css
    ├── js/    main.js, demo-kit.js
    └── img/   logo.svg, og-image.png, icon-192.png, icon-512.png, apple-touch-icon.png
        └── demos/   10 prévias .webp, barbearia-mobile.webp e 10 imagens -og.jpg
```

Para testar, basta dar dois cliques em `index.html`. Os links são relativos e funcionam
direto do computador. Para publicar, envie a pasta inteira para a raiz do domínio.

## Antes de publicar

1. **Domínio**: o SEO usa `https://www.orcasdesk.com.br` em canonical, Open Graph,
   JSON-LD, sitemap e robots. Se o domínio for outro, faça "localizar e substituir"
   de `https://www.orcasdesk.com.br` em todos os arquivos `.html`, `sitemap.xml` e `robots.txt`.
2. **Página 404**: Netlify, Cloudflare Pages e GitHub Pages usam `404.html` automaticamente.
   No Apache, adicione ao `.htaccess`: `ErrorDocument 404 /404.html`.
3. **Políticas a confirmar** (estão no texto do site; ajuste se não for o que você pratica):
   - "Pedidos simples de conteúdo costumam ser atendidos em até 2 dias úteis" (/planos/).
   - Possível taxa de implantação, domínio e serviços de terceiros informados antes.
4. **Google**: cadastre o site no Google Search Console, envie `https://SEU-DOMINIO/sitemap.xml`
   e crie/vincule o Perfil da Empresa no Google com o mesmo WhatsApp e e-mail.

## SEO incluído

- `<title>` e meta description únicos por página, um único `<h1>`, hierarquia de títulos.
- Canonical, hreflang pt-BR, robots, Open Graph e Twitter Card (com imagem por demo).
- JSON-LD: Organization/ProfessionalService com oferta R$ 79/mês, WebSite, WebPage,
  BreadcrumbList, FAQPage (início e planos), Service + OfferCatalog (serviços),
  ItemList (demonstrações), ContactPage.
- sitemap.xml, robots.txt, manifest, favicons, imagens WebP com largura/altura definidas,
  lazy loading e pré-carregamento da imagem principal.

## Contato e WhatsApp

Todos os botões usam `https://wa.me/5555996689852?text=...` com mensagens já codificadas
para cada contexto (plano, demonstração, orçamento). E-mail: `mailto:orcasdesk@gmail.com`.

## Demonstrações

Empresas, pessoas, preços e endereços são fictícios e sinalizados em cada página. Botões
de ação dos negócios fictícios mostram um aviso de demonstração em vez de simular envio.
