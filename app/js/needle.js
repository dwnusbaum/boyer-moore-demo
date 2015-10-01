var React = require("react");

var Needle = React.createClass({
    render: function() {
        var needle = this.props.children;
        var haystackIndex = this.props.haystackIndex;
        var needleIndex = this.props.needleIndex;

        var beforeNeedle = Array(haystackIndex - needleIndex + 1).join(" ");
        var beforeCurrentChar = needle.substring(0, needleIndex);
        var currentChar = needle.slice(needleIndex, needleIndex + 1);
        var afterCurrentChar = needle.slice(needleIndex + 1);

        return (
            <samp className="block needle">
                <span>{beforeNeedle}</span>
                <span>{beforeCurrentChar}</span>
                <span className="highlight">{currentChar}</span>
                <span>{afterCurrentChar}</span>
            </samp>
        );
    }
});

module.exports = Needle;
