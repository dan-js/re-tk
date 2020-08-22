## useInView

Detect wether an element is in view using the [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API).

Pass in a `boolean` as a default value (`false` is used if none is provided), and, optionally, any extra `options` for the created `IntersectionObserver` (see [here](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options)).

Returns a `ref` which should be passed as the `ref` prop to the element you want to observe, and a `boolean` to represent wether or not the element is in view

### Examples

-example- Check If a Div is in view -example-

