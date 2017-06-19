import * as React from "react";
import * as Modal from "react-modal";

import BadCharTable from "./BadCharTable";
import { makeBadCharTable } from "./boyerMoore";
import { ModalState } from "./ModalState";

const modalStyle = {
    content : {
        maxHeight: "600px",
        maxWidth: "600px",
        width: "100%",
        margin: "auto auto",
    }
};

class BadCharModal extends React.Component<{}, ModalState> {
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
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={modalStyle}
                    contentLabel="Bad Character Rule Explanation"
                >
                    <div className="flex-row">
                        <div className="flex-row-item">
                            <h3>Bad Character Table</h3>
                        </div>
                        <div className="flex-row-right-item">
                            <button onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                    <div>
                        <p>
                            The bad character table tells us, given a mismatched
                            character from the haystack, the shift distance that would
                            align the rightmost instance of that character in the
                            needle with the mismatched character in the haystack.
                        </p>
                        <p>
                            For example, if the needle is "example" then the bad
                            character table is:
                        </p>
                        <div>
                            <BadCharTable
                                ruleTable={makeBadCharTable(needle)}
                                logEntry={null}
                                haystack=""
                                needle={needle} />
                        </div>
                        <p>
                            If we are comparing the haystack to the needle, and we
                            find an "m" that does not match the current character
                            in the needle, then we know that we must shift the
                            haystack index 3 characters to the right and reset the
                            needle index to 7 (aligning the "m"s) before the
                            needle could match the haystack.
                        </p>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default BadCharModal;
