import * as React from "react";
import * as Modal from "react-modal";

import BadCharTable from "./BadCharTable";
import { makeHorspoolTable } from "./boyerMoore";
import { ModalState } from "./ModalState";

const modalStyle = {
    content : {
        maxHeight: "600px",
        maxWidth: "600px",
        width: "100%",
        margin: "auto auto",
    }
};

class HorspoolModal extends React.Component<{}, ModalState> {
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
                    <a href="#" onClick={this.openModal}>Horspool Shift Table</a>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={modalStyle}
                    contentLabel="Horspool Shift Table Explanation"
                >
                    <div className="flex-row">
                        <div className="flex-row-item">
                            <h3>Horspool Shift Table</h3>
                        </div>
                        <div className="flex-row-right-item">
                            <button onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                    <div>
                        <p>
                            Horspool's variant drops the good suffix rule and
                            simplifies the bad character rule. On a mismatch, it
                            always looks at the haystack character aligned with
                            the <em>last</em> character of the needle, no matter
                            where the mismatch occurred, and shifts the needle so
                            that the rightmost occurrence of that character in the
                            needle (excluding the last position) lines up with it.
                        </p>
                        <p>
                            For example, if the needle is "example" then the
                            Horspool shift table is:
                        </p>
                        <div>
                            <BadCharTable
                                ruleTable={makeHorspoolTable(needle)}
                                logEntry={null}
                                haystack=""
                                needle={needle} />
                        </div>
                        <p>
                            Note that the "e" maps to 6 rather than 0: the final
                            "e" of the needle is ignored, so the shift is always
                            at least 1.
                        </p>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default HorspoolModal;
