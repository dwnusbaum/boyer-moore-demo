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
