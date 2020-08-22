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

