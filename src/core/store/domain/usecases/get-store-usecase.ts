import type { DataFunctionArgs } from "@remix-run/node";
import type { Store } from "@prisma/client";

import { Either, EitherAsync } from "@/core/common/domain";
import type { AuthRepository } from "@/core/auth/domain";
import type { DataError } from "@/core/common/domain";
import type { StoreRepository } from "@/core/store/domain";

export class GetStoreUseCase {
  private authRepository: AuthRepository;
  private storeRepository: StoreRepository;

  constructor(
    authRepository: AuthRepository,
    storeRepository: StoreRepository
  ) {
    this.authRepository = authRepository;
    this.storeRepository = storeRepository;
  }

  execute(
    storeId: string,
    args: DataFunctionArgs
  ): Promise<Either<DataError, Store>> {
    const userIdResult = EitherAsync.fromPromise(
      this.authRepository.getUserId(args)
    );

    return userIdResult
      .flatMap(async (userId) => {
        if (!userId) {
          return Either.left<DataError, Store>({
            kind: "AnonymousUserError",
            error: "Sorry, you must be logged in to access this feature.",
          });
        }
        return this.storeRepository.get(userId, storeId);
      })
      .run();
  }
}
