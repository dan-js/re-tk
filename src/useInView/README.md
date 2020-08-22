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


