var React = require("react");

var boyerMoore = require("./boyerMooreDemo.js");

var SearchForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault(); // Don't send the form to the server
        var haystack = React.findDOMNode(this.refs.haystack).value.trim();
        var needle = React.findDOMNode(this.refs.needle).value.trim();
        if (!haystack || !needle) {
            return;
        }
        this.props.onHaystackAndNeedleSubmit({
            haystack: haystack,
            needle: needle,
            badCharTable: boyerMoore.makeBadCharTable(needle),
            goodSuffixTable: boyerMoore.makeGoodSuffixTable(needle),
            actions: boyerMoore.searchLog(needle, haystack)
        });
        React.findDOMNode(this.refs.haystack).value = '';
        React.findDOMNode(this.refs.needle).value = '';
        return;
    },
    render: function() {
        return (
            <div className="row">
                <div className="col-6">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Text: </label>
                            <input type="text" className="margin-left-10 input-lg" placeholder="Here is a simple example." ref="haystack" />
                        </div>
                        <div className="form-group margin-left-10">
                            <label>Pattern: </label>
                            <input type="text" className="margin-left-10" placeholder="example" ref="needle" />
                        </div>
                        <button type="submit" className="margin-left-10">Begin Search</button>
                    </form>
                </div>
            </div>
        );
    }
});

module.exports = SearchForm;
