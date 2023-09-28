import type { Store } from "@prisma/client";

import type { DataError, Either } from "@/core/common/domain";

export interface StoreRepository {
  get(userId: string, storeId: string): Promise<Either<DataError, Store>>;
  getAllByUserId(userId: string): Promise<Either<DataError, Store[]>>;
  getByUserId(userId: string): Promise<Either<DataError, Store>>;
  save(userId: string, name: string): Promise<Either<DataError, Store>>;
}
