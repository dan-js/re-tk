import { useEffect } from "react";

/**
 * Run a function after a given number of ms, stopping execution
 * if the component rerenders
 *
 * @param {() => void} func function to run after `interval` ms
 * @param {number} interval number of ms to wait before running `func`
 */
export const useTimeout = (func, interval) => {
    useEffect(() => {
        const timeout = setTimeout(func, interval);

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    });
};
