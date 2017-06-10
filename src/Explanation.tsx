import * as React from "react";

import { BadCharTable, GoodSuffixTable, SearchLog } from "./boyerMoore"

export interface ExplanationProps {
    action: SearchLog;
    haystack: string;
    needle: string;
    badCharTable: BadCharTable;
    goodSuffixTable: GoodSuffixTable;
}

function match(): JSX.Element {
    return (
        <p>
            The pattern index is less than 0, so the pattern was found in the
            text.
        </p>
    );
}

function noMatch(): JSX.Element {
    return (
        <p>
            The text index is greater than or equal to the text length, so the
            pattern was not found in the text.
        </p>
    );
}

function galilRuleMatch(): JSX.Element {
    return (
        <p>
            Because of the Galil Rule, the rest of the pattern will match, so 
            the pattern is in the text.
        </p>
    );
}

function compareEqual(): JSX.Element {
    return (
        <p>
            The current character in the text and pattern match. We decrement
            the text and pattern indices to compare the next characters.
        </p>
    );
}

function shiftRule({action, haystack, needle, badCharTable, goodSuffixTable}: ExplanationProps): JSX.Element {
    const needleIndex = action.needleIndex;
    const haystackChar = haystack.charAt(action.haystackIndex);
    const badCharShift = badCharTable(haystackChar);
    const goodSuffixShift = goodSuffixTable[needleIndex];
    const comparison = badCharShift >= goodSuffixShift ? ">=" : "<";
    const chosen = badCharShift > goodSuffixShift ? "bad character" : "good suffix";

    return (
        <div>
            <p>
                The current character in the text and pattern do not match.
                We look up the mismatched character from the text in the bad
                character table, and the current pattern index in the good
                suffix table.
            </p>
            <div>badCharTable['{haystackChar}'] = {badCharShift}</div>
            <div>goodSuffixTable[{needleIndex}] = {goodSuffixShift}</div>
            <p>
               Since {badCharShift} {comparison} {goodSuffixShift} we use 
               the {chosen} rule and increase the text index by {action.shift}.
            </p>
            { needleIndex == needle.length - 1 
                ? undefined
                : <p>We also reset the pattern index to {needle.length - 1}.</p> 
            }
        </div>
    );
}

let Explanation = ({action, haystack, needle, badCharTable, goodSuffixTable}: ExplanationProps) => {
    const haystackIndex = action.haystackIndex;
    const needleIndex = action.needleIndex;
    const texts: { [index: string]: (props?: ExplanationProps) => JSX.Element } = {
        MATCH: match,
        NO_MATCH: noMatch,
        GALIL_RULE_MATCH: galilRuleMatch,
        COMPARE_EQUAL: compareEqual,
        SHIFT_BADCHAR_RULE: shiftRule,
        SHIFT_GOODSUFFIX_RULE: shiftRule
    };

    return (
        <div className="explanation">
            <h3>Explanation of the Current Step:</h3>
            {texts[action.name]({action, haystack, needle, badCharTable, goodSuffixTable})}
        </div>
    );
};

export default Explanation;
