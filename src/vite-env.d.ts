/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_IS_TEST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
