import { useState, useMemo } from "react";

/**
 * Run an async function (anything returning a Promise) and return
 * the resolved value, error if any (defaults of null for both), and
 * a `rerun` function to trigger the function to run again
 *
 * @param {() => Promise<any>} p async function to run
 */
export const usePromise = (p) => {
    const [reruns, setReruns] = useState(0);
    const [resolved, setResolved] = useState(null);
    const [rejected, setRejected] = useState(null);

    useMemo(() => {
        p()
            .then((res) => setResolved(res))
            .catch((err) => {
                if (err) {
                    return setRejected(err);
                }

                return setRejected(new Error("[usePromise] Uncaught Promise"));
            });
    }, [reruns]);

    const rerun = () => setReruns(reruns + 1);

    return [resolved, rejected, rerun];
};
