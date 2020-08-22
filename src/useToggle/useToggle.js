import { useState, useMemo } from "react";

/**
 * State hook for a boolean toggle, returning
 * a tuple of `true` or `false` and a function
 * to toggle the value
 *
 * @param {boolean} initial optional initial value
 * @return {[boolean, () => void]}
 */
export const useToggle = (initial) => {
    useMemo(() => {
        if (typeof initial !== "boolean") {
            throw new Error(
                `[useToggle] Initial value should be a boolean, got "${initial}"`
            );
        }
    }, [initial]);

    const [isToggled, setIsToggled] = useState(initial);

    const toggle = () => setIsToggled(!isToggled);

    return [isToggled, toggle];
};
