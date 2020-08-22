import { renderHook, act } from "@testing-library/react-hooks";

import { useMediaMatch } from ".";

const mockMedia = (matches, addListener = jest.fn()) => {
    window.matchMedia = jest.fn(() => ({
        matches,
        addListener,
    }));
};

describe("useMediaMatch()", () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    it("returns true if the window media matches", () => {
        mockMedia(true);

        const { result } = renderHook(() =>
            useMediaMatch("(min-width: 375px)")
        );

        expect(result.current).toBe(true);
    });

    it("rerenders if the window media changes", () => {
        mockMedia(true, (callback) =>
            setTimeout(() => callback({ matches: false }), 10)
        );

        const { result } = renderHook(() =>
            useMediaMatch("(min-width: 375px)")
        );

        expect(result.current).toBe(true);

        act(() => {
            jest.advanceTimersByTime(10);
        });

        expect(result.current).toBe(false);
    });
});
