import type { DataFunctionArgs } from "@remix-run/node";

import type { AuthRepository } from "@/core/auth/domain";
import type { DataError, Either } from "@/core/common/domain";

export class GetUserIdUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  execute(args: DataFunctionArgs): Promise<Either<DataError, string>> {
    return this.authRepository.getUserId(args);
  }
}
