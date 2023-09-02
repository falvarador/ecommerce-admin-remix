import type { DataFunctionArgs } from "@remix-run/node";

import { authInitialState, type AuthState } from "@/core/auth/presentation";
import { Ploc } from "@/core/common/presentation";
import type { DataError } from "@/core/common/domain";
import type { GetUserIdUseCase } from "@/core/auth/domain/usecases";

export class AuthPloc extends Ploc<AuthState> {
  constructor(private getUserIdUseCase: GetUserIdUseCase) {
    super(authInitialState);
  }

  async getUserId(args: DataFunctionArgs) {
    const result = await this.getUserIdUseCase.execute(args);

    result.fold(
      (error) => this.changeState(this.handleError(error)),
      (userId) =>
        this.changeState({
          userId,
          error: authInitialState.error,
        })
    );
  }

  private handleError(error: DataError): AuthState {
    switch (error.kind) {
      default: {
        return {
          userId: authInitialState.userId,
          error: {
            kind: "UnexpectedError",
            error: "An unexpected error has occurred. Please try again.",
          },
        };
      }
    }
  }
}
