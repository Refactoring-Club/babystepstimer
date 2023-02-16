const { render, getRemainingTimeCaption } = require("./babystep");
const babystep = require("./babystep");

describe("CreateTimerHtml", () => {
  test("html for not running timer", () => {
    const htmlPart =
      /<a style="color: #\d+;" href="javascript:command\('start'\);">Start<\/a>/;
    expect(render("I'm a timer", "magenta", false)).toMatch(htmlPart);
  });

  test("html for running timer", () => {
    const htmlPart =
      '<a style="color: #555555;" href="javascript:command(\'stop\');">Stop</a> ' +
      '<a style="color: #555555;" href="javascript:command(\'reset\');">Reset</a>';
    expect(render("I'm a timer", "magenta", true)).toContain(htmlPart);
  });
});

describe("getRemainingTimeCaption", () => {
  describe("when elapsed time is zero", () => {
    it('returns the string "02:00"', () => {
      expect(getRemainingTimeCaption(0)).toBe("02:00");
    });
  });

  describe("when elapsed time is 120,000", () => {
    it('returns the string "00:00"', () => {
      expect(getRemainingTimeCaption(120000)).toBe("00:00");
    });
  });

  describe("when elapsed time is 30,000", () => {
    it('returns the string "01:30"', () => {
      expect(getRemainingTimeCaption(30000)).toBe("01:30");
    });
  });
});

describe("command", () => {
  it("calls startTimer when start is passed to command", () => {
    const mockStartTimer = jest.fn();

    babystep.command("start", mockStartTimer);

    expect(mockStartTimer).toHaveBeenCalled();
  });

  it("calls render when stop is passed to command", () => {
    const mockRender = jest.fn();

    babystep.command("stop", jest.fn(), mockRender);

    expect(mockRender).toHaveBeenCalled();
  });

  it("calls resetTimer when reset is passed to command", () => {
    const mockResetTimer = jest.fn();

    babystep.command("reset", jest.fn(), jest.fn(), mockResetTimer);

    expect(mockResetTimer).toHaveBeenCalled();
  });
});
