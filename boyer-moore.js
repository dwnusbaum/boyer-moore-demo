"use strict";

function search(needle, haystack) {
    var badCharTable = makeBadCharTable(needle);
    var goodSuffixTable = makeGoodSuffixTable(needle);

    var haystackIndex = needle.length - 1;
    var previousHaystackIndex = -1;
    var needleIndex = needle.length - 1;


    while (haystackIndex < haystack.length) {
        if (needleIndex < 0 || haystackIndex == previousHaystackIndex) {
            return true;
        } else if (needle.charAt(needleIndex) === haystack.charAt(haystackIndex)) {
            haystackIndex--;
            needleIndex--;
        } else {
            var shift = Math.max(badCharTable(haystack.charAt(haystackIndex)), goodSuffixTable[needleIndex]);
            previousHaystackIndex = shift >= needleIndex + 1 ? haystackIndex : previousHaystackIndex;
            haystackIndex += shift;
            needleIndex = needle.length - 1;
        }
    }

    // No match found, return false
    return false;
}

function makeBadCharTable(needle) {
    var table = [];
    for (var i = 0; i < needle.length; i++) {
        table[needle.charAt(i)] = i;
    }

    var lookup = function(badChar) {
        if (table[badChar] === undefined) {
            return needle.length;
        } else {
            return needle.length - 1 - table[badChar];
        }
    }

    return lookup;
}

function makeGoodSuffixTable(needle) {
    var table = []
    var lastPrefixIndex = needle.length - 1;

    // Case 1. Suffix appears in needle
    for (var i = needle.length - 1; i >= 0; i--) {
        if (needle.startsWith(needle.substring(i + 1))) {
            lastPrefixIndex = i + 1;
        }
        table[i] = lastPrefixIndex + (needle.length - 1 - i);
    }

    // Case 2. Prefix of suffix appears in needle
    for (var i = 0; i < needle.length - 1; i++) {
        var suffixLength = getSuffixLength(needle, i);

        if (needle.charAt(i - suffixLength) !== needle.charAt(needle.length - 1 - suffixLength)) {
            table[needle.length - 1 - suffixLength] = needle.length - 1 - i + suffixLength;
        }
    }

    return table;
}

// Returns the length of the longest suffix of needle that ends on needle[index]
function getSuffixLength(needle, index) {
    var suffixLength = 0;
    for (var i = index; i >= 0 && needle.charAt(i) == needle.charAt(needle.length - 1 - index + i); i--) {
        suffixLength += 1;
    }

    return suffixLength;
}

module.exports = {
    search: search,
    _makeBadCharTable: makeBadCharTable,
    _makeGoodSuffixTable: makeGoodSuffixTable,
    _getSuffixLength: getSuffixLength
};
