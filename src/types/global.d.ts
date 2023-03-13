/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}
declare module '*.scss' {
  const css: string;
  export default css;
}
declare module '*.png' {
  const png: string;
  export default png;
}

declare module '*.jpg' {
  const jpg: string;
  export default jpg;
}
declare module '*.svg' {
  const svg: string;
  export default svg;
}
