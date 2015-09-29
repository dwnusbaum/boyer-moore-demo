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
            <form className="searchForm" onSubmit={this.handleSubmit}>
                <input type="text" placeholder="Here is a simple example." ref="haystack" />
                <input type="text" placeholder="example" ref="needle" />
                <input type="submit" value="Search" />
            </form>
        );
    }
});

var SearchVisualization = React.createClass({
    getInitialState: function() {
        return {
            currentAction: 0,
            totalActions: this.props.data.actions.length
        };
    },
    handleMove: function() {
        return;
    },
    render: function() {
        return (
            <div className="searchVisualization">
                <Haystack>
                    {this.props.data.haystack}
                </Haystack>
                <Needle>
                    {this.props.data.needle}
                </Needle>
                <Pointer>
                    {this.props.data.actions[this.state.currentAction].haystackIndex}
                </Pointer>
                <Explanation onMove={this.handleMove} action={this.props.data.actions[this.state.currentAction]} />
            </div
        );
    }
});

var Haystack = React.createClass({
    render: function() {
        return (
            <div className="haystack">
                {this.props.children}
            </div>
        );
    }
});

var Needle = React.createClass({
    render: function() {
        return (
            <div className="needle">
                {this.props.children}
            </div>
        );
    }
});

var Pointer = React.createClass({
    render: function() {
        return (
            <div className="pointer">
                {this.props.children}
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
    document.getElementById("content")
);
