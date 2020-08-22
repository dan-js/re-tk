import { renderHook } from "@testing-library/react-hooks";

import { useInterval } from ".";

describe("useInterval()", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("runs the callback multiple times after the correct intervals", () => {
        const onTimeout = jest.fn();

        renderHook(() => useInterval(onTimeout, 1000));

        jest.advanceTimersByTime(500);

        expect(onTimeout).not.toBeCalled();

        jest.advanceTimersByTime(1000);

        expect(onTimeout).toBeCalledTimes(1);

        jest.advanceTimersByTime(1000);

        expect(onTimeout).toBeCalledTimes(2);

        jest.advanceTimersByTime(3000);

        expect(onTimeout).toBeCalledTimes(5);
    });

    it("stops running the callback when the component is unmounted", () => {
        const onTimeout = jest.fn();

        const { unmount } = renderHook(() => useInterval(onTimeout, 1000));

        jest.advanceTimersByTime(500);

        unmount();

        jest.advanceTimersByTime(1000);

        expect(onTimeout).not.toBeCalled();
    });
});
