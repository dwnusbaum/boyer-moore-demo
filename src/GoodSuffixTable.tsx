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

    let tableHeader = needleArray.map(function(char, index) {
        return (
            <td key={index}>
                <span style={index === highlightIndex ? highlightStyle : {}}>{char}<sub>{index}</sub></span>
            </td>
        );
    });

    let tableBody = needleArray.map(function(_, index) {
        return (
            <td key={index}>
                <span style={index === highlightIndex ? highlightStyle : {}}>{ruleTable[index]}</span>
            </td>
        );
    });

    return (
        <div className="inline-block">
            <table className="shiftTable">
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
