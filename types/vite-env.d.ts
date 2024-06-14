/// <reference types="vite/client" />
declare interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_BASE_API: string;
  readonly VITE_BUILD_SOURCEMAP: string;
  readonly VITE_BUILD_DROP_CONSOLE: string;
  readonly VITE_APP_LOGIN_TYPE: string;
  // 更多环境变量...
}

declare interface ImportMeta {
  readonly env: ImportMetaEnv;
  glob: (pattern: string | string[], option) => Record<string, () => Promise<any>>;
}

declare interface Number {
  abs(this: any): number;
  getInteger(this: any): number;
}
