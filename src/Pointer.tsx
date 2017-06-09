import * as React from "react";

export interface PointerProps {
    haystackIndex: number;
}

let Pointer = ({haystackIndex}: PointerProps) => {
    const pointer = Array(haystackIndex + 2).join(" ") + "^";
    return (
        <samp className="pointer">
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            <span>{pointer}</span>
        </samp>
    );
};

export default Pointer;
