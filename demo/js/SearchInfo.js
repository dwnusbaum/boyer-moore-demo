const React = require("react");

const SearchInfo = React.createClass({
    render: function() {
        const haystack = this.props.haystack;
        const needle = this.props.needle;
        const action = this.props.action;
        const haystackIndex = action.haystackIndex;
        const needleIndex = action.needleIndex;

        return (
            <div>
                <div>
                    Text index: {haystackIndex}/{haystack.length - 1}
                </div>
                <div>
                    Pattern index: {needleIndex}/{needle.length - 1}
                </div>
                <hr />
                <div>
                    Total Comparisons: {action.comparisons}
                </div>

            </div>
        );
    }
});

module.exports = SearchInfo;
