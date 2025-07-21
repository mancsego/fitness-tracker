/// <reference types="vite/client" />
declare namespace React {
  function lazy<T extends ComponentType<any>>(
    factory: () => Promise<{ default: T }>,
  ): T
}
