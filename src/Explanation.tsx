import * as React from "react";

import { BadCharTable, GoodSuffixTable, SearchAction, SearchLogEntry } from "./boyerMoore"

export interface ExplanationProps {
    logEntry: SearchLogEntry;
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

function shiftRule({logEntry, haystack, needle, badCharTable, goodSuffixTable}: ExplanationProps): JSX.Element {
    const needleIndex = logEntry.needleIndex;
    const haystackChar = haystack.charAt(logEntry.haystackIndex);
    const badCharShift = badCharTable(haystackChar);
    const goodSuffixShift = goodSuffixTable[needleIndex];
    const shift = badCharShift >= goodSuffixShift ? badCharShift : goodSuffixShift;
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
               the {chosen} rule and increase the text index by {shift}.
            </p>
            { needleIndex == needle.length - 1
                ? undefined
                : <p>We also reset the pattern index to {needle.length - 1}.</p>
            }
        </div>
    );
}

const explanations: Map<SearchAction, (props?: ExplanationProps) => JSX.Element> = new Map([
    [SearchAction.COMPARE_EQUAL, compareEqual],
    [SearchAction.GALIL_RULE_MATCH, galilRuleMatch],
    [SearchAction.MATCH, match],
    [SearchAction.NO_MATCH, noMatch],
    [SearchAction.SHIFT, shiftRule],
]);

let Explanation = ({logEntry, haystack, needle, badCharTable, goodSuffixTable}: ExplanationProps) => {
    const explanation = explanations.get(logEntry.action);
    return (
        <div className="explanation">
            <h3>Explanation of the Current Step:</h3>
            { explanation
                ? explanation({logEntry, haystack, needle, badCharTable, goodSuffixTable})
                : <p></p>
            }
        </div>
    );
};

export default Explanation;
