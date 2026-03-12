import { describe, it, expect, vi, beforeEach } from "vitest";

const mockEncrypt = vi.fn().mockResolvedValue({ ciphertext: "enc", iv: "iv" });
const mockDispatch = vi.fn();
const mockSubscribe = vi.fn();

vi.mock("@shared/src/index", () => ({
  CryptoService: { encrypt: (...args: any[]) => mockEncrypt(...args) },
  EventBus: {
    dispatch: (...args: any[]) => mockDispatch(...args),
    subscribe: (...args: any[]) => mockSubscribe(...args),
  },
  EVENT_NAMES: {
    ENTRIES_UPDATED: "mfe:entries-updated",
    ENTRIES_REQUESTED: "mfe:entries-requested",
  },
}));

import { eventBusSyncMiddleware } from "../store/eventBusSyncMiddleware";
import type { FormEntry } from "@shared/src/types";

const createMockStore = (entries: FormEntry[] = []) => ({
  getState: () => ({ formEntries: { entries } }),
  dispatch: vi.fn(),
});

describe("eventBusSyncMiddleware", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockEncrypt.mockResolvedValue({ ciphertext: "enc", iv: "iv" });
  });

  describe("initialization", () => {
    it("subscribes to ENTRIES_REQUESTED on setup", () => {
      const store = createMockStore();
      const middleware = eventBusSyncMiddleware(store as any);
      expect(mockSubscribe).toHaveBeenCalledWith(
        "mfe:entries-requested",
        expect.any(Function),
      );
    });
  });

  describe("action passthrough", () => {
    it("calls next with the action and returns the result", () => {
      const store = createMockStore();
      const next = vi.fn().mockReturnValue("next-result");
      const action = { type: "test/action" };

      const middleware = eventBusSyncMiddleware(store as any);
      const result = middleware(next)(action);

      expect(next).toHaveBeenCalledWith(action);
      expect(result).toBe("next-result");
    });
  });

  describe("broadcasting", () => {
    it("encrypts and dispatches entries after every action", async () => {
      const entry: FormEntry = {
        id: "1",
        timestamp: "2024-01-01T10:00:00Z",
        name: "Effie",
        country: "GR",
        profession: "Engineer",
        height: 160,
        favoriteColor: "yellow",
        favoriteMovie: "Inception",
      };
      const store = createMockStore([entry]);
      const next = vi.fn();

      const middleware = eventBusSyncMiddleware(store as any);
      middleware(next)({ type: "test/action" });

      expect(mockEncrypt).toHaveBeenCalledWith([entry]);

      await vi.waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith("mfe:entries-updated", {
          ciphertext: "enc",
          iv: "iv",
        });
      });
    });
  });

  describe("ENTRIES_REQUESTED handler", () => {
    it("broadcasts entries when requested", async () => {
      const store = createMockStore();
      eventBusSyncMiddleware(store as any);

      // Get the handler registered with subscribe
      const handler = mockSubscribe.mock.calls[0][1];
      handler();

      expect(mockEncrypt).toHaveBeenCalledWith([]);

      await vi.waitFor(() => {
        expect(mockDispatch).toHaveBeenCalledWith("mfe:entries-updated", {
          ciphertext: "enc",
          iv: "iv",
        });
      });
    });
  });
});
