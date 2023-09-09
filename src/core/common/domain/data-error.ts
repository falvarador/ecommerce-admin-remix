export interface NoError {
  kind: "NoError";
}

export interface UnexpectedError {
  kind: "UnexpectedError";
  error: string;
}

export type DataError = NoError | UnexpectedError;
