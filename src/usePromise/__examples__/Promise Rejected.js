import React from "react";
import { usePromise } from "../usePromise";

const failingFetch = () => Promise.reject("Something went wrong!");

const PromiseRejected = () => {
    const [data, error] = usePromise(failingFetch);

    return (
        <article>
            <div>The data is: {data}</div>
            <div>The error is: {error ? error.message : null}</div>
        </article>
    );
};

export default PromiseRejected;
