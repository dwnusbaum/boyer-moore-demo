var React = require("react");

function match () {
    var text = "We have passed the end of the pattern on the left, so the " +
               " pattern was found in the text.";

    return text;
}

function noMatch() {
    var text = "We have passed the end of the text on the right, so the " +
               " pattern was not found in the text.";

    return text;
}

function galilRuleUpdate(haystackIndex, needleIndex) {
    var text = "Store the current index in the text as the farthest we need " +
               "to compare the pattern according to the Galil Rule.";

    return text;
}

function galilRuleMatch(haystackIndex, needleIndex) {
    var text = "Because of the Galil Rule, we know that the rest of the " +
               "pattern will match, and so we have found the pattern in " +
               "the text";

    return text;
}

function compareEqual(haystackIndex, needleIndex) {
    var text = "The current character in the text and pattern match." +
               "We shift the pattern left by one and compare the next " +
               "character";

    return text;
}

function compareNotEqual(haystackIndex, needleIndex) {
    var text = "The current character in the text and pattern do not " +
               "match. We are going to shift the pattern to the right."

    return text;
}

function shiftBadCharRule(haystackIndex, needleIndex, shift) {
    var text = "The bad character rule is greater than the good suffix rule " +
               "in this case, and we shift the pattern right by " + shift +
               " characters";

    return text;
}

function shiftGoodSuffixRule(haystackIndex, needleIndex, shift) {
    var text = "The good suffix rule is greater than the bad character rule " +
               "in this case, and we shift the pattern right by " + shift +
               " characters";

    return text;
}


var texts = {
    MATCH: match,
    NO_MATCH: noMatch,
    GALIL_RULE_MATCH: galilRuleMatch,
    COMPARE_EQUAL: compareEqual,
    COMPARE_NOT_EQUAL: compareNotEqual,
    GALIL_RULE_UPDATE: galilRuleUpdate,
    SHIFT_BADCHAR_RULE: shiftBadCharRule,
    SHIFT_GOODSUFFIX_RULE: shiftGoodSuffixRule
};

var Explanation = React.createClass({
    render: function() {
        var action = this.props.action;

        return (
            <div className="explanation">
                <p>
                    {texts[action.name](action.haystackIndex, action.needleIndex, action.shift)}
                </p>
            </div>
        );
    }
});

module.exports = Explanation;
