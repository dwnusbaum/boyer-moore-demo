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
            <form onSubmit={this.handleSubmit}>
                <label htmlFor="haystackInput">Haystack</label>
                <input
                    type="text"
                    placeholder="Here is a simple example."
                    id="haystackInput"
                    ref={(input) => this.haystackInput = input }
                />
                <label htmlFor="needleInput">Needle</label>
                <input
                    type="text"
                    placeholder="example"
                    id="needleInput"
                    ref={(input) => this.needleInput = input }
                />
                <button type="submit" className="button">Search</button>
            </form>
        );
    }
}

export default SearchForm;
