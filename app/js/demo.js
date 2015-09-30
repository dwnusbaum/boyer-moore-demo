var SearchDemo = React.createClass({
    getInitialState: function() {
        return {
            haystack: "ok",
            needle: "ok",
            actions: [
                {
                    haystackIndex: 1,
                    needleIndex: 1,
                    name: 'COMPARE_END'
                },
                {
                    haystackIndex: 1,
                    needleIndex: 1,
                    name: 'COMPARE_EQUAL'
                },
                {
                    haystackIndex: 0,
                    needleIndex: 0,
                    name: 'COMPARE_END'
                },
                {
                    haystackIndex: 0,
                    needleIndex: 0,
                    name: 'COMPARE_EQUAL'
                },
                {
                    haystackIndex: -1,
                    needleIndex: -1,
                    name: 'NEEDLE_FOUND'
                }
            ]
        };
    },
    handleHaystackAndNeedleSubmit: function(searchData) {
        this.setState(searchData);
    },
    render: function() {
        return (
            <div className="searchDemo">
                <SearchForm onHaystackAndNeedleSubmit={this.handleHaystackAndNeedleSubmit} />
                <SearchVisualization data={this.state} />
            </div>
        );
    }
});

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
            actions: [
                {
                    haystackIndex: needle.length - 1,
                    needleIndex: needle.length - 1,
                    action: 'COMPARE_END'
                }
            ]
        });
        React.findDOMNode(this.refs.haystack).value = '';
        React.findDOMNode(this.refs.needle).value = '';
        return;
    },
    render: function() {
        return (
            <form className="form-inline" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label>Text to search:</label>
                    <input type="text" className="searchInput" placeholder="Here is a simple example." ref="haystack" />
                </div>
                <div className="form-group">
                    <label>Text to search for:</label>
                    <input type="text" className="searchInput" placeholder="example" ref="needle" />
                </div>
                <button type="submit">Begin Search</button>
            </form>
        );
    }
});

var SearchVisualization = React.createClass({
    getInitialState: function() {
        return {
            currentAction: 0
        };
    },
    handleNext: function() {
        this.setState({
            currentAction: Math.min(this.state.currentAction + 1, this.props.data.actions.length - 1)
        });
        return;
    },
    handlePrevious: function() {
        this.setState({
            currentAction: Math.max(this.state.currentAction - 1, 0)
        });
        return;
    },
    render: function() {
        var currentHaystackIndex = this.props.data.actions[this.state.currentAction].haystackIndex;
        var currentNeedleIndex = this.props.data.actions[this.state.currentAction].needleIndex;
        return (
            <div className="searchVisualization">
                <pre>
                    <Haystack current={currentHaystackIndex}>
                        {this.props.data.haystack}
                    </Haystack>
                    <Needle current={currentNeedleIndex}>
                        {this.props.data.needle}
                    </Needle>
                    <Pointer current={currentHaystackIndex} />
                </pre>
                <VisualizationControls onNext={this.handleNext} onPrevious={this.handlePrevious} />
                <Explanation action={this.props.data.actions[this.state.currentAction]} />
            </div>
        );
    }
});

var Haystack = React.createClass({
    render: function() {
        var haystack = this.props.children;
        var current = this.props.current;
        var beforeCurrentChar = haystack.slice(0, current);
        var currentChar = haystack.slice(current, current + 1);
        var afterCurrentChar = haystack.slice(Math.max(current + 1, 1));

        return (
            <samp className="block haystack">
                {beforeCurrentChar}
                <span className="highlight">{currentChar}</span>
                {afterCurrentChar}
            </samp>
        );
    }
});

var Needle = React.createClass({
    render: function() {
        var needle = this.props.children;
        var current = this.props.current;
        var beforeCurrentChar = needle.slice(0, current);
        var currentChar = needle.slice(current, current + 1);
        var afterCurrentChar = needle.slice(Math.max(current + 1, 1));

        return (
            <samp className="block needle">
                {beforeCurrentChar}
                <span className="highlight">{currentChar}</span>
                {afterCurrentChar}
            </samp>
        );
    }
});

var Pointer = React.createClass({
    render: function() {
        var pointer = Array(this.props.current + 1).join(" ") + "^";
        return (
            <samp className="block pointer">
                {pointer}
            </samp>
        );
    }
});

var VisualizationControls = React.createClass({
    render: function() {
        return (
            <div className="visualizationControls">
                <button className="btn btn-default" type="submit" onClick={this.props.onNext}>Next</button>
                <button className="btn btn-default" type="submit" onClick={this.props.onPrevious}>Previous</button>
            </div>
        );
    }
});

var Explanation = React.createClass({
    render: function() {
        return (
            <div className="explanation">
                {this.props.action.name}
            </div>
        );
    }
});

React.render(
    <SearchDemo />,
    document.getElementById("demo")
);
