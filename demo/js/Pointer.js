var React = require("react");

var Pointer = React.createClass({
    render: function() {
        var pointer = Array(this.props.current + 1).join(" ") + "^";
        return (
            <samp className="block pointer">
                <span>{pointer}</span>
            </samp>
        );
    }
});

module.exports = Pointer;
