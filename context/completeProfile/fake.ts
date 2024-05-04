import { useMutation, UseMutationResult } from "react-query";
import axios, { AxiosResponse } from "axios";

interface UsePutRequestOptions<TData, TError> {
  onSuccessNeeded?: boolean;
  successFn?: () => void;
}

interface UsePutRequestResult<TData, TError> {}

export function usePutRequest<TData = unknown, TError = unknown>(
  url: string,
  payload: unknown,
  options?: UsePutRequestOptions<TData, TError>
): UsePutRequestResult<TData, TError> {
  const headers = {
    // Add your headers here
  };

  const { onSuccessNeeded, successFn } = options || {};

  const { mutate, error, isLoading, data, isSuccess } = useMutation<
    TData,
    TError
  >({
    mutationFn: async () => {
      const { data } = await axios.put<TData>(url, payload, { headers });
      return data;
    },
    onSuccess: () => {
      onSuccessNeeded && successFn && successFn();
    },
  });

  return { mutate, error, isLoading, data, isSuccess };
}
