import React from "react";

const highlightActions = new Set([
    "COMPARE_NOT_EQUAL",
    "SHIFT_BADCHAR_RULE",
    "SHIFT_GOODSUFFIX_RULE",
]);

const highlightStyle = {
    color: "blue",
}

let GoodSuffixTable = ({goodSuffixTable, action, needle}) => {
    const needleArray = needle.split("");

    let highlightIndex = -1;
    if (highlightActions.has(action.name)) {
        highlightIndex = action.needleIndex;
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
                <span style={index === highlightIndex ? highlightStyle : {}}>{goodSuffixTable[index]}</span>
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
