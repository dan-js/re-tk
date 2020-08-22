## usePromise 

Run an async function (anything returning a Promise) and return the resolved value, error if any (defaults of null for both), and a `rerun` function to trigger the function to run again

### Examples


### Fetching Data

```jsx
import { usePromise } from 're-tk'

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

```



### Promise Rejected

```jsx
import { usePromise } from 're-tk'

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

```

