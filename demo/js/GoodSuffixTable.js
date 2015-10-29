const React = require("react");

const highlightActions = new Set([
    "COMPARE_NOT_EQUAL",
    "SHIFT_BADCHAR_RULE",
    "SHIFT_GOODSUFFIX_RULE",
]);

const highlightStyle = {
    color: "blue",
}

const GoodSuffixTable = React.createClass({
    render: function() {
        const goodSuffixTable = this.props.goodSuffixTable;
        const action = this.props.action;
        const needleArray = this.props.children.split("");

        let highlightIndex = -1;
        if (highlightActions.has(action.name)) {
            highlightIndex = action.needleIndex;
        }

        let tableHeader = needleArray.map(function(char, index) {
            return (
                <td key={index}>
                    <samp>
                        <span style={index === highlightIndex ? highlightStyle : {}}>{char}<sub>{index}</sub></span>
                    </samp>
                </td>
            );
        });

        let tableBody = needleArray.map(function(_, index) {
            return (
                <td key={index}>
                    <samp>
                        <span style={index === highlightIndex ? highlightStyle : {}}>{goodSuffixTable[index]}</span>
                    </samp>
                </td>
            );
        });

        let titleText = "The good suffix table tells us, given an index in " +
                        "the pattern, i, how far we have to shift the pattern " +
                        "to match the suffix of pattern starting at index i.";

        return (
            <div>
                <div title={titleText}>
                    Good Suffix Table:
                </div>
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
    }
});

module.exports = GoodSuffixTable;
