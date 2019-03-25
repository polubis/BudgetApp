export type GraphQlBody<T> = {
  query: string;
  variables?: T
}

export type GrapQlResponse = {
  errors: GrapQlError[];
  data: any;
}

export type GrapQlError = {
  message: string;
  statusCode: number;
}