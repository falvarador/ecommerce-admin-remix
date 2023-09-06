import type { DataFunctionArgs } from "@remix-run/node";

import type { AuthRepository } from "@/core/auth/domain";
import { type DataError, Either } from "@/core/common/domain";

export class GetUserIdUseCase {
  private authRepository: AuthRepository;

  constructor(authRepository: AuthRepository) {
    this.authRepository = authRepository;
  }

  execute(args: DataFunctionArgs): Promise<Either<DataError, string>> {
    const userId = this.authRepository.getUserId(args);

    if (!userId) {
      Either.left<DataError, string>({
        kind: "AnonymousUserError",
        error: "Sorry, you must be logged in to access this feature.",
      });
    }

    return userId;
  }
}
