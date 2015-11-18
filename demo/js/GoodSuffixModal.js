import React from "react";
import Modal from "react-modal";

import GoodSuffixTable from "./GoodSuffixTable";
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

class GoodSuffixModal extends React.Component {
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
        return (
            <div>
                <div>
                    <a href="#" onClick={this.openModal}>Good Suffix Table</a>
                </div>
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
                        a prefix of the pattern with the suffix of the pattern
                        that we have matched so far in the text.
                    </p>
                </Modal>
            </div>
        );
    }
};

export default GoodSuffixModal;
