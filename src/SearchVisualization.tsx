import * as React from "react";

import { BadCharTable as BadCharTableType, GoodSuffixTable as GoodSuffixTableType, SearchLog } from "./boyerMoore";
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

export interface SearchData {
    haystack: string;
    needle: string;
    badCharTable: BadCharTableType;
    goodSuffixTable: GoodSuffixTableType;
    actions: SearchLog[];
}

export interface VisualizationState {
    actionIndex: number;
}

export class SearchVisualization extends React.Component<SearchData, VisualizationState> {
    constructor() {
        super();
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            actionIndex: 0
        };
    }

    handleNext(): void {
        this.setState({
            actionIndex: Math.min(this.state.actionIndex + 1, this.props.actions.length - 1)
        });
    }

    handlePrevious(): void {
        this.setState({
            actionIndex: Math.max(this.state.actionIndex - 1, 0)
        });
    }

    handleReset(): void {
        this.setState({
            actionIndex: 0
        });
    }

    render() {
        const haystack = this.props.haystack;
        const needle = this.props.needle;
        const currentAction = this.props.actions[this.state.actionIndex];
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
                            ruleTable={this.props.badCharTable}
                            action={currentAction}
                            haystack={haystack}
                            needle={needle} />
                    </div>
                    <div className="col-2">
                        <GoodSuffixModal />
                        <GoodSuffixTable
                            ruleTable={this.props.goodSuffixTable}
                            action={currentAction}
                            haystack=""
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
                            badCharTable={this.props.badCharTable}
                            goodSuffixTable={this.props.goodSuffixTable} />
                    </div>
                </div>
            </div>
        );
    }
}
