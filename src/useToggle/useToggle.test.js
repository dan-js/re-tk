import { renderHook, act } from "@testing-library/react-hooks";

import { useToggle } from ".";

describe("useToggle()", () => {
    it("uses the default value and toggles correctly", () => {
        const { result } = renderHook(() => useToggle(true));

        expect(result.current[0]).toBe(true);

        act(() => {
            // Toggle
            result.current[1]();
        });

        expect(result.current[0]).toBe(false);

        act(() => {
            // Toggle
            result.current[1]();
        });

        expect(result.current[0]).toBe(true);
    });

    it.each([undefined, "true", 1, "", {}])(
        "throws if an explicit 'initial' boolean isn't passed",
        (initial) => {
            const { result } = renderHook(() => useToggle(initial));

            expect(result.error.message).toBeTruthy();
        }
    );
});
