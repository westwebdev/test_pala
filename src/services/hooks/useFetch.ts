import { Dispatch, SetStateAction, useState } from "react";

interface FetchDataProps<T> {
    action: string;
    method: string;
    reqBody?: T;
    setData: Dispatch<SetStateAction<any>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setIsError: Dispatch<SetStateAction<boolean>>;
    setErrorMsg: Dispatch<SetStateAction<string | null>>;
  }

const queryUrl = (method: string, action: string) => {
    const url = 'http://localhost:3001/';

    return `${url}${method}?key=${action}`;
}

const fetchData = async <T>({
    action, method, reqBody, setData, setIsLoading, setIsError, setErrorMsg
}: FetchDataProps<T>) =>{
    const delay = 500; // imitation server response delay
    const serverUrl = queryUrl(method, action);

    try {
        let response;

        if (reqBody) {
            response = await fetch(serverUrl, {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: method,
                body: JSON.stringify(reqBody)
            });
        } else {
            response = await fetch(serverUrl);
        }

        const json = await response.json();

        setTimeout(() => {
            setData(json.data);
            setIsError(!json.success);
            setIsLoading(false);
            setErrorMsg(json.errMsg)
        }, delay)
    } catch (error) {
        setTimeout(() => {
            setIsError(true);
            setIsLoading(false);
        }, delay)
    }
}

const useFetch = <T>() => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isError, setIsError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const stateSetters = {
        setData,
        setIsLoading,
        setIsError,
        setErrorMsg,
    }

    const getData = (action: string) => {
        fetchData({
            action,
            method: "get",
            ...stateSetters
        });
    }

    const updateData = (action: string, reqBody: T) => {
        fetchData({
            method: 'put',
            action,
            reqBody,
            ...stateSetters
        });
    }

    return {
        data, setData,
        isLoading, setIsLoading,
        isError, setIsError,
        errorMsg, setErrorMsg,
        getData,
        updateData
    };
}

export default useFetch;
