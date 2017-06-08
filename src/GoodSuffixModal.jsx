import React from "react";
import Modal from "react-modal";

import GoodSuffixTable from "./GoodSuffixTable";
import BoyerMoore from "./BoyerMoore";

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
        const needle = "example";
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
                    <div className="row">
                        <div className="col-6">
                            <p>
                                The good suffix table tells us, given an index in the
                                pattern, the smallest shift distance that would align
                                a prefix of the pattern with the suffix of the pattern
                                that we have matched so far in the text.
                            </p>
                            <p>
                                For example, if the pattern is "example" then the good
                                suffix table is:
                            </p>
                            {/* Text-center will center the table because it is an inline-block element. */ }
                            <div className="text-center">
                                <GoodSuffixTable
                                    goodSuffixTable={BoyerMoore.makeGoodSuffixTable(needle)}
                                    /* An action is required for highlighting, but in this case we
                                     * don't want to highlight anything
                                     */
                                    action={{name: undefined}}
                                    needle={needle} />
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default GoodSuffixModal;
