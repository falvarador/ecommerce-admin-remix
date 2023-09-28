import type { Store } from "@prisma/client";

import type { DataError, Either } from "@/core/common/domain";
import type { StoreRepository } from "@/core/store/domain";

export class GetAllStoresByUserIdUseCase {
  private storeRepository: StoreRepository;

  constructor(storeRepository: StoreRepository) {
    this.storeRepository = storeRepository;
  }

  execute(userId: string): Promise<Either<DataError, Store[]>> {
    return this.storeRepository.getAllByUserId(userId);
  }
}
