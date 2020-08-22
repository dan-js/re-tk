import React from "react";
import { usePromise } from "../usePromise";

const fetchTodo = () =>
    fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
        res.json()
    );

const FetchingData = () => {
    const [data, error, rerun] = usePromise(fetchTodo);

    return (
        <article>
            <div>The data is: {JSON.stringify(data, null, 2)}</div>
            <div>The error is: {error}</div>
            <button onClick={rerun}>Click me to run the request again!</button>
        </article>
    );
};

export default FetchingData;
