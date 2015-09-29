var SearchDisplay = React.createClass({
    render: function() {
        return (
            <div className="searchDisplay">
                The haystack and needle will show here.
            </div>
        );
    }
});

console.log("test");

React.render(
    <SearchDisplay />,
    document.getElementById("content")
);
