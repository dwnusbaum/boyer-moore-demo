import React from "react";

let Pointer = ({haystackIndex}) => {
    const pointer = Array(haystackIndex + 2).join(" ") + "^";
    return (
        <samp className="block pointer">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>{pointer}</span>
        </samp>
    );
};

export default Pointer;
