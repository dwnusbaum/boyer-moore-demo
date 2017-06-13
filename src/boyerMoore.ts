export interface BadCharTable {
    (badChar: string): number;
}

export type GoodSuffixTable = number[];

export enum SearchAction {
    COMPARE_EQUAL,
    GALIL_RULE_MATCH,
    MATCH,
    NO_MATCH,
    SHIFT,
}

export interface SearchLogEntry {
    comparisons: number;
    haystackIndex: number;
    needleIndex: number;
    action: SearchAction;
}

export interface SearchResult {
    isMatch: boolean;
    log: SearchLogEntry[];
}

export function search(needle: string, haystack: string): SearchResult {
    var log: SearchLogEntry[] = [];
    var comparisons = 0;
    var badCharTable = makeBadCharTable(needle);
    var goodSuffixTable = makeGoodSuffixTable(needle);

    var haystackIndex = needle.length - 1;
    var previousHaystackIndex = -1;
    var needleIndex = needle.length - 1;

    while (haystackIndex < haystack.length) {
        if (needleIndex < 0) {
            log.push({
                comparisons: comparisons,
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                action: SearchAction.MATCH,
            });
            return { isMatch: true, log: log };
        } else if (haystackIndex == previousHaystackIndex) {
            log.push({
                comparisons: comparisons,
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                action: SearchAction.GALIL_RULE_MATCH,
            });
            return { isMatch: true, log: log };
        } else if (needle.charAt(needleIndex) === haystack.charAt(haystackIndex)) {
            comparisons++;
            log.push({
                comparisons: comparisons,
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                action: SearchAction.COMPARE_EQUAL,
            });
            haystackIndex--;
            needleIndex--;
        } else {
            comparisons++;
            var badCharShift = badCharTable(haystack.charAt(haystackIndex));
            var goodSuffixShift = goodSuffixTable[needleIndex];
            var shift = Math.max(badCharShift, goodSuffixShift);

            log.push({
                comparisons: comparisons,
                haystackIndex: haystackIndex,
                needleIndex: needleIndex,
                action: SearchAction.SHIFT,
            });

            previousHaystackIndex = shift >= needleIndex + 1 ? haystackIndex : previousHaystackIndex;
            haystackIndex += shift;
            needleIndex = needle.length - 1;
        }
    }

    log.push({
        comparisons: comparisons,
        haystackIndex: haystackIndex,
        needleIndex: needleIndex,
        action: SearchAction.NO_MATCH,
    });

    return { isMatch: false, log: log };
}

export function makeBadCharTable(needle: string): BadCharTable {
    var rightmostIndex: { [index: string]: number } = {};
    for (var i = 0; i < needle.length; i++) {
        rightmostIndex[needle.charAt(i)] = i;
    }

    var lookup = function(badChar: string): number {
        if (rightmostIndex[badChar]) {
            return needle.length - 1 - rightmostIndex[badChar];
        } else {
            return needle.length;
        }
    }

    return lookup;
}

export function makeGoodSuffixTable(needle: string): GoodSuffixTable {
    var table = []
    var lastPrefixIndex = needle.length - 1;

    // Case 1. Suffix appears in needle
    for (var i = needle.length - 1; i >= 0; i--) {
        if (needle.indexOf(needle.substring(i + 1)) === 0) {
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
export function getSuffixLength(needle: string, index: number): number {
    var suffixLength = 0;
    for (var i = index; i >= 0 && needle.charAt(i) == needle.charAt(needle.length - 1 - index + i); i--) {
        suffixLength += 1;
    }

    return suffixLength;
}
