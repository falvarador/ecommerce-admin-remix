import type { Store } from "@prisma/client";

import type { DataError } from "@/core/common/domain";

export interface CommonStoreState {
  error: DataError | null;
}

export interface SingleStoreState {
  store: Store | null;
}

export interface ManyStoresState {
  stores: Store[];
}

export type StoreState = (SingleStoreState | ManyStoresState) &
  CommonStoreState;

export const storeInitialState: StoreState = {
  store: null,
  stores: [],
  error: null,
};
