import React from "react";
import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { combine } from ".";

describe("combine()", () => {
    it("renders the correct tree", () => {
        const Combined = combine([
            ["div", { "data-testid": "c1" }],
            ["article", { "data-testid": "c2" }],
            ["span", { "data-testid": "c3" }],
        ]);

        const { baseElement } = render(<Combined>innermost!</Combined>);

        expect(screen.getByTestId("c1")).toBeInTheDocument();
        expect(screen.getByTestId("c2")).toBeInTheDocument();
        expect(screen.getByTestId("c3")).toBeInTheDocument();

        expect(screen.getByTestId("c3")).toHaveTextContent("innermost!");

        expect(baseElement.innerHTML).toMatchSnapshot();
    });

    it("renders the correct tree with functional components", () => {
        // eslint-disable-next-line react/prop-types
        const Wrap = ({ testid, children }) => {
            return <div data-testid={testid}>{children}</div>;
        };

        const Combined = combine([
            [Wrap, { testid: "c1" }],
            [Wrap, { testid: "c2" }],
            [Wrap, { testid: "c3" }],
        ]);

        const { baseElement } = render(<Combined>innermost!</Combined>);

        expect(screen.getByTestId("c1")).toBeInTheDocument();
        expect(screen.getByTestId("c2")).toBeInTheDocument();
        expect(screen.getByTestId("c3")).toBeInTheDocument();

        expect(screen.getByTestId("c3")).toHaveTextContent("innermost!");

        expect(baseElement.innerHTML).toMatchSnapshot();
    });
});
