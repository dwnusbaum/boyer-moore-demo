describe("boyerMooreDemo.js", function() {
    var boyerMoore = require("../demo/js/BoyerMooreDemo.js");

    describe("boyerMooreDemo.js exports", function() {
        it("exports a function called searchLog", function() {
            expect(boyerMoore.searchLog).toBeDefined();
        });
    });

    describe("boyerMoore.js public api", function() {
        describe("boyerMoore.searchLog", function() {
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
                expect(boyerMoore.searchLog("ok", "ok")).toEqual(correctActionList);
            });
        });
    });
});
