export {};

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export {};

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }

  let dataLayer: Record<string, any>[];
}

declare global {
  interface Window {
    arguments: Record<string, any>[];
  }

  let arguments: Record<string, any>[];
}
