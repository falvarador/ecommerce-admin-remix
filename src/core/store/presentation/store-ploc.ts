import type { DataError } from "@/core/common/domain";
import { Ploc } from "@/core/common/presentation";
import type { StoreState } from "@/core/store/presentation";
import { storeInitialState } from "@/core/store/presentation";
import type {
  GetStoreByUserIdUseCase,
  GetStoreUseCase,
  SaveStoreUseCase,
} from "@/core/store/domain/usecases";

export class StorePloc extends Ploc<StoreState> {
  constructor(
    private getStoreByUserIdUseCase: GetStoreByUserIdUseCase,
    private getStoreUseCase: GetStoreUseCase,
    private saveStoreUseCase: SaveStoreUseCase
  ) {
    super(storeInitialState);
  }

  async getStoreByUser(userId: string) {
    const result = await this.getStoreByUserIdUseCase.execute(userId);

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (store) =>
        this.changeState({
          store,
          error: storeInitialState.error,
        })
    );
  }

  async getStore(userId: string, storeId: string) {
    const result = await this.getStoreUseCase.execute(userId, storeId);

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (store) =>
        this.changeState({
          store,
          error: storeInitialState.error,
        })
    );
  }

  async saveStore(userId: string, name: string) {
    const result = await this.saveStoreUseCase.execute(userId, name);

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (store) =>
        this.changeState({
          store,
          error: storeInitialState.error,
        })
    );
  }

  private handleError(error: DataError): StoreState {
    switch (error.kind) {
      case "AnonymousUserError": {
        return {
          store: storeInitialState.store,
          error: {
            kind: error.kind,
            error: error.error,
          },
        };
      }
      default: {
        return {
          store: storeInitialState.store,
          error: {
            kind: "UnexpectedError",
            error: "An unexpected error has occurred. Please try again.",
          },
        };
      }
    }
  }
}
