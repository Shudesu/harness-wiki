# Harness Wiki

Official operational knowledge base and cross-product research index for L Harness, IG Harness, and X Harness.

Production: https://harness-wiki.pages.dev/

## Responsibility

- Wiki: setup, operation, troubleshooting, terminology, updates, and community guidance.
- `line-harness.jp`, `ig-harness.jp`, `x-harness.jp`: canonical code-grounded research.
- `the-harness.jp`: portfolio-level entry point.

Research is linked from `/research`; full articles are not copied into this repository.

## Local commands

```bash
pnpm install
pnpm build
pnpm pages:build
pnpm deploy
```

This project has its own `wrangler.toml` and Pages project name (`harness-wiki`). Production deployment is triggered by a push to `main`; GitHub Actions pins the Cloudflare account ID and uses the project-specific credential. Run local commands from this directory so no other Harness Wrangler configuration is rewritten.

## Search and AI discovery

- `/sitemap.xml`: static pages plus published D1 articles.
- `/robots.txt`: general search and named AI/search crawlers.
- `/llms.txt`: concise site map and entity facts.
- `/llms-full.txt`: expanded source/limitations guide.
- `/research`: visible cross-product index of 30 research articles.
- `/research/catalog.json`: Schema.org `DataCatalog` representation.
