import React from "react";
import { useToggle } from "../useToggle";

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

export default DescribedCheckbox;
