import { getAuth } from "@clerk/remix/ssr.server";

import { Either } from "@/core/common/domain";
import type { AuthRepository } from "@/core/auth/domain";
import type { DataError } from "@/core/common/domain";
import type { DataFunctionArgs } from "@remix-run/node";

export class AuthClerkRepository implements AuthRepository {
  getUserId(args: DataFunctionArgs): Promise<Either<DataError, string>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const { userId } = await getAuth(args);
        resolve(Either.right(userId as string));
      } catch (error) {
        resolve(Either.left({ kind: "UnexpectedError", error } as DataError));
      }
    });
  }
}
