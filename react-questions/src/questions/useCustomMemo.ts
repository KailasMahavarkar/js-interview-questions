/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef } from "react";

function useCustomMemo(fn: (...args: any[]) => any) {
    const cache = useRef<{ [key: string]: any }>({});

    function inner(...props: any[]) {
        const depsString = JSON.stringify(props);

        if (depsString in cache.current) {
            return cache.current[depsString];
        } else {
            const result = fn(...props);
            cache.current[depsString] = result; // Cache the result
            return result;
        }
    }

    return inner;
}

export default useCustomMemo;
