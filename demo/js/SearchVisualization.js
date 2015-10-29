const React = require("react");

const BadCharTable = require("./BadCharTable");
const Controls = require("./Controls");
const Explanation = require("./Explanation");
const GoodSuffixTable = require("./GoodSuffixTable");
const Haystack = require("./Haystack");
const Needle = require("./Needle");
const Pointer = require("./Pointer");
const SearchInfo = require("./SearchInfo");

const SearchVisualization = React.createClass({
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
        const haystack = this.props.data.haystack;
        const needle = this.props.data.needle;
        const currentAction = this.props.data.actions[this.state.actionIndex];
        const haystackIndex = currentAction.haystackIndex;
        const needleIndex = currentAction.needleIndex;

        const currentCharsMatch = haystack.charAt(haystackIndex) === needle.charAt(needleIndex);
        const matchLength = needle.length - needleIndex;

        return (
            <div>
                <div className="row">
                    <div className="col-6">
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
                </div>
                <div className="row">
                    <div className="col-2">
                        <BadCharTable badCharTable={this.props.data.badCharTable} action={currentAction} haystack={haystack}>
                            {needle}
                        </BadCharTable>
                    </div>
                    <div className="col-2">
                        <GoodSuffixTable goodSuffixTable={this.props.data.goodSuffixTable} action={currentAction}>
                            {needle}
                        </GoodSuffixTable>
                    </div>
                    <div className="col-2">
                        <SearchInfo
                            action={currentAction}
                            haystack={haystack}
                            haystackIndex={haystackIndex}
                            needle={needle}
                            needleIndex={needleIndex} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Controls onNext={this.handleNext} onPrevious={this.handlePrevious} onReset={this.handleReset} />
                        <Explanation
                            action={currentAction}
                            haystack={haystack}
                            needle={needle}
                            badCharTable={this.props.data.badCharTable}
                            goodSuffixTable={this.props.data.goodSuffixTable} />
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = SearchVisualization;
