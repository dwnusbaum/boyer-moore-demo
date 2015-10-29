var React = require("react");

var matchStyle = {
    color: "green"
};

var noMatchStyle = {
    color: "red"
};

var Haystack = React.createClass({
    render: function() {
        var haystack = this.props.children;
        var haystackIndex = this.props.haystackIndex;
        var matchLength = this.props.matchLength;

        var prefix = haystack.substring(0, haystackIndex);
        var match = haystack.substring(haystackIndex, haystackIndex + matchLength);
        var current = match.charAt(0);
        var alreadyMatched = match.substring(1);
        var suffix = haystack.substring(Math.max(haystackIndex + matchLength, 1));

        // Fix highlighting of matches that start at index 0
        if (haystackIndex < 0) {
            current = "";
            alreadyMatched = match;
        }

        return (
            <samp className="block haystack">
                <span>Text:&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{prefix}</span>
                <span style={this.props.currentCharsMatch ? matchStyle : noMatchStyle}>{current}</span>
                <span className="highlight-matching-chars">{alreadyMatched}</span>
                <span>{suffix}</span>
            </samp>
        );
    }
});

module.exports = Haystack;
