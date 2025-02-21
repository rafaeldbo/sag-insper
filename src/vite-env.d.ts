/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
    readonly VITE_APP_BACKEND_URL: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  