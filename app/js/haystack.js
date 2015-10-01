var React = require("react");

var Haystack = React.createClass({
    render: function() {
        var haystack = this.props.children;
        var current = this.props.current;
        var beforeCurrentChar = haystack.slice(0, current);
        var currentChar = haystack.slice(current, current + 1);
        var afterCurrentChar = haystack.slice(Math.max(current + 1, 1));

        return (
            <samp className="block haystack">
                <span>{beforeCurrentChar}</span>
                <span className="highlight">{currentChar}</span>
                <span>{afterCurrentChar}</span>
            </samp>
        );
    }
});

module.exports = Haystack;
