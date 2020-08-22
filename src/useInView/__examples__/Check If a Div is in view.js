import React from "react";
import { useInView } from "../useInView";

const boxStyle = {
    height: "400px",
    width: "500px",
    border: "1px solid black",
    display: "inline-block",
};

const labelStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    background: "blue",
    color: "white",
};

const InViewReporter = () => {
    const [ref, inView] = useInView(false);

    return (
        <>
            <div style={labelStyle}>In View: {`${inView}`}</div>
            <div style={boxStyle} />
            <div style={boxStyle} />
            <div style={boxStyle} />
            <div ref={ref} style={boxStyle}>
                I may or may not be in view 🤔
            </div>
            <div style={boxStyle} />
            <div style={boxStyle} />
            <div style={boxStyle} />
        </>
    );
};

export default InViewReporter;
