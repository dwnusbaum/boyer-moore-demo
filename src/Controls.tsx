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
            <div className="margin-top-5">
                <button type="submit" onClick={this.props.onReset}>First Step</button>
                <button className="margin-left-10" type="submit" onClick={this.props.onPrevious}>Previous Step</button>
                <button className="margin-left-10" type="submit" onClick={this.props.onNext}>Next Step</button>
            </div>
        );
    }
}

export default Controls;
