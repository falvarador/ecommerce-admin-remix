import type { Store } from "@prisma/client";

import { BaseService } from "@/core/common/presentation";
import type {
  GetAllStoresByUserIdUseCase,
  GetStoreByUserIdUseCase,
  GetStoreUseCase,
  SaveStoreUseCase,
} from "@/core/store/domain/usecases";

export class StoreService extends BaseService {
  constructor(
    private getAllStoresByUserIdUseCase: GetAllStoresByUserIdUseCase,
    private getStoreByUserIdUseCase: GetStoreByUserIdUseCase,
    private getStoreUseCase: GetStoreUseCase,
    private saveStoreUseCase: SaveStoreUseCase
  ) {
    super();
  }

  async getStoreByUser(userId: string) {
    const result = await this.getStoreByUserIdUseCase.execute(userId);
    result.fold(
      (error) => this.handleError(error),
      (store) => this.handleData(store)
    );

    return {
      store: this.getData<Store>(),
      error: this.getError(),
    };
  }

  async getAllStoresByUser(userId: string) {
    const result = await this.getAllStoresByUserIdUseCase.execute(userId);
    result.fold(
      (error) => this.handleError(error),
      (stores) => this.handleData(stores)
    );

    return {
      stores: this.getData<Store[]>(),
      error: this.getError(),
    };
  }

  async getStore(userId: string, storeId: string) {
    const result = await this.getStoreUseCase.execute(userId, storeId);
    result.fold(
      (error) => this.handleError(error),
      (store) => this.handleData(store)
    );

    return {
      store: this.getData<Store>(),
      error: this.getError(),
    };
  }

  async saveStore(userId: string, name: string) {
    const result = await this.saveStoreUseCase.execute(userId, name);
    result.fold(
      (error) => this.handleError(error),
      (store) => this.handleData(store)
    );

    return {
      store: this.getData<Store>(),
      error: this.getError(),
    };
  }
}
