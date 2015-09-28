describe("Boyer-Moore string search algorithm", function() {
    var bm = require("../boyer-moore.js");

    describe("boyer-moore.js exports", function() {
        it("exports a function called search", function() {
            expect(bm.search).toBeDefined();
        });

        it("exports a function called _makeBadCharTable", function() {
            expect(bm._makeBadCharTable).toBeDefined();
        });

        it("exports a function called _makeGoodSuffixTable", function() {
            expect(bm._makeGoodSuffixTable).toBeDefined();
        });

        it("exports a function called _getSuffixLength", function() {
            expect(bm._makeGoodSuffixTable).toBeDefined();
        });
    });

    describe("boyer-moore.js public api", function() {
        describe("boyer-moore.search", function() {
            it("finds \"computer\" in \"computer\"", function() {
                expect(bm.search("computer", "computer")).toBe(true);
            });

            it("find \"puter\" in \"computer\"", function() {
                expect(bm.search("puter", "computer")).toBe(true);
            });

            it("finds the empty string in any string", function() {
                expect(bm.search("", "computer")).toBe(true);
                expect(bm.search("", "")).toBe(true);
            });

            it("does not find \"muter\" in \"computer\"", function() {
                expect(bm.search("muter", "computer")).toBe(false);
            });

            it("does not find a ('z' followed by 'a's) in (a string of all 'a's)", function() {
                expect(bm.search("zaaaaaaaaaaaaa", "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")).toBe(false);
            });
        });
    });

    describe("boyer-moore.js private api", function() {
        describe("_makeBadCharTable", function() {
            it ("creates the proper table for \"abcd\"", function() {
                var correctTable = {
                    a: 3,
                    b: 2,
                    c: 1,
                    d: 0,
                };
                var table = bm._makeBadCharTable("abcd");
                expect(table("a")).toEqual(correctTable["a"]);
                expect(table("b")).toEqual(correctTable["b"]);
                expect(table("c")).toEqual(correctTable["c"]);
                expect(table("d")).toEqual(correctTable["d"]);
                expect(table("e")).toEqual("abcd".length);
            });
        });

        describe("_makeGoodSuffixTable", function() {
            it("creates the proper table for \"abcxxxabc\"", function() {
                var correctTable = [14, 13, 12, 11, 10, 9, 11, 10, 1];
                expect(bm._makeGoodSuffixTable("abcxxxabc")).toEqual(correctTable);
            });

            it("creates the proper table for \"abyxcdeyx\"", function() {
                var correctTable = [17, 16, 15, 14, 13, 12, 7, 10, 1];
                expect(bm._makeGoodSuffixTable("abyxcdeyx")).toEqual(correctTable);
            });
        });
    });
});
