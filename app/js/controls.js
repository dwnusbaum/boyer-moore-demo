var React = require("react");

var Controls = React.createClass({
    render: function() {
        return (
            <div className="visualizationControls">
                <button type="submit" onClick={this.props.onNext}>Next</button>
                <button className="margin-left-10" type="submit" onClick={this.props.onPrevious}>Previous</button>
                <button className="margin-left-10" type="submit" onClick={this.props.onReset}>Reset</button>
            </div>
        );
    }
});

module.exports = Controls;
