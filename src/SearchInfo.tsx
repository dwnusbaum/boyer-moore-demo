import * as React from "react";

import { SearchLog } from "./boyerMoore";

export interface SearchInfoProps {
    action: SearchLog;
    haystack: string;
    needle: string;
}

let SearchInfo = ({action, haystack, needle}: SearchInfoProps): JSX.Element => {
    const haystackIndex = action.haystackIndex;
    const needleIndex = action.needleIndex;
    const comparisons = action.comparisons;

    return (
        <div>
            <div>
                Text index: {haystackIndex}/{haystack.length - 1}
            </div>
            <div>
                Pattern index: {needleIndex}/{needle.length - 1}
            </div>
            <hr />
            <div>
                Total Comparisons: {comparisons}
            </div>

        </div>
    );
};

export default SearchInfo;
