import * as React from "react";
import * as ReactDOM from "react-dom";

export interface SearchFormProps {
    onHaystackAndNeedleSubmit: (haystack: string, needle: string) => void;
}

class SearchForm extends React.Component<SearchFormProps, void> {
    private haystackInput: HTMLInputElement|null;
    private needleInput: HTMLInputElement|null;

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.haystackInput = null;
        this.needleInput = null;
    }

    handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
        event.preventDefault();
        if (this.haystackInput && this.needleInput) {
            const haystack = this.haystackInput.value.trim();
            const needle = this.needleInput.value.trim();
            if (haystack && needle) {
                this.props.onHaystackAndNeedleSubmit(haystack, needle);
                this.haystackInput.value = '';
                this.needleInput.value = '';
            }
        }
    }

    render(): JSX.Element {
        return (
            <div className="row">
                <div className="col-6">
                    <form className="form-inline" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label>Text: </label>
                            <input
                                type="text"
                                className="margin-left-10 input-lg"
                                placeholder="Here is a simple example."
                                ref={(input) => this.haystackInput = input }
                            />
                        </div>
                        <div className="form-group margin-left-10">
                            <label>Pattern: </label>
                            <input
                                type="text"
                                className="margin-left-10"
                                placeholder="example"
                                ref={(input) => this.needleInput = input }
                            />
                        </div>
                        <button type="submit" className="margin-left-10">Begin Search</button>
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchForm;
