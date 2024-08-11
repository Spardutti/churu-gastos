export interface ApiResponseBase {
  status: 'ok' | 'error';
}

export type ApiResponse<T, K extends string> = ApiResponseBase & {
  [key in K]?: T;
};

export interface ApiError {
  status: number;
  data: {
    status: string;
    message: string;
    errors?: string;
  };
}
