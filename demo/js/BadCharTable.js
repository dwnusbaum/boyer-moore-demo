var React = require("react");

var BadCharTable = React.createClass({
    render: function() {
        var badCharTable = this.props.badCharTable;
        var needle = this.props.children;
        var needleSet = new Set(needle.split(""));
        // Add a dummy element definitely not in the needle to show the shift
        // amount for characters not in the needle.
        needleSet.add("other");

        var tableHeader = [];
        needleSet.forEach(function(char, index) {
            tableHeader.push(
                <td key={index}>
                    <samp>
                        <span>{char}</span>
                    </samp>
                </td>
            );
        });

        var tableBody = [];
        needleSet.forEach(function(char, index) {
            tableBody.push(
                <td key={index}>
                    <samp>
                        <span>{badCharTable(char)}</span>
                    </samp>
                </td>
            );
        });

        return (
            <div>
                <div>
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
