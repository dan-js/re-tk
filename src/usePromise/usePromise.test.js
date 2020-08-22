import { renderHook, act } from "@testing-library/react-hooks";

import { usePromise } from ".";

const success = () =>
    new Promise((resolve) => {
        setTimeout(() => resolve("done!"), 10);
    });

const failure = () =>
    new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Oh no!")), 10);
    });

describe("usePromise()", () => {
    it("returns the promise result and error as null if successful", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            usePromise(success)
        );

        expect(result.current).toEqual([null, null, expect.any(Function)]);

        await waitForNextUpdate();

        expect(result.current).toEqual(["done!", null, expect.any(Function)]);
    });

    it("returns null and the error if unsuccessful", async () => {
        const { result, waitForNextUpdate } = renderHook(() =>
            usePromise(failure)
        );

        expect(result.current).toEqual([null, null, expect.any(Function)]);

        await waitForNextUpdate();

        expect(result.current).toEqual([
            null,
            expect.objectContaining({ message: "Oh no!" }),
            expect.any(Function),
        ]);
    });

    it("does not rerun if not manually triggered", async () => {
        const mockPromiseRunner = jest
            .fn()
            .mockImplementation(async () => ({ hello: "there" }));

        const { result, waitForNextUpdate, rerender } = renderHook(() =>
            usePromise(mockPromiseRunner)
        );

        await waitForNextUpdate();

        const [firstResult] = result.current;

        rerender();
        rerender();
        rerender();

        expect(mockPromiseRunner).toBeCalledTimes(1);

        const [secondResult] = result.current;

        // Check object identity
        expect(secondResult).toBe(firstResult);
    });

    it("reruns when manually triggered", async () => {
        const mockPromiseRunner = jest
            .fn()
            .mockImplementation(async () => ({ hello: "there" }));

        const { result, waitForNextUpdate } = renderHook(() =>
            usePromise(mockPromiseRunner)
        );

        await waitForNextUpdate();

        const [firstResult, , rerun] = result.current;

        expect(mockPromiseRunner).toBeCalledTimes(1);

        expect(firstResult).toEqual({ hello: "there" });

        act(() => {
            rerun();
        });

        await waitForNextUpdate();

        expect(mockPromiseRunner).toBeCalledTimes(2);

        const [secondResult] = result.current;

        expect(secondResult).toEqual({ hello: "there" });

        expect(secondResult).not.toBe(firstResult);
    });
});
