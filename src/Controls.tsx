import * as React from "react";

export interface ControlsProps {
    onNext: () => void;
    onPrevious: () => void;
    onReset: () => void;
}

const LEFT_ARROW_KEY = 37;
const RIGHT_ARROW_KEY = 39;

class Controls extends React.Component<ControlsProps, void> {
    constructor() {
        super();
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event: KeyboardEvent): void {
        if (event.keyCode === LEFT_ARROW_KEY) {
            this.props.onPrevious();
        } else if (event.keyCode === RIGHT_ARROW_KEY) {
            this.props.onNext();
        }
    }

    componentDidMount() {
        // TODO(dnusbaum): These global listeners trigger even if someone is
        // navigating left and right in a text input. Maybe they should only
        // trigger when the SearchForm inputs don't have focus?
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return (
            <div className="flex-row">
                <div style={{marginTop: 0, marginBottom: 0, marginLeft: "1em", marginRight: 0}}>
                    <button type="submit" className="button button-outline" onClick={this.props.onPrevious}>Previous Step</button>
                </div>
                <div className="flex-row-item">
                    <button type="submit" className="button" onClick={this.props.onNext}>Next Step</button>
                </div>
                <div className="flex-row-right-item">
                    <button type="submit" className="button button-outline" onClick={this.props.onReset}>Reset</button>
                </div>
            </div>
        );
    }
}

export default Controls;
