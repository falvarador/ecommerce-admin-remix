import type { Store } from "@prisma/client";

import type { DataError } from "@/core/common/domain";

export interface CommonStoreState {
  store: Store | null;
  error: DataError | null;
}

export type StoreState = CommonStoreState;

export const storeInitialState: StoreState = {
  store: null,
  error: null,
};
