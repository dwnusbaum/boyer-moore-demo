import * as React from "react";
import * as ReactDOM from "react-dom";

import * as BoyerMoore from "./boyerMoore";
import AlgorithmSelect from "./AlgorithmSelect";
import SearchForm from "./SearchForm";
import { SearchVisualization, SearchData } from "./SearchVisualization";

const algorithmNames: Map<BoyerMoore.Algorithm, string> = new Map([
    [BoyerMoore.Algorithm.BOYER_MOORE, "Boyer-Moore"],
    [BoyerMoore.Algorithm.HORSPOOL, "Boyer-Moore-Horspool"],
]);

class SearchDemo extends React.Component<{}, SearchData> {
    constructor() {
        super();
        this.handleHaystackAndNeedleSubmit = this.handleHaystackAndNeedleSubmit.bind(this);
        this.handleAlgorithmChange = this.handleAlgorithmChange.bind(this);
    }

    componentWillMount() {
        const haystack = "Here is a simple example.";
        const needle = "example";
        this.updateSearch(BoyerMoore.Algorithm.BOYER_MOORE, haystack, needle);
    }

    componentDidMount() {
        this.updateTitle();
    }

    componentDidUpdate() {
        this.updateTitle();
    }

    updateTitle(): void {
        const algorithmName = algorithmNames.get(this.state.algorithm);
        document.title = `Interactive Demo of the ${algorithmName} String Search Algorithm`;
    }

    handleHaystackAndNeedleSubmit(haystack: string, needle: string): void {
        this.updateSearch(this.state.algorithm, haystack, needle);
    }

    handleAlgorithmChange(algorithm: BoyerMoore.Algorithm): void {
        this.updateSearch(algorithm, this.state.haystack, this.state.needle);
    }

    updateSearch(algorithm: BoyerMoore.Algorithm, haystack: string, needle: string): void {
        this.setState({
            algorithm: algorithm,
            haystack: haystack,
            needle: needle,
            badCharTable: algorithm === BoyerMoore.Algorithm.HORSPOOL
                ? BoyerMoore.makeHorspoolTable(needle)
                : BoyerMoore.makeBadCharTable(needle),
            goodSuffixTable: BoyerMoore.makeGoodSuffixTable(needle),
            log: BoyerMoore.searchWith(algorithm, needle, haystack).log,
        });
    }

    render() {
        const algorithmName = algorithmNames.get(this.state.algorithm);
        return (
            <div>
                <header>
                    <h2 className="margin-top">{algorithmName} String Search Algorithm</h2>
                </header>
                <AlgorithmSelect
                    algorithm={this.state.algorithm}
                    onAlgorithmChange={this.handleAlgorithmChange} />
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
