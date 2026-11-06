import * as React from "react";

import { Algorithm } from "./boyerMoore";

export interface AlgorithmSelectProps {
    algorithm: Algorithm;
    onAlgorithmChange: (algorithm: Algorithm) => void;
}

let AlgorithmSelect = ({algorithm, onAlgorithmChange}: AlgorithmSelectProps) => {
    return (
        <div>
            <label htmlFor="algorithmSelect">Algorithm</label>
            <select
                id="algorithmSelect"
                value={algorithm}
                onChange={(event) => onAlgorithmChange(Number(event.currentTarget.value))}
            >
                <option value={Algorithm.BOYER_MOORE}>Boyer-Moore</option>
                <option value={Algorithm.HORSPOOL}>Boyer-Moore-Horspool</option>
            </select>
        </div>
    );
};

export default AlgorithmSelect;
