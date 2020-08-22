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


