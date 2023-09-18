import { create } from "zustand";

import type { StoreModalState } from "@/core/store/presentation";

export const useStoreModal = create<StoreModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

// const state = createState<StoreModalState>();
// state.init({ isOpen: false, onOpen: () => {}, onClose: () => {} });

// export const useStoreModal = {
//   isOpen: state.useSelector((state) => state).isOpen,
//   onOpen: () => state.setState((state) => ({ ...state, isOpen: true })),
//   onClose: () => state.setState((state) => ({ ...state, isOpen: false })),
// };
