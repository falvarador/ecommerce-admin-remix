interface CommonStoreModalState {
  isOpen: boolean;
}

export type StoreModalState = CommonStoreModalState;

export const storeModalInitialState: StoreModalState = {
  isOpen: false,
};
