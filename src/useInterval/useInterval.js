import { useEffect } from "react";

/**
 * Run a function repeatedly after a given number of ms, stopping execution
 * when the component rerenders
 *
 * @param {() => void} func function to run after `interval` ms
 * @param {number} interval number of ms to wait before running `func`
 */
export const useInterval = (func, interval) => {
    useEffect(() => {
        const timeout = setInterval(func, interval);

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    });
};
