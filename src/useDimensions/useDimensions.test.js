import { renderHook, act } from "@testing-library/react-hooks";

import { useDimensions } from ".";

const resizeWindow = ({ width, height }) => {
    window.innerWidth = width;
    window.innerHeight = height;

    return {
        withEvent: () => window.dispatchEvent(new Event("resize")),
    };
};

describe("useDimensions()", () => {
    it("fires when the screen resizes", () => {
        resizeWindow({
            width: 1000,
            height: 1100,
        });

        const { result } = renderHook(() => useDimensions());

        expect(result.current).toEqual([1000, 1100]);

        act(() => {
            resizeWindow({
                width: 1200,
                height: 1300,
            }).withEvent();
        });

        expect(result.current).toEqual([1200, 1300]);

        act(() => {
            resizeWindow({
                width: 1400,
                height: 1500,
            }).withEvent();
        });

        expect(result.current).toEqual([1400, 1500]);
    });
});
