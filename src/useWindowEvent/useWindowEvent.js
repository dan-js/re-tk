import { useEffect } from "react";

/**
 * Attach a `handler` to the window for `type` events and
 * remove it on component unmount
 *
 * @param {string} type type of event to listen for
 * @param {(e: Event) => void} handler to handle the event
 */
export const useWindowEvent = (type, handler) => {
    useEffect(() => {
        let _handler = handler;
        window.addEventListener(type, _handler);

        return () => window.removeEventListener(type, _handler);
    });
};
