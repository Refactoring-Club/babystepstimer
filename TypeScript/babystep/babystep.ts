const BackgroundColorNeutral: string = "#ffffff";
const BackgroundColorFailed: string = "#ffcccc";
const BackgroundColorPassed: string = "#ccffcc";
const SecondsInCycle: number = 120;

let _timerRunning: boolean;
let _currentCycleStartTime: number;
let _lastRemainingTime: string;
let _bodyBackgroundColor: string = BackgroundColorNeutral;
let _threadTimer: NodeJS.Timer;

document.body.innerHTML = render(
  getRemainingTimeCaption(0),
  BackgroundColorNeutral,
  false
);

function command(
  arg: string,
  startCommandHandler = startTimer,
  stopCommandHandler = stopTimer
): void {
  let args = { Url: { AbsoluteUri: `command://${arg}/` } };
  console.log("called", arg, args.Url.AbsoluteUri);
  if (args.Url.AbsoluteUri == "command://start/") {
    startCommandHandler();
  } else if (args.Url.AbsoluteUri == "command://stop/") {
    stopCommandHandler();
  } else if (args.Url.AbsoluteUri == "command://reset/") {
    _currentCycleStartTime = Date.now();
    _bodyBackgroundColor = BackgroundColorPassed;
  } else if (args.Url.AbsoluteUri == "command://quit/") {
    document.body.innerHTML = "";
    clearInterval(_threadTimer);
  }
}

function stopTimer() {
  _timerRunning = false;
  clearInterval(_threadTimer);
  document.body.innerHTML = render(
    getRemainingTimeCaption(0),
    BackgroundColorNeutral,
    false
  );
}

function startTimer() {
  document.body.innerHTML = render(
    getRemainingTimeCaption(0),
    BackgroundColorNeutral,
    true
  );

  _timerRunning = true;
  _currentCycleStartTime = Date.now();

  _threadTimer = setInterval(function () {
    if (_timerRunning) {
      let elapsedTime: number = Date.now() - _currentCycleStartTime;

      if (elapsedTime >= SecondsInCycle * 1000 + 980) {
        _currentCycleStartTime = Date.now();
        elapsedTime = Date.now() - _currentCycleStartTime;
      }
      if (
        elapsedTime >= 5000 &&
        elapsedTime < 6000 &&
        _bodyBackgroundColor != BackgroundColorNeutral
      ) {
        _bodyBackgroundColor = BackgroundColorNeutral;
      }

      let remainingTime: string = getRemainingTimeCaption(elapsedTime);

      if (_lastRemainingTime !== remainingTime) {
        if (remainingTime == "00:10") {
          playSound("2166__suburban-grilla__bowl-struck.wav");
        } else if (remainingTime == "00:00") {
          playSound("32304__acclivity__shipsbell.wav");
          _bodyBackgroundColor = BackgroundColorFailed;
        }

        document.body.innerHTML = render(
          remainingTime,
          _bodyBackgroundColor,
          true
        );
        _lastRemainingTime = remainingTime;
      }
    }
  }, 10);
}

function getRemainingTimeCaption(elapsedTime: number): string {
  const remainingTime: Date = new Date(SecondsInCycle * 1000 - elapsedTime);
  const minute = remainingTime.getMinutes();
  const second = remainingTime.getSeconds();

  return `0${minute}:${second < 10 ? `0${second}` : second}`;
}

function renderControls(running: boolean): string {
  if (running) {
    return (
      `<a style="color: #555555;" href="javascript:command(\'stop\');">Stop</a> ` +
      `<a style="color: #555555;" href="javascript:command(\'reset\');">Reset</a>`
    );
  }
  return '<a style="color: #555555;" href="javascript:command(\'start\');">Start</a> ';
}

function render(
  timerText: string,
  bodyColor: string,
  running: boolean
): string {
  const timerHtml: string = `<div style="border: 3px solid #555555; background: ${bodyColor}; margin: 0; padding: 0;">
<h1 style="text-align: center; font-size: 30px; color: magenta;">${timerText}</h1>
<div style="text-align: center">
${renderControls(running)}
<a style="color: #555555;" href="javascript:command(\'quit\');">Quit</a>
</div></div>`;
  return timerHtml;
}

function playSound(url: string): void {
  let audio = new Audio();
  audio.src = `./babystep/sounds/${url}`;
  console.log(audio.src);
  audio.load();
  audio.play();
}

export { render, getRemainingTimeCaption, startTimer, command };
