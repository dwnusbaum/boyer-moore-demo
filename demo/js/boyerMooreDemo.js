var boyerMoore = require('lib/boyerMoore.js');

function searchLog(needle, haystack) {
    var log = [];
    var badCharTable = boyerMoore._makeBadCharTable(needle);
    var goodSuffixTable = boyerMoore._makeGoodSuffixTable(needle);

    var haystackIndex = needle.length - 1;
    var previousHaystackIndex = -1;
    var needleIndex = needle.length - 1;

    while (haystackIndex < haystack.length) {
        if (needleIndex < 0) {
            log.push({
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                name: 'MATCH'
            });
            return log;
        } else if (haystackIndex == previousHaystackIndex) {
            log.push({
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                name: 'GALIL_RULE_MATCH'
            });
            return log;
        } else if (needle.charAt(needleIndex) === haystack.charAt(haystackIndex)) {
            log.push({
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                name: 'COMPARE_EQUAL'
            });
            haystackIndex--;
            needleIndex--;
        } else {
            log.push({
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                name: 'COMPARE_NOT_EQUAL'
            });
            var badCharShift = badCharTable(haystack.charAt(haystackIndex));
            var goodSuffixShift = goodSuffixTable[needleIndex];
            var shift = Math.max(badCharShift, goodSuffixShift);

            if (shift >= needleIndex + 1) {
                /*log.push({
                    haystackIndex: haystackIndex,
                    needleIndex: needleIndex,
                    name: 'GALIL_RULE_UPDATE',
                    previousHaystackIndex: previousHaystackIndex
                });
                */
            }

            if (badCharShift > goodSuffixShift) {
                log.push({
                    haystackIndex: haystackIndex,
                    needleIndex: needleIndex,
                    name: 'SHIFT_BADCHAR_RULE',
                    shift: badCharShift
                });
            } else {
                log.push({
                    haystackIndex: haystackIndex,
                    needleIndex: needleIndex,
                    name: 'SHIFT_GOODSUFFIX_RULE',
                    shift: goodSuffixShift
                });
            }

            previousHaystackIndex = shift >= needleIndex + 1 ? haystackIndex : previousHaystackIndex;
            haystackIndex += shift;
            needleIndex = needle.length - 1;
        }
    }

    // No match found
    log.push({
        haystackIndex: haystackIndex,
        needleIndex: needleIndex,
        name: 'NO_MATCH'
    });

    return log;
}

module.exports = {
    searchLog: searchLog,
    makeBadCharTable: boyerMoore._makeBadCharTable,
    makeGoodSuffixTable: boyerMoore._makeGoodSuffixTable,
};
