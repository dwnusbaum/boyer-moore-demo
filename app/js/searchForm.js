var React = require("react");

var SearchForm = React.createClass({
    handleSubmit: function(e) {
        e.preventDefault(); // Don't send the form to the server
        var haystack = React.findDOMNode(this.refs.haystack).value.trim();
        var needle = React.findDOMNode(this.refs.needle).value.trim();
        if (!haystack || !needle) {
            return;
        }
        console.log(boyerMoore.searchLog(needle, haystack));
        this.props.onHaystackAndNeedleSubmit({
            haystack: haystack,
            needle: needle,
            actions: boyerMoore.searchLog(needle, haystack)
        });
        React.findDOMNode(this.refs.haystack).value = '';
        React.findDOMNode(this.refs.needle).value = '';
        return;
    },
    render: function() {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Text:</label>
                    <input type="text" className="margin-left-10" placeholder="Here is a simple example." ref="haystack" />
                </div>
                <div className="form-group">
                    <label className="margin-left-10">Pattern:</label>
                    <input type="text" className="margin-left-10" placeholder="example" ref="needle" />
                </div>
                <button type="submit" className="margin-left-10">Begin Search</button>
            </form>
        );
    }
});

module.exports = SearchForm;
