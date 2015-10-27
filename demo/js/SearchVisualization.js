var React = require("react");

var BadCharTable = require("./BadCharTable");
var GoodSuffixTable = require("./GoodSuffixTable");
var Haystack = require("./Haystack");
var Needle = require("./Needle");
var Pointer = require("./Pointer");
var Controls = require("./Controls")
var Explanation = require("./Explanation")

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
        var matchLength = needle.length - needleIndex;

        return (
            <div>
                <div className="row">
                    <div className="col-4">
                        <pre>
                            <Haystack haystackIndex={haystackIndex} matchLength={matchLength} currentCharsMatch={currentCharsMatch}>
                                {haystack}
                            </Haystack>
                            <Needle haystackIndex={haystackIndex} matchLength={matchLength} currentCharsMatch={currentCharsMatch}>
                                {needle}
                            </Needle>
                            <Pointer current={haystackIndex} />
                        </pre>
                    </div>
                    <div className="col-2">
                        <div className="row">
                            <div className="col-6">
                                <BadCharTable badCharTable={this.props.data.badCharTable} action={currentAction} haystack={haystack}>
                                    {needle}
                                </BadCharTable>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                <GoodSuffixTable goodSuffixTable={this.props.data.goodSuffixTable} action={currentAction}>
                                    {needle}
                                </GoodSuffixTable>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Explanation
                            action={currentAction}
                            haystack={haystack}
                            needle={needle}
                            badCharTable={this.props.data.badCharTable}
                            goodSuffixTable={this.props.data.goodSuffixTable} />
                        <Controls onNext={this.handleNext} onPrevious={this.handlePrevious} onReset={this.handleReset} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SearchVisualization;
