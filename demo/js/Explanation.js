import React from "react";

function match () {
    return (
        <p>
            We have passed the end of the pattern on the left, so the pattern
            was found in the text.
        </p>
    );
}

function noMatch() {
    return (
        <p>
            We have passed the end of the text on the right, so the pattern was
            not found in the text.
        </p>
    );
}

function galilRuleUpdate(haystackIndex, needleIndex) {
    return (
        <p>
            Store the current text index as the farthest we need to compare the
            pattern according to the Galil Rule.
        </p>
    );
}

function galilRuleMatch(haystackIndex, needleIndex) {
    return (
        <p>
            Because of the Galil Rule, we know that the rest of the pattern
            will match, and so we have found the pattern in the text.
        </p>
    );
}

function compareEqual(haystackIndex, needleIndex) {
    return (
        <p>
            The current character in the text and pattern match. We shift the
            pattern index left by one and compare the next characters.
        </p>
    );
}

function compareNotEqual(haystackIndex, needleIndex) {
    return (
        <p>
            The current character in the text and pattern do not match.
        </p>
    );
}

function shiftBadCharRule(haystackIndex, needleIndex, shift, haystack, needle, badCharTable, goodSuffixTable) {
    const haystackChar = haystack.charAt(haystackIndex);
    const badCharShift = badCharTable(haystackChar);
    const goodSuffixShift = goodSuffixTable[needleIndex];

    return (
        <div>
            <p>
                We look up the mismatched character from the text in the bad
                character table, and the current pattern index in the good
                suffix table.
            </p>
            <div>badCharTable['{haystackChar}'] = {badCharShift}</div>
            <div>goodSuffixTable[{needleIndex}] = {goodSuffixShift}</div>
            <p>
               Since {badCharShift}&gt;{goodSuffixShift} we shift the text
               index right by {shift} characters.  We also reset the pattern
               index to {needle.length - 1}.
            </p>
        </div>
    );

    return text;
}

function shiftGoodSuffixRule(haystackIndex, needleIndex, shift, haystack, needle, badCharTable, goodSuffixTable) {
    const haystackChar = haystack.charAt(haystackIndex);
    const badCharShift = badCharTable(haystackChar);
    const goodSuffixShift = goodSuffixTable[needleIndex];

    return (
        <div>
            <p>
                We look up the mismatched character from the text in the bad
                character table, and the current pattern index in the good
                suffix table.
            </p>
            <div>badCharTable['{haystackChar}'] = {badCharShift}</div>
            <div>goodSuffixTable[{needleIndex}] = {goodSuffixShift}</div>
            <p>
               Since {badCharShift}&lt;{goodSuffixShift} we shift the text
               index right by {shift} characters.  We also reset the pattern
               index to {needle.length - 1}.
            </p>
        </div>
    );
}

let Explanation = ({action, haystack, needle, badCharTable, goodSuffixTable}) => {
    const haystackIndex = action.haystackIndex;
    const needleIndex = action.needleIndex;
    const texts = {
        MATCH: match,
        NO_MATCH: noMatch,
        GALIL_RULE_MATCH: galilRuleMatch,
        COMPARE_EQUAL: compareEqual,
        COMPARE_NOT_EQUAL: compareNotEqual,
        GALIL_RULE_UPDATE: galilRuleUpdate,
        SHIFT_BADCHAR_RULE: shiftBadCharRule,
        SHIFT_GOODSUFFIX_RULE: shiftGoodSuffixRule
    };

    return (
        <div className="explanation">
            {texts[action.name](haystackIndex, needleIndex, action.shift, haystack, needle, badCharTable, goodSuffixTable)}
        </div>
    );
};

export default Explanation;
