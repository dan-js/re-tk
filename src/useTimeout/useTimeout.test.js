import { renderHook } from "@testing-library/react-hooks";

import { useTimeout } from ".";

describe("useTimeout()", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("runs the callback after the correct interval", () => {
        const onTimeout = jest.fn();

        renderHook(() => useTimeout(onTimeout, 1000));

        jest.advanceTimersByTime(500);

        expect(onTimeout).not.toBeCalled();

        jest.advanceTimersByTime(1000);

        expect(onTimeout).toBeCalledTimes(1);

        jest.advanceTimersByTime(1000);

        expect(onTimeout).toBeCalledTimes(1);
    });

    it("does not run the callback if the component is unmounted", () => {
        const onTimeout = jest.fn();

        const { unmount } = renderHook(() => useTimeout(onTimeout, 1000));

        jest.advanceTimersByTime(500);

        unmount();

        jest.advanceTimersByTime(1000);

        expect(onTimeout).not.toBeCalled();
    });
});
