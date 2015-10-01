var React = require("react");

var Haystack = require("./haystack.js");
var Needle = require("./needle.js");
var Pointer = require("./pointer.js");
var Controls = require("./controls.js")
var Explanation = require("./explanation.js")

var SearchVisualization = React.createClass({
    getInitialState: function() {
        return {
            actionIndex: 0
        };
    },
    handleNext: function() {
        this.setState({
            actionIndex: Math.min(this.state.actionIndex + 1, this.props.data.actions.length - 1)
        });
        return;
    },
    handlePrevious: function() {
        this.setState({
            actionIndex: Math.max(this.state.actionIndex - 1, 0)
        });
        return;
    },
    handleReset: function() {
        this.setState({
            actionIndex: 0
        });
    },
    render: function() {
        var haystack = this.props.data.haystack;
        var needle = this.props.data.needle;
        var currentAction = this.props.data.actions[this.state.actionIndex];
        var haystackIndex = currentAction.haystackIndex;
        var needleIndex = currentAction.needleIndex;

        var currentCharsMatch = haystack.charAt(haystackIndex) === needle.charAt(needleIndex);
        var matchLength = this.props.data.needle.length - needleIndex;

        return (
            <div className="searchVisualization">
                <pre>
                    <Haystack haystackIndex={haystackIndex} matchLength={matchLength} currentCharsMatch={currentCharsMatch}>
                        {haystack}
                    </Haystack>
                    <Needle haystackIndex={haystackIndex} matchLength={matchLength} currentCharsMatch={currentCharsMatch}>
                        {needle}
                    </Needle>
                    <Pointer current={haystackIndex} />
                </pre>
                <Controls onNext={this.handleNext} onPrevious={this.handlePrevious} onReset={this.handleReset} />
                <Explanation action={currentAction} />
            </div>
        );
    }
});

module.exports = SearchVisualization;
