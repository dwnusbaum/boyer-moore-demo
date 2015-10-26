var React = require("react");

var GoodSuffixTable = React.createClass({
    render: function() {
        var needleArray = this.props.children.split("");
        var goodSuffixTable = this.props.goodSuffixTable;

        var tableHeader = needleArray.map(function(char, index) {
            return (
                <td key={index}>
                    <samp>
                        <span>{char}</span>
                    </samp>
                </td>
            );
        });

        var tableBody = needleArray.map(function(_, index) {
            return (
                <td key={index}>
                    <samp>
                        <span>{goodSuffixTable[index]}</span>
                    </samp>
                </td>
            );
        });

        return (
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
        );
    }
});

module.exports = GoodSuffixTable;
