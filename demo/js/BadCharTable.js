const React = require("react");

const highlightActions = new Set([
    "COMPARE_NOT_EQUAL",
    "SHIFT_BADCHAR_RULE",
    "SHIFT_GOODSUFFIX_RULE",
]);

const highlightStyle = {
    color: "blue",
}

const BadCharTable = React.createClass({
    render: function() {
        const badCharTable = this.props.badCharTable;
        const action = this.props.action;
        const haystack = this.props.haystack;
        const needle = this.props.children;

        let needleSet = new Set(needle.split(""));
        // Add a dummy element definitely not in the needle array to show the
        // shift amount for characters not in the needle.
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

        let tableHeader = [];
        needleSet.forEach(function(char, index) {
            tableHeader.push(
                <td key={index}>
                    <samp>
                        <span style={char === highlightChar ? highlightStyle : {}}>
                            {char}
                        </span>
                    </samp>
                </td>
            );
        });

        let tableBody = [];
        needleSet.forEach(function(char, index) {
            tableBody.push(
                <td key={index}>
                    <samp>
                        <span style={char === highlightChar ? highlightStyle : {}}>
                            {badCharTable(char)}
                        </span>
                    </samp>
                </td>
            );
        });

        let tooltip = "The bad character table tells us, given a mismatched " +
                      "character from the haytack, the shift distance that " +
                      "would align the rightmost instance of that character " +
                      "in the pattern with the mismatched character in the " +
                      "text";

        return (
            <div>
                <div title={tooltip}>
                    Bad Character Table:
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

module.exports = BadCharTable;
