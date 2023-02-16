"use strict";
var _a = require("./babystep"), render = _a.render, getRemainingTimeCaption = _a.getRemainingTimeCaption;
var babystep = require("./babystep");
describe("CreateTimerHtml", function () {
    test("html for not running timer", function () {
        var htmlPart = /<a style="color: #\d+;" href="javascript:command\('start'\);">Start<\/a>/;
        expect(render("I'm a timer", "magenta", false)).toMatch(htmlPart);
    });
    test("html for running timer", function () {
        var htmlPart = '<a style="color: #555555;" href="javascript:command(\'stop\');">Stop</a> ' +
            '<a style="color: #555555;" href="javascript:command(\'reset\');">Reset</a>';
        expect(render("I'm a timer", "magenta", true)).toContain(htmlPart);
    });
});
describe("getRemainingTimeCaption", function () {
    describe("when elapsed time is zero", function () {
        it('returns the string "02:00"', function () {
            expect(getRemainingTimeCaption(0)).toBe("02:00");
        });
    });
    describe("when elapsed time is 120,000", function () {
        it('returns the string "00:00"', function () {
            expect(getRemainingTimeCaption(120000)).toBe("00:00");
        });
    });
    describe("when elapsed time is 30,000", function () {
        it('returns the string "01:30"', function () {
            expect(getRemainingTimeCaption(30000)).toBe("01:30");
        });
    });
});
describe("command", function () {
    it("calls startTimer when start is passed to command", function () {
        var mockStartTimer = jest.fn();
        babystep.command("start", mockStartTimer);
        expect(mockStartTimer).toHaveBeenCalled();
    });
    it("calls render when stop is passed to command", function () {
        var mockRender = jest.fn();
        babystep.command("stop", jest.fn(), mockRender);
        expect(mockRender).toHaveBeenCalled();
    });
    it("calls resetTimer when reset is passed to command", function () {
        var mockResetTimer = jest.fn();
        babystep.command("reset", jest.fn(), jest.fn(), mockResetTimer);
        expect(mockResetTimer).toHaveBeenCalled();
    });
    it("calls quitTimer when quit is passed to command", function () {
        var mockQuitTimer = jest.fn();
        babystep.command("quit", jest.fn(), jest.fn(), jest.fn(), mockQuitTimer);
        expect(mockQuitTimer).toHaveBeenCalled();
    });
});
