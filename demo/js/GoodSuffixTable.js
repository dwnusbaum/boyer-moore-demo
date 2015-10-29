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

const GoodSuffixTable = React.createClass({
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
        const goodSuffixTable = this.props.goodSuffixTable;
        const action = this.props.action;
        const needleArray = this.props.children.split("");

        let highlightIndex = -1;
        if (highlightActions.has(action.name)) {
            highlightIndex = action.needleIndex;
        }

        let tableHeader = needleArray.map(function(char, index) {
            return (
                <td key={index}>
                    <samp>
                        <span style={index === highlightIndex ? highlightStyle : {}}>{char}<sub>{index}</sub></span>
                    </samp>
                </td>
            );
        });

        let tableBody = needleArray.map(function(_, index) {
            return (
                <td key={index}>
                    <samp>
                        <span style={index === highlightIndex ? highlightStyle : {}}>{goodSuffixTable[index]}</span>
                    </samp>
                </td>
            );
        });

        let titleText = "The good suffix table tells us, given an index in " +
                        "the pattern, the smallest shift distance that would " +
                        "align the pattern with a new instance of the " +
                        "suffix of the pattern starting at that index.";

        return (
            <div>
                <div>
                    <a href="#" onClick={this.openModal}>Good Suffix Table</a>
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
                        The good suffix table tells us, given an index in the
                        pattern, the smallest shift distance that would align
                        the pattern with a new instance of the suffix of the
                        pattern starting at that index.
                    </p>
                </Modal>
            </div>
        );
    }
});

module.exports = GoodSuffixTable;
