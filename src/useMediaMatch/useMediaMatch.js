import { useState, useEffect } from "react";

/**
 * Return true if the media query matches, or false if the
 * query does not match
 *
 * @param {string} query media query, eg `(min-width: 375px)`
 */
export const useMediaMatch = (query) => {
    const match = window.matchMedia(query);
    const [matches, setMatches] = useState(match.matches);

    useEffect(() => {
        match.addListener((e) => {
            setMatches(e.matches);
        });
    }, [query]);

    return matches;
};
