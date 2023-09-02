interface CommonStoreModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export type StoreModalState = CommonStoreModalState;
