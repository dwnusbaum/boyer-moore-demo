import * as React from "react";

import { BadCharTable as BadCharTableType } from "./boyerMoore";
import { RuleTableProps } from "./RuleTableProps";

const highlightActions = new Set([
    "COMPARE_NOT_EQUAL",
    "SHIFT_BADCHAR_RULE",
    "SHIFT_GOODSUFFIX_RULE",
]);

const highlightStyle = {
    color: "blue",
}

let BadCharTable = ({ruleTable, action, haystack, needle}: RuleTableProps<BadCharTableType>) => {
    let needleSet = new Set(needle.split(""));
    // Add a dummy element that is not in the needle array to show the shift
    // amount for characters not in the needle.
    needleSet.add("other");

    let highlightChar = "";
    if (highlightActions.has(action.name)) {
        const haystackChar = haystack.charAt(action.haystackIndex);
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
