import {useMutation, useQuery} from "@tanstack/react-query";
import Cookies from "universal-cookie";
import axios from "axios";

const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
    "Content-Type": "application/json",
    "X-API-KEY": process.env.NEXT_PUBLIC_API_KEY,
    "x-access-token": token
}

// Put
export function usePutRequest(url, payload, onSuccessNeeded, successFn) {
    const {mutate, error, isPending, data, isSuccess} = useMutation({
        mutationFn: async () => {
            const { data } = await axios.put(
                url,
                payload,
                {
                    headers: headers
                }
            );
            return data;
        },
        onSuccess: () => {
            onSuccessNeeded && successFn();
        }
    });
    return {mutate, error, isPending, data, isSuccess}
}

// Get
export function useGetRequest(url) {
    const {data, error} = useQuery({
        queryKey: ["services"],
        queryFn: async () => {
            const { data } = await axios.get(
                url,
                {
                    headers: headers
                }
            );
            return data;
        }
    });
    return {data, error}
}

// Post
export function usePostRequest(url, payload, onSuccessNeeded, successFn) {
    const {mutate, error, isPending, data, isSuccess} = useMutation({
        mutationFn: async () => {
            const { data } = await axios.post(
                url,
                payload,
                {
                    headers: headers
                }
            );
            return data;
        },
        onSuccess: () => {
            onSuccessNeeded && successFn();
        }
    });
    return {postFn: mutate, requestError: error, requestPending: isPending, responseData: data, requestSuccess: isSuccess}
}