var React = require("react");

var Controls = React.createClass({
    handleKeyDown: function(event) {
        var leftArrowKey = 37;
        var rightArrowKey = 39;

        if (event.keyCode === leftArrowKey) {
            this.props.onPrevious();
        } else if (event.keyCode === rightArrowKey) {
            this.props.onNext();
        }
        return;
    },
    componentDidMount: function() {
        window.addEventListener('keydown', this.handleKeyDown);
    },
    componentWillUnmount: function() {
        window.removeEventListener('keydown', this.handleKeyDown);
    },
    render: function() {
        return (
            <div className="visualizationControls">
                <button type="submit" onClick={this.props.onReset}>Reset</button>
                <button className="margin-left-10" type="submit" onClick={this.props.onPrevious}>Previous</button>
                <button className="margin-left-10" type="submit" onClick={this.props.onNext}>Next</button>
            </div>
        );
    }
});

module.exports = Controls;
