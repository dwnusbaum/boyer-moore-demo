import * as React from "react";

import { SearchLogEntry } from "./boyerMoore";

export interface SearchInfoProps {
    logEntry: SearchLogEntry;
    haystack: string;
    needle: string;
}

let SearchInfo = ({logEntry, haystack, needle}: SearchInfoProps): JSX.Element => {
    const haystackIndex = logEntry.haystackIndex;
    const needleIndex = logEntry.needleIndex;
    const comparisons = logEntry.comparisons;

    return (
        <div className="flex-row flex-wrap">
            <div className="flex-row-item">
                Haystack index: {haystackIndex}/{haystack.length - 1}
            </div>
            <div className="flex-row-item">
                Needle index: {needleIndex}/{needle.length - 1}
            </div>
            <div className="flex-row-item">
                Total Comparisons: {comparisons}
            </div>
        </div>
    );
};

export default SearchInfo;
