const React = require("react");
const Modal = require("react-modal");

const highlightActions = new Set([
    "COMPARE_NOT_EQUAL",
    "SHIFT_BADCHAR_RULE",
    "SHIFT_GOODSUFFIX_RULE",
]);

const highlightStyle = {
    color: "blue",
}

const modalStyle = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)'
    }
};

const BadCharTable = React.createClass({
    getInitialState: function() {
        return { modalIsOpen: false };
    },
    openModal: function() {
        this.setState({modalIsOpen: true});
    },
    closeModal: function() {
        this.setState({modalIsOpen: false});
    },
    render: function() {
        const badCharTable = this.props.badCharTable;
        const action = this.props.action;
        const haystack = this.props.haystack;
        const needle = this.props.children;

        let needleSet = new Set(needle.split(""));
        // Add a dummy element definitely not in the needle array to show the
        // shift amount for characters not in the needle.
        needleSet.add("other");

        let highlightChar = "";
        if (highlightActions.has(action.name)) {
            const haystackChar = haystack.charAt(action.haystackIndex);
            if (needleSet.has(haystackChar)) {
                highlightChar = haystackChar;
            } else {
                highlightChar = "other";
            }
        }

        let tableHeader = [];
        needleSet.forEach(function(char, index) {
            tableHeader.push(
                <td key={index}>
                    <samp>
                        <span style={char === highlightChar ? highlightStyle : {}}>
                            {char}
                        </span>
                    </samp>
                </td>
            );
        });

        let tableBody = [];
        needleSet.forEach(function(char, index) {
            tableBody.push(
                <td key={index}>
                    <samp>
                        <span style={char === highlightChar ? highlightStyle : {}}>
                            {badCharTable(char)}
                        </span>
                    </samp>
                </td>
            );
        });

        return (
            <div>
                <div>
                    <a href="#" onClick={this.openModal}>Bad Character Table</a>
                </div>
                <table className="shiftTable">
                    <thead>
                        <tr>
                            {tableHeader}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {tableBody}
                        </tr>
                    </tbody>
                </table>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={modalStyle}>
                    <div className="row">
                        <div className="col-5">
                            <h3 className="no-margin-bottom margin-top-5">Good Suffix Table</h3>
                        </div>
                        <div className="col-1">
                            <button className="no-margin-top" onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                    <p>
                        The bad character table tells us, given a mismatched
                        character from the haytack, the shift distance that
                        would align the rightmost instance of that character
                        in the pattern with the mismatched character in the
                        text.
                    </p>
                </Modal>
            </div>
        );
    }
});

module.exports = BadCharTable;
