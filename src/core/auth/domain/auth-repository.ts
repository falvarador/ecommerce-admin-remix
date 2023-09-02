import type { DataFunctionArgs } from "@remix-run/node";

import type { DataError, Either } from "@/core/common/domain";

export interface AuthRepository {
  getUserId(args: DataFunctionArgs): Promise<Either<DataError, string>>;
}
