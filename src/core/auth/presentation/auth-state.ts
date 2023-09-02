import type { DataError } from "@/core/common/domain";

export interface CommonAuthState {
  userId: string;
  error: DataError;
}

export type AuthState = CommonAuthState;

export const authInitialState: AuthState = {
  userId: "",
  error: {
    kind: "NoError",
  },
};
