import * as React from "react";

import { BadCharTable as BadCharTableType, SearchAction } from "./boyerMoore";
import { RuleTableProps } from "./RuleTableProps";

const highlightStyle = {
    color: "blue",
}

let BadCharTable = ({ruleTable, logEntry, haystack, needle}: RuleTableProps<BadCharTableType>) => {
    let needleSet = new Set(needle.split(""));
    // Add a dummy element that is not in the needle array to show the shift
    // amount for characters not in the needle.
    needleSet.add("other");

    let highlightChar = "";
    if (logEntry && logEntry.action === SearchAction.SHIFT) {
        const haystackChar = haystack.charAt(logEntry.haystackIndex);
        if (needleSet.has(haystackChar)) {
            highlightChar = haystackChar;
        } else {
            highlightChar = "other";
        }
    }

    let tableHeader: JSX.Element[] = [];
    needleSet.forEach(function(char, index) {
        tableHeader.push(
            <td key={index}>
                <span style={char === highlightChar ? highlightStyle : {}}>
                    {char}
                </span>
            </td>
        );
    });

    let tableBody: JSX.Element[] = [];
    needleSet.forEach(function(char, index) {
        tableBody.push(
            <td key={index}>
                <span style={char === highlightChar ? highlightStyle : {}}>
                    {ruleTable(char)}
                </span>
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

export default BadCharTable;