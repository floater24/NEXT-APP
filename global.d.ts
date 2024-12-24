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

  var dataLayer: Record<string, any>[];
}
if (typeof window !== 'undefined') {
  window.dataLayer = window.dataLayer || [];
}

if (typeof globalThis !== 'undefined') {
  globalThis.dataLayer = globalThis.dataLayer || [];
}

if (typeof window !== 'undefined' && window.dataLayer) {
  window.dataLayer.push({ event: 'pageview' });
}

export {};


declare global {
  interface Window {
    customArguments: Record<string, any>[];
  }

  var customArguments: Record<string, any>[]; 
}

// 実際に利用する際に、初期化を行うコード
if (typeof window !== "undefined") {
  window.customArguments = window.customArguments || [];
}


export {};