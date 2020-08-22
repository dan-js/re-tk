# re-tk - hooks and helpers toolbox for common react patterns 🧰

`re-tk` is a collection of lodash-style React helpers (mostly hooks) to make everyday code quicker to write and easier to read.

It can help with common tasks like...

- [data fetching and other async tasks](#usePromise) ⏳
- [running media queries](#useMediaMatch) 🖥
- [checking if an element is in view](#useInView) 🔎

... and many more!


## useInView

Detect wether an element is in view using the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

Pass in a `boolean` as a default value (`false` is used if none is provided), and, optionally, any extra `options` for the created `IntersectionObserver` (see [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)).

Returns a `ref` which should be passed as the `ref` prop to the element you want to observe, and a `boolean` to represent wether or not the element is in view

### Examples


### Check If a Div is in view

```jsx
import { useInView } from 're-tk'

const boxStyle = {
    height: "400px",
    width: "500px",
    border: "1px solid black",
    display: "inline-block",
};

const labelStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    background: "blue",
    color: "white",
};

const InViewReporter = () => {
    const [ref, inView] = useInView(false);

    return (
        <>
            <div style={labelStyle}>In View: {`${inView}`}</div>
            <div style={boxStyle} />
            <div style={boxStyle} />
            <div style={boxStyle} />
            <div ref={ref} style={boxStyle}>
                I may or may not be in view 🤔
            </div>
            <div style={boxStyle} />
            <div style={boxStyle} />
            <div style={boxStyle} />
        </>
    );
};

```



## useMediaMatch

Return true if the media query matches, or false if the query does not match

### Examples


### Detect a Small Screen

```jsx
import { useMediaMatch } from 're-tk'

const SmallScreenDetector = () => {
    const isSmallScreen = useMediaMatch("(max-width: 375px)");

    if (isSmallScreen) {
        return <div>This is a small viewport 🔬</div>;
    }

    return <div>This is a large viewport 🔭</div>;
};

```



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


## useToggle

Simple `useState`-style hook for a `boolean` toggle, great for closable popups and checkboxes.

### Examples


### Checkbox

```jsx
import { useToggle } from 're-tk'

const DescribedCheckbox = () => {
    const [isToggled, toggle] = useToggle(false);

    return (
        <>
            <input
                type="checkbox"
                checked={isToggled}
                onChange={() => toggle()}
            />
            <div>{isToggled ? "Toggled! ✅" : "Not Toggled! ❌"}</div>
        </>
    );
};

```

