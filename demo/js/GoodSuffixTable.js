var React = require("react");

var highlightActions = new Set([
    "COMPARE_NOT_EQUAL",
    "SHIFT_BADCHAR_RULE",
    "SHIFT_GOODSUFFIX_RULE",
]);

var highlightStyle = {
    color: "blue",
}

var GoodSuffixTable = React.createClass({
    render: function() {
        var goodSuffixTable = this.props.goodSuffixTable;
        var action = this.props.action;
        var needleArray = this.props.children.split("");

        var highlightIndex = -1;
        if (highlightActions.has(action.name)) {
            highlightIndex = action.needleIndex;
        }

        var tableHeader = needleArray.map(function(char, index) {
            return (
                <td key={index}>
                    <samp>
                        <span style={index === highlightIndex ? highlightStyle : {}}>{char}<sub>{index}</sub></span>
                    </samp>
                </td>
            );
        });

        var tableBody = needleArray.map(function(_, index) {
            return (
                <td key={index}>
                    <samp>
                        <span style={index === highlightIndex ? highlightStyle : {}}>{goodSuffixTable[index]}</span>
                    </samp>
                </td>
            );
        });

        return (
            <div>
                <div>
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
