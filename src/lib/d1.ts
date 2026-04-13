// D1 types for Cloudflare Pages bindings
export interface Env {
  DB: D1Database;
  WIKI_IMAGES: R2Bucket;
}

// Helper to get D1 from request context (Cloudflare Pages)
export function getD1(env: Env): D1Database {
  return env.DB;
}
