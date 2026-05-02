/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PILOT_WEBHOOK_URL: string;
  readonly PUBLIC_ANALYTICS_DOMAIN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
