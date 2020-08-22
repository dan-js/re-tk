import { renderHook, act } from "@testing-library/react-hooks";

import { useInView } from ".";

describe("useInView()", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it("uses the default inView value", () => {
        const { result } = renderHook(() => useInView(true));

        const [, inView] = result.current;

        expect(inView).toBe(true);
    });

    it("creates an intersection observer that observes the ref'd element", async () => {
        const observe = jest.fn();
        const unobserve = jest.fn();

        const elem = document.createElement("div");

        window.IntersectionObserver = class {
            constructor(cb) {
                setTimeout(
                    () => cb([{ target: elem, isIntersecting: false }]),
                    10
                );

                setTimeout(
                    () => cb([{ target: elem, isIntersecting: true }]),
                    20
                );
            }

            observe = observe;
            unobserve = unobserve;
        };

        const { result, waitForNextUpdate } = renderHook(() => useInView(true));

        const [ref, inView] = result.current;

        expect(inView).toBe(true);

        act(() => {
            ref(elem);
        });

        expect(observe).toBeCalledWith(elem);

        await waitForNextUpdate();

        expect(result.current[1]).toBe(false);

        await waitForNextUpdate();

        expect(result.current[1]).toBe(true);
    });
});
