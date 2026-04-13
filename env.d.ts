/// <reference types="@cloudflare/workers-types" />

interface CloudflareEnv {
  DB: D1Database;
  WIKI_IMAGES: R2Bucket;
}

declare module "@cloudflare/next-on-pages" {
  export function getRequestContext(): {
    env: CloudflareEnv;
    cf: Record<string, unknown>;
    ctx: ExecutionContext;
  };
}

export {};
