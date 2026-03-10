// Subscribes and publishes custom events. Custom events tranverse the DOM and are framework agnostic
//Inspired by https://dev.to/florianrappl/communication-between-micro-frontends-41fe

export const EVENT_NAMES = {
  //ENTRIES_UPDATED: "mfe:entries-updated",
  ENTRY_ADDED: "mfe:entry-added",
  //ENTRIES_CLEAR: "mfe:entries-clear",
} as const;

export type EventName = (typeof EVENT_NAMES)[keyof typeof EVENT_NAMES];

// https://medium.com/@thomas_40553/how-to-secure-encrypt-and-decrypt-data-within-the-browser-with-aes-gcm-and-pbkdf2-057b839c96b6
export interface EncryptedPayload {
  ciphertext: string;
  iv: string;
}

export class EventBus {
  // Dispatches an encrypted event on the window
  // param EventName: one of EVENT_NAMES
  // param payload: encrypted Payload

  static dispatch(EventName: EventName, payload: EncryptedPayload): void {
    const event = new CustomEvent(EventName, {
      detail: payload,
      bubbles: false,
      cancelable: false,
    });

    window.dispatchEvent(event);
  }

  static subscribe(
    eventName: EventName,
    handler: (payload: EncryptedPayload) => void,
  ): () => void {
    const listener = (event: Event) => {
      const customEvent = event as CustomEvent<EncryptedPayload>;
      handler(customEvent.detail);
    };
    window.addEventListener(eventName, listener);
    return () => window.removeEventListener(eventName, listener);
  }
}
