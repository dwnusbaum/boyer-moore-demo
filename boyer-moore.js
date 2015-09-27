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
    for (var i = 0; i < needle.length; i++) {
        table[i] = 1;
    }
    return table;
}

function search(needle, haystack) {
    var badCharTable = makeBadCharTable(needle);
    var goodSuffixTable = makeGoodSuffixTable(needle);

    var haystackIndex = needle.length - 1;
    var needleIndex = needle.length - 1;

    while (haystackIndex < haystack.length) {
        if (needleIndex < 0) {
            return true;
        } else if (needle.charAt(needleIndex) === haystack.charAt(haystackIndex)) {
            haystackIndex--;
            needleIndex--;
        } else {
            haystackIndex += Math.max(badCharTable(haystack.charAt(haystackIndex)), goodSuffixTable[needleIndex]);
            needleIndex = needle.length - 1;
        }
    }

    // No match found, return false
    return false;
}

console.log(search("computer", "computer"));
console.log(search("muter", "computer"));
console.log(search("puter", "computer"));
