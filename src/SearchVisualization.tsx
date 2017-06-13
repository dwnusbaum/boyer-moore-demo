import * as React from "react";

import { BadCharTable as BadCharTableType, GoodSuffixTable as GoodSuffixTableType, SearchLogEntry } from "./boyerMoore";
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
    log: SearchLogEntry[];
}

export interface VisualizationState {
    logEntryIndex: number;
}

export class SearchVisualization extends React.Component<SearchData, VisualizationState> {
    constructor() {
        super();
        this.handleNext = this.handleNext.bind(this);
        this.handlePrevious = this.handlePrevious.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.state = {
            logEntryIndex: 0
        };
    }

    handleNext(): void {
        this.setState({
            logEntryIndex: Math.min(this.state.logEntryIndex + 1, this.props.log.length - 1)
        });
    }

    handlePrevious(): void {
        this.setState({
            logEntryIndex: Math.max(this.state.logEntryIndex - 1, 0)
        });
    }

    handleReset(): void {
        this.setState({
            logEntryIndex: 0
        });
    }

    render() {
        const haystack = this.props.haystack;
        const needle = this.props.needle;
        const currentLogEntry = this.props.log[this.state.logEntryIndex];
        const haystackIndex = currentLogEntry.haystackIndex;
        const needleIndex = currentLogEntry.needleIndex;

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
                            logEntry={currentLogEntry}
                            haystack={haystack}
                            needle={needle} />
                    </div>
                    <div className="col-2">
                        <BadCharModal />
                        <BadCharTable
                            ruleTable={this.props.badCharTable}
                            logEntry={currentLogEntry}
                            haystack={haystack}
                            needle={needle} />
                    </div>
                    <div className="col-2">
                        <GoodSuffixModal />
                        <GoodSuffixTable
                            ruleTable={this.props.goodSuffixTable}
                            logEntry={currentLogEntry}
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
                            logEntry={currentLogEntry}
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
