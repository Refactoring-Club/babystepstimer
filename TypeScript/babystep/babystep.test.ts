const { CreateTimerHtml, getLastRemainingTime } = require("./babystep");

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
