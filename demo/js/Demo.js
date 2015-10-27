var React = require("react");

var boyerMoore = require("./boyerMooreDemo");
var SearchForm = require("./SearchForm");
var SearchVisualization = require("./SearchVisualization");

var SearchDemo = React.createClass({
    getInitialState: function() {
        var haystack = "Here is a simple example.";
        var needle = "example";
        return {
            haystack: haystack,
            needle: needle,
            badCharTable: boyerMoore.makeBadCharTable(needle),
            goodSuffixTable: boyerMoore.makeGoodSuffixTable(needle),
            actions: boyerMoore.searchLog(needle, haystack),
        };
    },
    handleHaystackAndNeedleSubmit: function(searchData) {
        this.setState(searchData);
    },
    render: function() {
        return (
            <div>
                <SearchForm onHaystackAndNeedleSubmit={this.handleHaystackAndNeedleSubmit} />
                <SearchVisualization key={this.state.haystack + this.state.needle} data={this.state} />
            </div>
        );
    }
});

React.render(
    <SearchDemo />,
    document.getElementById("demo")
);
