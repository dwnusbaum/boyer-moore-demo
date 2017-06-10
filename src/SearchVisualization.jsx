import React from "react";

import BadCharModal from "./BadCharModal";
import BadCharTable from "./BadCharTable";
import Controls from "./Controls";
import Explanation from "./Explanation";
import GoodSuffixModal from "./GoodSuffixModal";
import GoodSuffixTable from "./GoodSuffixTable";
import Haystack from "./Haystack";
import Needle from "./Needle";
import Pointer from "./Pointer";
import SearchInfo from "./SearchInfo";

class SearchVisualization extends React.Component {
    constructor() {
        super();
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            actionIndex: 0
        };
    }

    handleNext() {
        this.setState({
            actionIndex: Math.min(this.state.actionIndex + 1, this.props.data.actions.length - 1)
        });
        return;
    }

    handlePrevious() {
        this.setState({
            actionIndex: Math.max(this.state.actionIndex - 1, 0)
        });
        return;
    }

    handleReset() {
        this.setState({
            actionIndex: 0
        });
    }

    render() {
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
                            <Haystack
                                haystack={haystack}
                                haystackIndex={haystackIndex}
                                matchLength={matchLength}
                                currentCharsMatch={currentCharsMatch} />
                            <Needle
                                needle={needle}
                                haystackIndex={haystackIndex}
                                matchLength={matchLength}
                                currentCharsMatch={currentCharsMatch} />
                            <Pointer haystackIndex={haystackIndex} />
                        </pre>
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <SearchInfo
                            action={currentAction}
                            haystack={haystack}
                            needle={needle} />
                    </div>
                    <div className="col-2">
                        <BadCharModal />
                        <BadCharTable
                            ruleTable={this.props.data.badCharTable}
                            action={currentAction}
                            haystack={haystack}
                            needle={needle} />
                    </div>
                    <div className="col-2">
                        <GoodSuffixModal />
                        <GoodSuffixTable
                            ruleTable={this.props.data.goodSuffixTable}
                            action={currentAction}
                            needle={needle} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <Controls
                            onNext={this.handleNext}
                            onPrevious={this.handlePrevious}
                            onReset={this.handleReset} />
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
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchVisualization;
