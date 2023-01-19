const { CreateTimerHtml } = require("./babystep");

describe("createHtml", () => {
  test("returns html", () => {
    const html =
      '<div style="border: 3px solid #555555; background: magenta; margin: 0; padding: 0;"><h1 style="text-align: center; font-size: 30px; color: magenta;">I\'m a timer</h1><div style="text-align: center"><a style="color: #555555;" href="javascript:command(\'start\');">Start</a> <a style="color: #555555;" href="javascript:command(\'quit\');">Quit</a> </div></div>';
    expect(CreateTimerHtml("I'm a timer", "magenta", false)).toBe(html);
  });
});
