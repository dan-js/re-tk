import { useState, useEffect } from "react";

/**
 * Return a ref setting function, and true if the ref'd element is in view
 *
 * @param {boolean} defaultInView default value for `isInView`, default of false if none supplied
 * @param {IntersectionObserverInit} observerOpts options for the intersection observer
 * @return {[(e: HTMLElement) => void, boolean]}
 */
export const useInView = (defaultInView = false, observerOpts = {}) => {
    const [target, ref] = useState(null);
    const [isInView, setIsInView] = useState(defaultInView);

    useEffect(() => {
        if (!target) {
            return;
        }

        const observer = new IntersectionObserver(([entry]) => {
            if (entry) {
                setIsInView(entry.isIntersecting);
            }
        }, observerOpts);

        observer.observe(target);

        return () => observer.unobserve(target);
    }, [target]);

    return [ref, isInView];
};
