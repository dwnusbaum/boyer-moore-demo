import * as React from "react";

import {
    Algorithm,
    BadCharTable,
    getAlignmentEnd,
    GoodSuffixTable,
    SearchAction,
    SearchLogEntry
} from "./boyerMoore"

export interface ExplanationProps {
    algorithm: Algorithm;
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

function horspoolShiftRule({logEntry, haystack, needle, badCharTable}: ExplanationProps): JSX.Element {
    const needleIndex = logEntry.needleIndex;
    const alignmentEnd = getAlignmentEnd(needle, logEntry.haystackIndex, needleIndex);
    const alignedChar = haystack.charAt(alignmentEnd);
    const shift = badCharTable(alignedChar);

    return (
        <div>
            <p>
                The current character in the text and pattern do not match.
                Horspool's variant ignores which character mismatched, and
                instead looks up the text character aligned with the last
                character of the pattern (index {alignmentEnd}) in the shift
                table.
            </p>
            <div>shiftTable['{alignedChar}'] = {shift}</div>
            <p>
                We shift the pattern {shift} to the right, so the text index
                becomes {alignmentEnd} + {shift} = {alignmentEnd + shift}.
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

let Explanation = ({algorithm, logEntry, haystack, needle, badCharTable, goodSuffixTable}: ExplanationProps) => {
    const explanation = algorithm === Algorithm.HORSPOOL && logEntry.action === SearchAction.SHIFT
        ? horspoolShiftRule
        : explanations.get(logEntry.action);
    return (
        <div>
            { explanation
                ? explanation({algorithm, logEntry, haystack, needle, badCharTable, goodSuffixTable})
                : <p></p>
            }
        </div>
    );
};

export default Explanation;
