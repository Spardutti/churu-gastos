import { axiosInstance } from "@/lib/axios/config";
import { AxiosResponse } from "axios";

export const axiosHelper = async <T, P = unknown, D = unknown>({
  method,
  url,
  urlParams,
  data,
}: {
  method: 'get' | 'post' | 'put' | 'delete';
  url: string;
  urlParams?: P;
  data?: D;
}): Promise<T> => {
  return axiosInstance[method]<T>(url, method === 'get' ? { params: urlParams } : data)
    .then((res: AxiosResponse<T>) => res.data);
};