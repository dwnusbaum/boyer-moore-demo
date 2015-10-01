var React = require("react");

var Haystack = require("./haystack.js");
var Needle = require("./needle.js");
var Pointer = require("./pointer.js");
var Controls = require("./controls.js")
var Explanation = require("./explanation.js")

var SearchVisualization = React.createClass({
    getInitialState: function() {
        return {
            currentAction: 0
        };
    },
    handleNext: function() {
        this.setState({
            currentAction: Math.min(this.state.currentAction + 1, this.props.data.actions.length - 1)
        });
        return;
    },
    handlePrevious: function() {
        this.setState({
            currentAction: Math.max(this.state.currentAction - 1, 0)
        });
        return;
    },
    handleReset: function() {
        this.setState({
            currentAction: 0
        });
    },
    render: function() {
        var haystackIndex = this.props.data.actions[this.state.currentAction].haystackIndex;
        var needleIndex = this.props.data.actions[this.state.currentAction].needleIndex;
        return (
            <div className="searchVisualization">
                <pre>
                    <Haystack current={haystackIndex}>
                        {this.props.data.haystack}
                    </Haystack>
                    <Needle haystackIndex={haystackIndex} needleIndex={needleIndex}>
                        {this.props.data.needle}
                    </Needle>
                    <Pointer current={haystackIndex} />
                </pre>
                <Controls onNext={this.handleNext} onPrevious={this.handlePrevious} onReset={this.handleReset} />
                <Explanation action={this.props.data.actions[this.state.currentAction]} />
            </div>
        );
    }
});

module.exports = SearchVisualization;
