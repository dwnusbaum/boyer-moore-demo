describe("Boyer-Moore string search algorithm", function() {
    var bm = require("../boyer-moore.js");

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
