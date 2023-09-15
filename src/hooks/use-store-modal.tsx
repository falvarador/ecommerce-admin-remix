// import { create } from "zustand";

import { createPloc } from "@/hooks";
import { dependenciesLocator } from "@/core/common/dependencies";
import type {
  StoreModalPloc,
  StoreModalState,
} from "@/core/store/presentation";

// export const useStoreModal = create<StoreModalState>((set) => ({
//   isOpen: false,
//   onOpen: () => set({ isOpen: true }),
//   onClose: () => set({ isOpen: false }),
// }));

export const useStoreModal = () => {
  const ploc = dependenciesLocator.storeModalPloc();
  const set = createPloc<StoreModalState>(ploc);

  return {
    isOpen: set.useSelector((state) => state.isOpen),
    onOpen: set.useSelector((state, ploc) => {
      const currentPloc = ploc as StoreModalPloc;
      return currentPloc.openModal;
    }),
    onClose: set.useSelector((state, ploc) => {
      const currentPloc = ploc as StoreModalPloc;
      return currentPloc.closeModal;
    }),
  };
};
