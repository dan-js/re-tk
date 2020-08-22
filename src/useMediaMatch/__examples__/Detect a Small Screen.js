import React from "react";
import { useMediaMatch } from "../useMediaMatch";

const SmallScreenDetector = () => {
    const isSmallScreen = useMediaMatch("(max-width: 375px)");

    if (isSmallScreen) {
        return <div>This is a small viewport 🔬</div>;
    }

    return <div>This is a large viewport 🔭</div>;
};

export default SmallScreenDetector;
