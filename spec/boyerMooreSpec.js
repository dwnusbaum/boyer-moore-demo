describe("boyerMoore.js", function() {
    var boyerMoore = require("lib/boyerMoore.js");

    describe("boyerMoore.js exports", function() {
        it("exports a function called search", function() {
            expect(boyerMoore.search).toBeDefined();
        });

        it("exports a function called _makeBadCharTable", function() {
            expect(boyerMoore._makeBadCharTable).toBeDefined();
        });

        it("exports a function called _makeGoodSuffixTable", function() {
            expect(boyerMoore._makeGoodSuffixTable).toBeDefined();
        });

        it("exports a function called _getSuffixLength", function() {
            expect(boyerMoore._makeGoodSuffixTable).toBeDefined();
        });
    });

    describe("boyerMoore.js public api", function() {
        describe("boyerMoore.search", function() {
            it("finds \"computer\" in \"computer\"", function() {
                expect(boyerMoore.search("computer", "computer")).toBe(true);
            });

            it("find \"puter\" in \"computer\"", function() {
                expect(boyerMoore.search("puter", "computer")).toBe(true);
            });

            it("finds the empty string in any string", function() {
                expect(boyerMoore.search("", "computer")).toBe(true);
                expect(boyerMoore.search("", "")).toBe(true);
            });

            it("does not find \"muter\" in \"computer\"", function() {
                expect(boyerMoore.search("muter", "computer")).toBe(false);
            });

            it("does not find a ('z' followed by 'a's) in (a string of all 'a's)", function() {
                expect(boyerMoore.search("zaaaaaaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")).toBe(false);
            });
        });
    });

    describe("boyerMoore.js private api", function() {
        describe("boyerMoore._makeBadCharTable", function() {
            it ("creates the proper table for \"abcd\"", function() {
                var correctTable = {
                    a: 3,
                    b: 2,
                    c: 1,
                    d: 0,
                };
                var table = boyerMoore._makeBadCharTable("abcd");
                expect(table("a")).toEqual(correctTable["a"]);
                expect(table("b")).toEqual(correctTable["b"]);
                expect(table("c")).toEqual(correctTable["c"]);
                expect(table("d")).toEqual(correctTable["d"]);
                expect(table("e")).toEqual("abcd".length);
            });
        });

        describe("boyerMoore._makeGoodSuffixTable", function() {
            it("creates the proper table for \"abcxxxabc\"", function() {
                var correctTable = [14, 13, 12, 11, 10, 9, 11, 10, 1];
                expect(boyerMoore._makeGoodSuffixTable("abcxxxabc")).toEqual(correctTable);
            });

            it("creates the proper table for \"abyxcdeyx\"", function() {
                var correctTable = [17, 16, 15, 14, 13, 12, 7, 10, 1];
                expect(boyerMoore._makeGoodSuffixTable("abyxcdeyx")).toEqual(correctTable);
            });
        });
    });
});
