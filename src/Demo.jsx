import React from "react";
import ReactDOM from "react-dom";

import BoyerMoore from "./BoyerMoore";
import SearchForm from "./SearchForm";
import SearchVisualization from "./SearchVisualization";

class SearchDemo extends React.Component {
    constructor() {
        super();
        this.handleHaystackAndNeedleSubmit = this.handleHaystackAndNeedleSubmit.bind(this);
        const haystack = "Here is a simple example.";
        const needle = "example";
        this.state = {
            haystack: haystack,
            needle: needle,
            badCharTable: BoyerMoore.makeBadCharTable(needle),
            goodSuffixTable: BoyerMoore.makeGoodSuffixTable(needle),
            actions: BoyerMoore.search(needle, haystack).log,
        });
    }

    render() {
        return (
            <div>
                <SearchForm onHaystackAndNeedleSubmit={this.handleHaystackAndNeedleSubmit} />
                <SearchVisualization key={this.state.haystack + this.state.needle} data={this.state} />
            </div>
        );
    }
}

ReactDOM.render(
    <SearchDemo />,
    document.getElementById("demo")
);
