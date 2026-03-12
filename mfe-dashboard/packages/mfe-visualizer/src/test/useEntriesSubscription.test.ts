import { describe, it, expect, vi, beforeEach } from "vitest";
import { shallowMount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { useEntriesSubscription } from "../composables/useEntriesSubscription";
import type { FormEntry } from "@shared/src/types";
import type { EncryptedPayload } from "@shared/src/eventBus";

// Mock EventBus and CryptoService
const mockUnsubscribe = vi.fn();
const mockSubscribe = vi.fn().mockReturnValue(mockUnsubscribe);
const mockDispatch = vi.fn();
const mockDecrypt = vi.fn();

vi.mock("@shared/src/index", () => ({
  EventBus: {
    subscribe: (...args: any[]) => mockSubscribe(...args),
    dispatch: (...args: any[]) => mockDispatch(...args),
  },
  EVENT_NAMES: {
    ENTRIES_UPDATED: "mfe:entries-updated",
    ENTRY_ADDED: "mfe:entry-added",
    ENTRIES_REQUESTED: "mfe:entries-requested",
  },
  CryptoService: {
    decrypt: (...args: any[]) => mockDecrypt(...args),
  },
}));

const TestComponent = defineComponent({
  setup() {
    const { entries } = useEntriesSubscription();
    return { entries };
  },
  template: "<div />",
});

const sampleEntries: FormEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-01T10:00:00Z",
    name: "Effie",
    country: "Greece",
    profession: "Engineer",
    height: 160,
    favoriteColor: "yellow",
    favoriteMovie: "Inception",
  },
  {
    id: "2",
    timestamp: "2024-01-02T10:00:00Z",
    name: "Sevi",
    country: "Cyprus",
    profession: "Designer",
    height: 168,
    favoriteColor: "green",
    favoriteMovie: "La la land",
  },
];

describe("useEntriesSubscription", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSubscribe.mockReturnValue(mockUnsubscribe);
  });

  describe("initial state", () => {
    it("should return an entries ref initialized as empty array", () => {
      const wrapper = shallowMount(TestComponent);

      expect(wrapper.vm.entries).toEqual([]);

      wrapper.unmount();
    });
  });

  describe("onMounted", () => {
    it("should subscribe to ENTRIES_UPDATED event", () => {
      const wrapper = shallowMount(TestComponent);

      expect(mockSubscribe).toHaveBeenCalledWith(
        "mfe:entries-updated",
        expect.any(Function),
      );

      wrapper.unmount();
    });

    it("should dispatch ENTRIES_REQUESTED event", () => {
      const wrapper = shallowMount(TestComponent);

      expect(mockDispatch).toHaveBeenCalledWith("mfe:entries-requested", {
        ciphertext: "",
        iv: "",
      });

      wrapper.unmount();
    });
  });

  describe("onUnmounted", () => {
    it("should call unsubscribe when component unmounts", () => {
      const wrapper = shallowMount(TestComponent);
      wrapper.unmount();

      expect(mockUnsubscribe).toHaveBeenCalled();
    });
  });

  describe("handleEntriesUpdated", () => {
    it("should decrypt payload and update entries", async () => {
      mockDecrypt.mockResolvedValue(sampleEntries);

      const wrapper = shallowMount(TestComponent);

      const handler = mockSubscribe.mock.calls[0][1] as (
        payload: EncryptedPayload,
      ) => Promise<void>;

      await handler({ ciphertext: "encrypted-data", iv: "test-iv" });

      expect(mockDecrypt).toHaveBeenCalledWith("encrypted-data", "test-iv");
      expect(wrapper.vm.entries).toEqual(sampleEntries);

      wrapper.unmount();
    });

    it("should handle decryption errors gracefully", async () => {
      const consoleError = vi
        .spyOn(console, "error")
        .mockImplementation(() => {});
      mockDecrypt.mockRejectedValue(new Error("Decryption failed"));

      const wrapper = shallowMount(TestComponent);

      const handler = mockSubscribe.mock.calls[0][1] as (
        payload: EncryptedPayload,
      ) => Promise<void>;

      await handler({ ciphertext: "bad-data", iv: "bad-iv" });

      expect(wrapper.vm.entries).toEqual([]);
      expect(consoleError).toHaveBeenCalledWith(
        "MFE-Visualizer: Failed to decrypt entries: ",
        expect.any(Error),
      );

      consoleError.mockRestore();
      wrapper.unmount();
    });

    it("should update entries on subsequent payloads", async () => {
      const firstBatch = [sampleEntries[0]];
      const secondBatch = sampleEntries;

      mockDecrypt
        .mockResolvedValueOnce(firstBatch)
        .mockResolvedValueOnce(secondBatch);

      const wrapper = shallowMount(TestComponent);

      const handler = mockSubscribe.mock.calls[0][1] as (
        payload: EncryptedPayload,
      ) => Promise<void>;

      await handler({ ciphertext: "first", iv: "iv1" });
      expect(wrapper.vm.entries).toEqual(firstBatch);

      await handler({ ciphertext: "second", iv: "iv2" });
      expect(wrapper.vm.entries).toEqual(secondBatch);

      wrapper.unmount();
    });
  });
});
