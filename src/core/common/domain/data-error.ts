export interface NoError {
  kind: "NoError";
}

export interface UnexpectedError {
  kind: "UnexpectedError";
  error: string;
}

export interface AnonymousUserError {
  kind: "AnonymousUserError";
  error: string;
}

export type DataError = NoError | UnexpectedError | AnonymousUserError;
