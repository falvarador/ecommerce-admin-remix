import type { Store } from "@prisma/client";

import type { DataError, Either } from "@/core/common/domain";
import type { StoreRepository } from "@/core/store/domain";

export class SaveStoreUseCase {
  private storeRepository: StoreRepository;

  constructor(storeRepository: StoreRepository) {
    this.storeRepository = storeRepository;
  }

  execute(userId: string, name: string): Promise<Either<DataError, Store>> {
    return this.storeRepository.save(userId, name);
  }
}
