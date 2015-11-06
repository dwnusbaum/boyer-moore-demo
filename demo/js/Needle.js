import React from "react";

const matchStyle = {
    color: "green"
};

const noMatchStyle = {
    color: "red"
};

let Needle = ({needle, haystackIndex, matchLength, currentCharsMatch}) => {
    const spacePrefixedNeedle = Array(haystackIndex + matchLength - needle.length + 1).join(" ") + needle;
    const prefix = spacePrefixedNeedle.substring(0, haystackIndex);
    const match = spacePrefixedNeedle.substring(haystackIndex, haystackIndex + matchLength);
    let current = match.charAt(0);
    let alreadyMatched = match.substring(1);

    // Fix highlighting of matches that start at index 0
    if (haystackIndex < 0) {
        current = "";
        alreadyMatched = match;
    }

    return (
        <samp className="block needle">
            <span>Pattern:&nbsp;</span>
            <span>{prefix}</span>
            <span style={currentCharsMatch ? matchStyle : noMatchStyle}>{current}</span>
            <span className="highlight-matching-chars">{alreadyMatched}</span>
        </samp>
    );
};

export default Needle;
