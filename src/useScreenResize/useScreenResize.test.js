import { renderHook, act } from "@testing-library/react-hooks";

import { useScreenResize } from ".";

describe("useScreenResize()", () => {
    it("fires when the screen resizes", () => {
        const onResize = jest.fn();

        renderHook(() => useScreenResize(onResize));

        act(() => {
            window.dispatchEvent(new Event("resize"));
            window.dispatchEvent(new Event("resize"));
            window.dispatchEvent(new Event("resize"));
        });

        expect(onResize).toBeCalledTimes(3);
        expect(onResize).toBeCalledWith(expect.any(Event));
    });

    it("still fires when the screen resizes after rerenders", () => {
        const onResize = jest.fn();

        const { rerender } = renderHook(() => useScreenResize(onResize));

        act(() => {
            window.dispatchEvent(new Event("resize"));
            window.dispatchEvent(new Event("resize"));
            window.dispatchEvent(new Event("resize"));
        });

        rerender({ children: "ello" });

        act(() => {
            window.dispatchEvent(new Event("resize"));
        });

        expect(onResize).toBeCalledTimes(4);
    });
});
