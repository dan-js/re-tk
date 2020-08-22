import { useState } from "react";

import { useScreenResize } from "../useScreenResize";

const getDims = () => [window.innerWidth, window.innerHeight];

/**
 * Hook to return an `x` and `y` dimensions tuple when
 * the screen resizes
 *
 * @return {[number, number]}
 */
export const useDimensions = () => {
    const [dims, setDims] = useState(getDims());

    useScreenResize(() => setDims(getDims()));

    return dims;
};
