import { useWindowEvent } from "../useWindowEvent";

/**
 * Hook to run a handler function on screen resize
 *
 * @param {(event: Event) => void} handler function to run when screen resizes
 */
export const useScreenResize = (handler) => useWindowEvent("resize", handler);
