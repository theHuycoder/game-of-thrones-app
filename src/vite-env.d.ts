/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GOT_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
