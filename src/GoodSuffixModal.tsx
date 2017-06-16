import * as React from "react";
import * as Modal from "react-modal";

import GoodSuffixTable from "./GoodSuffixTable";
import { makeGoodSuffixTable } from "./boyerMoore";
import { ModalState } from "./ModalState";
import Haystack from "./Haystack";
import Needle from "./Needle";
import Pointer from "./Pointer";

const modalStyle = {
    content : {
        maxHeight: "600px",
        maxWidth: "600px",
        margin: "auto auto",
    }
};

class GoodSuffixModal extends React.Component<{}, ModalState> {
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
        const haystack = "__angled example"
        const needle = "example";
        return (
            <div>
                <div>
                    <a href="#" onClick={this.openModal}>Good Suffix Table</a>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={modalStyle}
                    contentLabel="Good Suffix Rule Explanation"
                >
                    <div className="flex-row">
                        <div className="flex-row-item">
                            <h3>Good Suffix Table</h3>
                        </div>
                        <div className="flex-row-right-item">
                            <button onClick={this.closeModal}>Close</button>
                        </div>
                    </div>
                    <div>
                        <p>
                            The good suffix table tells us, given an index in the
                            needle, the smallest shift distance that would align
                            a prefix of the needle with the largest suffix of the
                            needle that has been matched so far in the haystack.
                        </p>
                        <p>
                            For example, if the needle is "example" then the good
                            suffix table is:
                        </p>
                        <div>
                            <GoodSuffixTable
                                ruleTable={makeGoodSuffixTable(needle)}
                                /* An action is required for highlighting, but in this case we
                                    * don't want to highlight anything
                                    */
                                logEntry={null}
                                haystack={""}
                                needle={needle} />
                        </div>
                        <p>
                            And if the search is in the following state:
                        </p>
                        <div>
                            <pre>
                                <Haystack
                                    haystack={haystack}
                                    haystackIndex={4}
                                    matchLength={3}
                                    currentCharsMatch={false} />
                                <Needle
                                    needle={needle}
                                    haystackIndex={4}
                                    matchLength={3}
                                    currentCharsMatch={false} />
                                <Pointer haystackIndex={4} />
                            </pre>
                        </div>
                        <p>
                            Then the good suffix table value at index 4 (8) is
                            the shift distance that will align the first 'e' in
                            the needle with the 'e' that was already matched in
                            the haystack.
                        </p>
                        <div>
                            <pre>
                                <Haystack
                                    haystack={haystack}
                                    haystackIndex={12}
                                    matchLength={1}
                                    currentCharsMatch={false} />
                                <Needle
                                    needle={needle}
                                    haystackIndex={12}
                                    matchLength={1}
                                    currentCharsMatch={false} />
                                <Pointer haystackIndex={12} />
                            </pre>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
};

export default GoodSuffixModal;
