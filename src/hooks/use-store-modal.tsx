import { create } from "zustand";

import type { StoreModalState } from "@/core/store/presentation";

export const useStoreModal = create<StoreModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
