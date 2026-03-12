import { ref, onMounted, onUnmounted } from "vue";
import { EventBus, EVENT_NAMES, CryptoService } from "@shared/src/index";
import type { FormEntry } from "@shared/src/types";
import type { EncryptedPayload } from "@shared/src/eventBus";

export function useEntriesSubscription() {
  const entries = ref<FormEntry[]>([]);
  let unsubscribe: (() => void) | null = null;

  const handleEntriesUpdated = async (
    payload: EncryptedPayload,
  ): Promise<void> => {
    try {
      const decryptedEntries = await CryptoService.decrypt<FormEntry[]>(
        payload.ciphertext,
        payload.iv,
      );
      entries.value = decryptedEntries;
    } catch (decryptionError) {
      console.error(
        "MFE-Visualizer: Failed to decrypt entries: ",
        decryptionError,
      );
    }
  };

  onMounted(() => {
    unsubscribe = EventBus.subscribe(
      EVENT_NAMES.ENTRIES_UPDATED,
      handleEntriesUpdated,
    );

    EventBus.dispatch(EVENT_NAMES.ENTRIES_REQUESTED, {
      ciphertext: "",
      iv: "",
    });
  });

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

  return { entries };
}
