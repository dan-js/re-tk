import React, { useMemo } from "react";

/**
 * Combine an array of Component / Prop tuples to a single
 * combined wrapper component
 *
 * @param {Array<[React.ComponentType, React.ReactChildren]>} wrappers
 */
export const combine = (wrappers = []) => {
    const CombinedElements = ({ children }) => {
        return useMemo(
            () =>
                wrappers.reverse().reduce((acc, [Component, props]) => {
                    return <Component {...props}>{acc}</Component>;
                }, children),
            [children]
        );
    };

    return CombinedElements;
};
