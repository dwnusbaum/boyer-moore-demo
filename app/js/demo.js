var React = require("react");

var SearchForm = require("./searchForm.js");
var SearchVisualization = require("./searchVisualization.js");
var boyerMoore = require("./boyerMoore.js");

var SearchDemo = React.createClass({
    getInitialState: function() {
        var haystack = "Here is a simple example.";
        var needle = "example";
        return {
            haystack: haystack,
            needle: needle,
            actions: boyerMoore.searchLog(needle, haystack)
        };
    },
    handleHaystackAndNeedleSubmit: function(searchData) {
        this.setState(searchData);
    },
    render: function() {
        return (
            <div className="searchDemo">
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
