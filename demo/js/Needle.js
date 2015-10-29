var React = require("react");

var matchStyle = {
    color: "green"
};

var noMatchStyle = {
    color: "red"
};

var Needle = React.createClass({
    render: function() {
        var needle = this.props.children;
        var haystackIndex = this.props.haystackIndex;
        var matchLength = this.props.matchLength;

        var spacedNeedle = Array(haystackIndex + matchLength - needle.length + 1).join(" ") + needle;
        var prefix = spacedNeedle.substring(0, haystackIndex);
        var match = spacedNeedle.substring(haystackIndex, haystackIndex + matchLength);
        var current = match.charAt(0);
        var alreadyMatched = match.substring(1);

        // Fix highlighting of matches that start at index 0
        if (haystackIndex < 0) {
            current = "";
            alreadyMatched = match;
        }

        return (
            <samp className="block needle">
                <span>Pattern:&nbsp;</span>
                <span>{prefix}</span>
                <span style={this.props.currentCharsMatch ? matchStyle : noMatchStyle}>{current}</span>
                <span className="highlight-matching-chars">{alreadyMatched}</span>
            </samp>
        );
    }
});

module.exports = Needle;
