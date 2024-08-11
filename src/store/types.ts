export interface ApiResponseBase {
  status: 'ok' | 'error';
  errors?: string[];
}

export type ApiResponse<T, K extends string> = ApiResponseBase & {
  [key in K]?: T;
};
