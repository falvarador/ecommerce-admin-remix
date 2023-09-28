import type { DataError } from "@/core/common/domain";

export abstract class BaseService {
  private data: unknown | null = null;
  private error: DataError | null = null;

  protected getData<S>() {
    return this.data as S;
  }

  protected getError() {
    return this.error;
  }

  protected handleData<S>(data: S) {
    this.data = data;
  }

  protected handleError(error: DataError) {
    this.error = error;
  }
}
