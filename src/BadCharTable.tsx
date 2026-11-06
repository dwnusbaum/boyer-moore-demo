import * as React from "react";

import {
    Algorithm,
    BadCharTable as BadCharTableType,
    getAlignmentEnd,
    SearchAction,
} from "./boyerMoore";
import { RuleTableProps } from "./RuleTableProps";

const highlightStyle = {
    color: "blue",
}

export interface BadCharTableProps extends RuleTableProps<BadCharTableType> {
    algorithm?: Algorithm;
}

let BadCharTable = ({ruleTable, logEntry, haystack, needle, algorithm}: BadCharTableProps) => {
    let needleSet = new Set(needle.split(""));
    // Add a dummy element that is not in the needle array to show the shift
    // amount for characters not in the needle.
    needleSet.add("other");

    let highlightChar = "";
    if (logEntry && logEntry.action === SearchAction.SHIFT) {
        // Horspool looks up the haystack character aligned with the end of
        // the needle rather than the mismatched character.
        const lookupIndex = algorithm === Algorithm.HORSPOOL
            ? getAlignmentEnd(needle, logEntry.haystackIndex, logEntry.needleIndex)
            : logEntry.haystackIndex;
        const haystackChar = haystack.charAt(lookupIndex);
        if (needleSet.has(haystackChar)) {
            highlightChar = haystackChar;
        } else {
            highlightChar = "other";
        }
    }

    let tableHeader: JSX.Element[] = [];
    needleSet.forEach(function(char: string, index: string) {
        tableHeader.push(
            <th key={index}>
                <span style={char === highlightChar ? highlightStyle : {}}>
                    {char}
                </span>
            </th>
        );
    });

    let tableBody: JSX.Element[] = [];
    needleSet.forEach(function(char: string, index: string) {
        tableBody.push(
            <td key={index}>
                <span style={char === highlightChar ? highlightStyle : {}}>
                    {ruleTable(char)}
                </span>
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

export default BadCharTable;
