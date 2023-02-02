"use strict";
var _a = require("./babystep"), CreateTimerHtml = _a.CreateTimerHtml, getRemainingTimeCaption = _a.getRemainingTimeCaption;
describe("CreateTimerHtml", function () {
    test("html for not running timer", function () {
        var htmlPart = /<a style="color: #\d+;" href="javascript:command\('start'\);">Start<\/a>/;
        expect(CreateTimerHtml("I'm a timer", "magenta", false)).toMatch(htmlPart);
    });
    test("html for running timer", function () {
        var htmlPart = '<a style="color: #555555;" href="javascript:command(\'stop\');">Stop</a> ' +
            '<a style="color: #555555;" href="javascript:command(\'reset\');">Reset</a>';
        expect(CreateTimerHtml("I'm a timer", "magenta", true)).toContain(htmlPart);
    });
});
describe('getRemainingTimeCaption', function () {
    describe('when elapsed time is zero', function () {
        it('returns the string "02:00"', function () {
            expect(getRemainingTimeCaption(0)).toBe("02:00");
        });
    });
    describe('when elapsed time is 120,000', function () {
        it('returns the string "00:00"', function () {
            expect(getRemainingTimeCaption(120000)).toBe("00:00");
        });
    });
});
