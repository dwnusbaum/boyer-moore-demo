describe("boyerMooreDemo.js", function() {
    var boyerMoore = require("../app/js/boyerMooreDemo.js");

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
                        haystackIndex: 1,
                        needleIndex: 1,
                        action: 'COMPARE_EQUAL'
                    },
                    {
                        haystackIndex: 0,
                        needleIndex: 0,
                        action: 'COMPARE_EQUAL'
                    },
                    {
                        haystackIndex: -1,
                        needleIndex: -1,
                        action: 'MATCH'
                    }
                ];
                expect(boyerMoore.searchLog("ok", "ok")).toEqual(correctActionList);
            });
        });
    });
});
