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
            <div className="margin-top-5">
                <button type="submit" onClick={this.props.onReset}>First Step</button>
                <button className="margin-left-10" type="submit" onClick={this.props.onPrevious}>Previous Step</button>
                <button className="margin-left-10" type="submit" onClick={this.props.onNext}>Next Step</button>
            </div>
        );
    }
}

export default Controls;
