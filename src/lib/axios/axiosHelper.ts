import camelcaseKeys from 'camelcase-keys';
import { axiosInstance } from '@/lib/axios/config';
import type { AxiosResponse } from 'axios';

const toCamelCase = (data: unknown): unknown => {
  if (typeof data === 'object' && data !== null) {
    return camelcaseKeys(data as Record<string, unknown>, { deep: true });
  }
  return data;
};

export const axiosHelper = async <T, P = unknown, D = unknown>({
  method,
  url,
  urlParams,
  data,
}: {
  method: 'get' | 'post' | 'put' | 'delete' | 'patch';
  url: string;
  urlParams?: P;
  data?: D;
}): Promise<T> => {
  return axiosInstance[method]<T>(url, method === 'get' ? { params: urlParams } : data)
    .then((res: AxiosResponse<T>) => {
      return toCamelCase(res.data) as T;
    })
    .catch((err) => {
      if (err.response?.data?.errors) {
        throw new Error(JSON.stringify(err.response.data.errors));
      } else if (err.response?.data?.error) {
        throw new Error(JSON.stringify(err.response.data.error));
      } else {
        throw err;
      }
    });
};
