import React from "react";
import Modal from "react-modal";

import BadCharTable from "./BadCharTable";
import BoyerMoore from "./BoyerMooreDemo";

const modalStyle = {
    content : {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        transform: 'translate(-50%, -50%)'
    }
};

class BadCharModal extends React.Component {
    constructor() {
        super();
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal() {
        this.setState({
            modalIsOpen: true
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    render() {
        const needle = "example";

        return (
            <div>
                <div>
                    <a href="#" onClick={this.openModal}>Bad Character Table</a>
                </div>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} style={modalStyle}>
                    <div className="row">
                        <div className="col-5">
                            <h3 className="no-margin-bottom margin-top-5">Bad Character Table</h3>
                        </div>
                        <div className="col-1">
                            <button className="no-margin-top" onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                    <p>
                        The bad character table tells us, given a mismatched
                        character from the text, the shift distance that would
                        align the rightmost instance of that character in the
                        pattern with the mismatched character in the text.
                    </p>
                    <p>
                        For example, if the pattern is "example" then the bad
                        character table is:
                    </p>
                    <BadCharTable
                        badCharTable={BoyerMoore.makeBadCharTable(needle)}
                        action={{name: undefined}}
                        needle={needle} />
                    <p>
                        If we are comparing the text to the pattern, and we
                        find an "m" that does not match the current character
                        in the pattern, then we know that we must shift the
                        text index 3 characters to the right and reset the
                        pattern index to 7 (aligning the "m"s) before the
                        pattern could match the text.
                    </p>
                </Modal>
            </div>
        );
    }
}

export default BadCharModal;
