import * as React from "react";

import { GoodSuffixTable as GoodSuffixTableType, SearchAction } from "./boyerMoore";
import { RuleTableProps } from "./RuleTableProps";

const highlightStyle = {
    color: "blue",
}

let GoodSuffixTable = ({ruleTable, logEntry, haystack, needle}: RuleTableProps<GoodSuffixTableType>): JSX.Element => {
    const needleArray = needle.split("");

    let highlightIndex = -1;
    if (logEntry && logEntry.action === SearchAction.SHIFT) {
        highlightIndex = logEntry.needleIndex;
    }

    let tableHeader = needleArray.map(function(char: string, index: number) {
        return (
            <th key={index}>
                <span style={index === highlightIndex ? highlightStyle : {}}>{char}<sub>{index}</sub></span>
            </th>
        );
    });

    let tableBody = needleArray.map(function(_, index: number) {
        return (
            <td key={index}>
                <span style={index === highlightIndex ? highlightStyle : {}}>{ruleTable[index]}</span>
            </td>
        );
    });

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        {tableHeader}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {tableBody}
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default GoodSuffixTable;
