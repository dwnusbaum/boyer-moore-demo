import React from "react";
import ReactDOM from "react-dom";
import BoyerMoore from "./BoyerMooreDemo.js";

class SearchForm extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault(); // Don't send the form to the server
        const haystack = ReactDOM.findDOMNode(this.refs.haystack).value.trim();
        const needle = ReactDOM.findDOMNode(this.refs.needle).value.trim();
        if (!haystack || !needle) {
            return;
        }
        this.props.onHaystackAndNeedleSubmit({
            haystack: haystack,
            needle: needle,
            badCharTable: BoyerMoore.makeBadCharTable(needle),
            goodSuffixTable: BoyerMoore.makeGoodSuffixTable(needle),
            actions: BoyerMoore.searchLog(needle, haystack)
        });
        ReactDOM.findDOMNode(this.refs.haystack).value = '';
        ReactDOM.findDOMNode(this.refs.needle).value = '';
        return;
    }

    render() {
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
}

export default SearchForm;
