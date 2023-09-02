import prismadb from "@/core/lib/prismadb";
import type { Store } from "@prisma/client";

import { Either } from "@/core/common/domain";
import type { DataError } from "@/core/common/domain";
import type { StoreRepository } from "@/core/store/domain";

export class StorePrismaRepository implements StoreRepository {
  get(userId: string, storeId: string): Promise<Either<DataError, Store>> {
    return new Promise((resolve, _reject) => {
      setTimeout(async () => {
        try {
          const store = await prismadb.store.findUnique({
            where: {
              id: storeId,
              userId,
            },
          });

          resolve(Either.right(store as Store));
        } catch (error) {
          resolve(Either.left({ kind: "UnexpectedError", error } as DataError));
        }
      }, 100);
    });
  }

  getByUserId(userId: string): Promise<Either<DataError, Store>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const store = await prismadb.store.findFirst({
          where: {
            userId,
          },
        });

        resolve(Either.right(store as Store));
      } catch (error) {
        resolve(Either.left({ kind: "UnexpectedError", error } as DataError));
      }
    });
  }

  save(userId: string, name: string): Promise<Either<DataError, Store>> {
    return new Promise(async (resolve, _reject) => {
      try {
        const store = await prismadb.store.create({
          data: {
            name,
            userId,
          },
        });

        resolve(Either.right(store));
      } catch (error) {
        resolve(Either.left({ kind: "UnexpectedError", error } as DataError));
      }
    });
  }
}
