describe("boyerMoore.js", function() {
    var boyerMoore = require("../src/boyerMoore.js");

    describe("boyerMoore.js exports", function() {
        it("exports a function called search", function() {
            expect(boyerMoore.search).toBeDefined();
        });

        it("exports a function called _makeBadCharTable", function() {
            expect(boyerMoore.makeBadCharTable).toBeDefined();
        });

        it("exports a function called _makeGoodSuffixTable", function() {
            expect(boyerMoore.makeGoodSuffixTable).toBeDefined();
        });

        it("exports a function called _getSuffixLength", function() {
            expect(boyerMoore.makeGoodSuffixTable).toBeDefined();
        });
    });

    describe("boyerMoore.js public api", function() {
        describe("boyerMoore.search", function() {
            it("finds \"computer\" in \"computer\"", function() {
                expect(boyerMoore.search("computer", "computer").isMatch).toBe(true);
            });

            it("finds \"puter\" in \"computer\"", function() {
                expect(boyerMoore.search("puter", "computer").isMatch).toBe(true);
            });

            it("finds the empty string in any string", function() {
                expect(boyerMoore.search("", "computer").isMatch).toBe(true);
                expect(boyerMoore.search("", "").isMatch).toBe(true);
            });

            it("does not find \"muter\" in \"computer\"", function() {
                expect(boyerMoore.search("muter", "computer").isMatch).toBe(false);
            });

            it("does not find a ('z' followed by 'a's) in (a string of all 'a's)", function() {
                var needle = "zaaaaaaaaaaaaaa";
                var haystack = "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa";
                expect(boyerMoore.search(needle, haystack).isMatch).toBe(false);
            });

            it("returns the correct log for a search", function() {
                var correctActionList = [
                    {
                        comparisons: 1,
                        haystackIndex: 1,
                        needleIndex: 1,
                        name: 'COMPARE_EQUAL'
                    },
                    {
                        comparisons: 2,
                        haystackIndex: 0,
                        needleIndex: 0,
                        name: 'COMPARE_EQUAL'
                    },
                    {
                        comparisons: 2,
                        haystackIndex: -1,
                        needleIndex: -1,
                        name: 'MATCH'
                    }
                ];
                expect(boyerMoore.search("ok", "ok").log).toEqual(correctActionList);
            });
        });
    });

    describe("boyerMoore.js private api", function() {
        describe("boyerMoore._makeBadCharTable", function() {
            it ("creates the proper table for \"abcda\"", function() {
                var needle = "abcda";
                var rightmost = {
                    a: 4,
                    b: 1,
                    c: 2,
                    d: 3,
                };
                var table = boyerMoore.makeBadCharTable(needle);
                needle.split("").forEach(function(character) {
                    expect(table(character)).toEqual(needle.length - 1 - rightmost[character]);
                });
                expect(table("other")).toEqual(needle.length);
            });
        });

        describe("boyerMoore._makeGoodSuffixTable", function() {
            it("creates the proper table for \"abcxxxabc\"", function() {
                var correctTable = [14, 13, 12, 11, 10, 9, 11, 10, 1];
                expect(boyerMoore.makeGoodSuffixTable("abcxxxabc")).toEqual(correctTable);
            });

            it("creates the proper table for \"abyxcdeyx\"", function() {
                var correctTable = [17, 16, 15, 14, 13, 12, 7, 10, 1];
                expect(boyerMoore.makeGoodSuffixTable("abyxcdeyx")).toEqual(correctTable);
            });
        });
    });
});
