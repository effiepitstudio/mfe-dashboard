// Encryption/decryption for event bus payload
/* References: 
    https://medium.com/@thomas_40553/how-to-secure-encrypt-and-decrypt-data-within-the-browser-with-aes-gcm-and-pbkdf2-057b839c96b6
    https://github.com/brc-dd/gcmwrap
    https://davidmyers.dev/blog/a-practical-guide-to-the-web-cryptography-api
*/

// AES-GCM encryption via Web Crypto API

const PASSPHRASE = "mfe-shared-secret-2026";
const SALT = new TextEncoder().encode("mde-dashboard-salt");
const ITERATIONS = 100_000;

let cachedKey: CryptoKey | null = null;

async function deriveKey(): Promise<CryptoKey> {
  if (cachedKey) return cachedKey;

  const KeyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(PASSPHRASE),
    "PBKDF2",
    false,
    ["deriveKey"],
  );

  cachedKey = await crypto.subtle.deriveKey(
    { name: "PBKDF2", salt: SALT, iterations: ITERATIONS, hash: "SHA-256" },
    KeyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );

  return cachedKey;
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes.buffer;
}

export class CryptoService {
  // Encrypts a JSOn serializable value, returns base64 encoded ciphertext and iv

  static async encrypt<T>(
    data: T,
  ): Promise<{ ciphertext: string; iv: string }> {
    const key = await deriveKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(JSON.stringify(data));

    const cipherBuffer = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      encoded,
    );

    return {
      ciphertext: arrayBufferToBase64(cipherBuffer),
      iv: arrayBufferToBase64(iv.buffer),
    };
  }

  // decrypts thhe payload encrypted before

  static async decrypt<T>(cipherText: string, iv: string): Promise<T> {
    const key = await deriveKey();
    const cipherBuffer = base64ToArrayBuffer(cipherText);
    const ivBuffer = base64ToArrayBuffer(iv);

    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv: new Uint8Array(ivBuffer) },
      key,
      cipherBuffer,
    );

    const text = new TextDecoder().decode(decrypted);
    return JSON.parse(text) as T;
  }
}
