import { ref, onMounted, onUnmounted } from "vue";
import { EventBus, EVENT_NAMES, CryptoService } from "@shared/index";
import type { FormEntry } from "@shared/src/types";
import type { EncryptedPayload } from "@shared/eventBus";

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
    unsubscribe = EventBus.suscribe(
      EVENT_NAMES.ENTRIES_UPDATED,
      handleEntriesUpdated,
    );
  });

  onUnmounted(() => {
    if (unsubscribe) {
      unsubscribe();
      unsubscribe = null;
    }
  });

  return { entries };
}
