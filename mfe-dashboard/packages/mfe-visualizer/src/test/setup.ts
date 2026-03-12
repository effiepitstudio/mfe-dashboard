import "@testing-library/jest-dom";

// Mock Web Crypto for tests

Object.defineProperty(globalThis, "crypto", {
  value: {
    subtle: {
      importKey: async () => ({}) as CryptoKey,
      deriveKey: async () => ({}) as CryptoKey,
      encrypt: async () => new ArrayBuffer(16),
      decrypt: async (_a: any, _k: any, d: ArrayBuffer) => d,
    },
    getRandomValues: (arr: Uint8Array) => {
      for (let i = 0; i < arr.length; i++)
        arr[i] = Math.floor(Math.random() * 256);
      return arr;
    },
  },
});
