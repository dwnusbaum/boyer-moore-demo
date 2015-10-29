var React = require("react");

var Pointer = React.createClass({
    render: function() {
        var pointer = Array(this.props.current + 2).join(" ") + "^";
        return (
            <samp className="block pointer">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span>{pointer}</span>
            </samp>
        );
    }
});

module.exports = Pointer;
