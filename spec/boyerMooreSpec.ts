import {
    getSuffixLength,
    makeBadCharTable,
    makeGoodSuffixTable,
    search,
    SearchAction,
} from "../src/boyerMoore";

describe("boyerMoore.js", function() {
    describe("boyerMoore.js exports", function() {
        it("exports a function called search", function() {
            expect(search).toBeDefined();
        });

        it("exports a function called makeBadCharTable", function() {
            expect(makeBadCharTable).toBeDefined();
        });

        it("exports a function called makeGoodSuffixTable", function() {
            expect(makeGoodSuffixTable).toBeDefined();
        });

        it("exports a function called getSuffixLength", function() {
            expect(makeGoodSuffixTable).toBeDefined();
        });
    });

    // TODO(dnusbaum): Use property based testing instead of hand-picked test cases.
    describe("boyerMoore.js public api", function() {
        describe("boyerMoore.search", function() {
            it("finds \"computer\" in \"computer\"", function() {
                expect(search("computer", "computer").isMatch).toBe(true);
            });

            it("finds \"puter\" in \"computer\"", function() {
                expect(search("puter", "computer").isMatch).toBe(true);
            });

            it("finds the empty string in any string", function() {
                expect(search("", "computer").isMatch).toBe(true);
                expect(search("", "").isMatch).toBe(true);
            });

            it("does not find \"muter\" in \"computer\"", function() {
                expect(search("muter", "computer").isMatch).toBe(false);
            });

            it("does not find a ('z' followed by 'a's) in (a string of all 'a's)", function() {
                var needle = "zaaaaaaaaaaaaaa";
                var haystack = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
                expect(search(needle, haystack).isMatch).toBe(false);
            });

            it("returns the correct log for a simple match", function() {
                var correctActionList = [
                    {
                        comparisons: 1,
                        haystackIndex: 1,
                        needleIndex: 1,
                        action: SearchAction.COMPARE_EQUAL,
                    },
                    {
                        comparisons: 2,
                        haystackIndex: 0,
                        needleIndex: 0,
                        action: SearchAction.COMPARE_EQUAL,
                    },
                    {
                        comparisons: 2,
                        haystackIndex: -1,
                        needleIndex: -1,
                        action: SearchAction.MATCH,
                    }
                ];
                var result = search("ok", "ok");
                expect(result.isMatch).toEqual(true);
                expect(result.log).toEqual(correctActionList);
            });

            it("returns the correct log for a complicated match", function() {
                var correctActionList = [
                    {
                        comparisons: 1,
                        haystackIndex: 1,
                        needleIndex: 1,
                        action: SearchAction.COMPARE_EQUAL,
                    },
                    {
                        comparisons: 2,
                        haystackIndex: 0,
                        needleIndex: 0,
                        action: SearchAction.SHIFT,
                    },
                    {
                        comparisons: 3,
                        haystackIndex: 3,
                        needleIndex: 1,
                        action: SearchAction.COMPARE_EQUAL,
                    },
                    {
                        comparisons: 4,
                        haystackIndex: 2,
                        needleIndex: 0,
                        action: SearchAction.COMPARE_EQUAL,
                    },
                    {
                        comparisons: 4,
                        haystackIndex: 1,
                        needleIndex: -1,
                        action: SearchAction.MATCH,
                    }
                ];
                var result = search("ab", "cbab");
                expect(result.isMatch).toEqual(true);
                expect(result.log).toEqual(correctActionList);
            });

            it("returns the correct log for a non-match", function() {
                var correctActionList = [
                    {
                        comparisons: 1,
                        haystackIndex: 1,
                        needleIndex: 1,
                        action: SearchAction.COMPARE_EQUAL,
                    },
                    {
                        comparisons: 2,
                        haystackIndex: 0,
                        needleIndex: 0,
                        action: SearchAction.SHIFT,
                    },
                    {
                        comparisons: 3,
                        haystackIndex: 3,
                        needleIndex: 1,
                        action: SearchAction.SHIFT,
                    },
                    {
                        comparisons: 3,
                        haystackIndex: 5,
                        needleIndex: 1,
                        action: SearchAction.NO_MATCH,
                    }
                ];
                expect(search("ab", "cbba").log).toEqual(correctActionList);
            });
        });

        describe("boyerMoore.makeBadCharTable", function() {
            it ("creates the proper table for \"abcda\"", function() {
                var needle = "abcda";
                var rightmost: { [index: string]: number } = {
                    a: 4,
                    b: 1,
                    c: 2,
                    d: 3,
                };
                var table = makeBadCharTable(needle);
                needle.split("").forEach(function(character) {
                    expect(table(character)).toEqual(needle.length - 1 - rightmost[character]);
                });
                expect(table("other")).toEqual(needle.length);
            });
        });

        describe("boyerMoore.makeGoodSuffixTable", function() {
            it("creates the proper table for \"abcxxxabc\"", function() {
                var correctTable = [14, 13, 12, 11, 10, 9, 11, 10, 1];
                expect(makeGoodSuffixTable("abcxxxabc")).toEqual(correctTable);
            });

            it("creates the proper table for \"abyxcdeyx\"", function() {
                var correctTable = [17, 16, 15, 14, 13, 12, 7, 10, 1];
                expect(makeGoodSuffixTable("abyxcdeyx")).toEqual(correctTable);
            });
        });

        describe("boyerMoore.getSuffixLength", function() {
            it("finds the correct suffix length for \"abcd\"", function() {
                expect(getSuffixLength("abcd", 0)).toEqual(0);
                expect(getSuffixLength("abcd", 1)).toEqual(0);
                expect(getSuffixLength("abcd", 2)).toEqual(0);
                expect(getSuffixLength("abcd", 3)).toEqual(4);
            });

            it("finds the correct suffix length for \"abbb\"", function() {
                expect(getSuffixLength("abbb", 0)).toEqual(0);
                expect(getSuffixLength("abbb", 1)).toEqual(1);
                expect(getSuffixLength("abbb", 2)).toEqual(2);
                expect(getSuffixLength("abbb", 3)).toEqual(4);
            });

            it("finds the correct suffix length for \"abcb\"", function() {
                expect(getSuffixLength("abcb", 0)).toEqual(0);
                expect(getSuffixLength("abcb", 1)).toEqual(1);
                expect(getSuffixLength("abcb", 2)).toEqual(0);
                expect(getSuffixLength("abcb", 3)).toEqual(4);
            });

            it("finds the correct suffix length for \"abab\"", function() {
                expect(getSuffixLength("abab", 0)).toEqual(0);
                expect(getSuffixLength("abab", 1)).toEqual(2);
                expect(getSuffixLength("abab", 2)).toEqual(0);
                expect(getSuffixLength("abab", 3)).toEqual(4);
            });
        });
    });
});
