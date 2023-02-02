const { CreateTimerHtml, getRemainingTimeCaption } = require("./babystep");

describe("CreateTimerHtml", () => {
  test("html for not running timer", () => {
    const htmlPart =
      /<a style="color: #\d+;" href="javascript:command\('start'\);">Start<\/a>/;
    expect(CreateTimerHtml("I'm a timer", "magenta", false)).toMatch(htmlPart);
  });

  test("html for running timer", () => {
    const htmlPart =
      '<a style="color: #555555;" href="javascript:command(\'stop\');">Stop</a> ' +
      '<a style="color: #555555;" href="javascript:command(\'reset\');">Reset</a>';
    expect(CreateTimerHtml("I'm a timer", "magenta", true)).toContain(htmlPart);
  });
});

describe('getRemainingTimeCaption', () => {
  describe('when elapsed time is zero', () => {
    it('returns the string "02:00"', () => {
      expect(getRemainingTimeCaption(0)).toBe("02:00");
    });
  });

  describe('when elapsed time is 120,000', () => {
    it('returns the string "00:00"', () => {
      expect(getRemainingTimeCaption(120000)).toBe("00:00");
    });
  });

  describe('when elapsed time is 30,000', () => {
    it('returns the string "01:30"', () => {
      expect(getRemainingTimeCaption(30000)).toBe("01:30");
    });
  });
});
