import * as React from "react";
import * as ReactDOM from "react-dom";

import * as BoyerMoore from "./boyerMoore";
import SearchForm from "./SearchForm";
import { SearchVisualization, SearchData } from "./SearchVisualization";

class SearchDemo extends React.Component<{}, SearchData> {
    constructor() {
        super();
        this.handleHaystackAndNeedleSubmit = this.handleHaystackAndNeedleSubmit.bind(this);
    }

    componentWillMount() {
        const haystack = "Here is a simple example.";
        const needle = "example";
        this.handleHaystackAndNeedleSubmit(haystack, needle);
    }

    handleHaystackAndNeedleSubmit(haystack: string, needle: string): void {
        this.setState({
            haystack: haystack,
            needle: needle,
            badCharTable: BoyerMoore.default.makeBadCharTable(needle),
            goodSuffixTable: BoyerMoore.default.makeGoodSuffixTable(needle),
            actions: BoyerMoore.default.search(needle, haystack).log,
        });
    }

    render() {
        return (
            <div>
                <SearchForm onHaystackAndNeedleSubmit={this.handleHaystackAndNeedleSubmit} />
                <SearchVisualization {...this.state} />
            </div>
        );
    }
}

ReactDOM.render(
    <SearchDemo />,
    document.getElementById("demo")
);
