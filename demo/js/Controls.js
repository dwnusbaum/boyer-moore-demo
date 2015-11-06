import React from "react";

class Controls extends React.Component {
    constructor() {
        super();
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }

    handleKeyDown(event) {
        var leftArrowKey = 37;
        var rightArrowKey = 39;

        if (event.keyCode === leftArrowKey) {
            this.props.onPrevious();
        } else if (event.keyCode === rightArrowKey) {
            this.props.onNext();
        }
        return;
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return (
            <div className="visualizationControls">
                <button type="submit" onClick={this.props.onReset}>Reset</button>
                <button className="margin-left-10" type="submit" onClick={this.props.onPrevious}>Previous</button>
                <button className="margin-left-10" type="submit" onClick={this.props.onNext}>Next</button>
            </div>
        );
    }
}

export default Controls;
