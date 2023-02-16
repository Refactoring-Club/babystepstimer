"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BackgroundColorNeutral = "#ffffff";
var BackgroundColorFailed = "#ffcccc";
var BackgroundColorPassed = "#ccffcc";
var SecondsInCycle = 120;
var _timerRunning;
var _currentCycleStartTime;
var _lastRemainingTime;
var _bodyBackgroundColor = BackgroundColorNeutral;
var _threadTimer;
document.body.innerHTML = render(getRemainingTimeCaption(0), BackgroundColorNeutral, false);
function command(arg, startCommandHandler, stopCommandHandler) {
    if (startCommandHandler === void 0) { startCommandHandler = startTimer; }
    if (stopCommandHandler === void 0) { stopCommandHandler = stopTimer; }
    var args = { Url: { AbsoluteUri: "command://" + arg + "/" } };
    console.log("called", arg, args.Url.AbsoluteUri);
    if (args.Url.AbsoluteUri == "command://start/") {
        startCommandHandler();
    }
    else if (args.Url.AbsoluteUri == "command://stop/") {
        stopCommandHandler();
    }
    else if (args.Url.AbsoluteUri == "command://reset/") {
        _currentCycleStartTime = Date.now();
        _bodyBackgroundColor = BackgroundColorPassed;
    }
    else if (args.Url.AbsoluteUri == "command://quit/") {
        document.body.innerHTML = "";
        clearInterval(_threadTimer);
    }
}
exports.command = command;
function stopTimer() {
    _timerRunning = false;
    clearInterval(_threadTimer);
    document.body.innerHTML = render(getRemainingTimeCaption(0), BackgroundColorNeutral, false);
}
function startTimer() {
    document.body.innerHTML = render(getRemainingTimeCaption(0), BackgroundColorNeutral, true);
    _timerRunning = true;
    _currentCycleStartTime = Date.now();
    _threadTimer = setInterval(function () {
        if (_timerRunning) {
            var elapsedTime = Date.now() - _currentCycleStartTime;
            if (elapsedTime >= SecondsInCycle * 1000 + 980) {
                _currentCycleStartTime = Date.now();
                elapsedTime = Date.now() - _currentCycleStartTime;
            }
            if (elapsedTime >= 5000 &&
                elapsedTime < 6000 &&
                _bodyBackgroundColor != BackgroundColorNeutral) {
                _bodyBackgroundColor = BackgroundColorNeutral;
            }
            var remainingTime = getRemainingTimeCaption(elapsedTime);
            if (_lastRemainingTime !== remainingTime) {
                if (remainingTime == "00:10") {
                    playSound("2166__suburban-grilla__bowl-struck.wav");
                }
                else if (remainingTime == "00:00") {
                    playSound("32304__acclivity__shipsbell.wav");
                    _bodyBackgroundColor = BackgroundColorFailed;
                }
                document.body.innerHTML = render(remainingTime, _bodyBackgroundColor, true);
                _lastRemainingTime = remainingTime;
            }
        }
    }, 10);
}
exports.startTimer = startTimer;
function getRemainingTimeCaption(elapsedTime) {
    var remainingTime = new Date(SecondsInCycle * 1000 - elapsedTime);
    var minute = remainingTime.getMinutes();
    var second = remainingTime.getSeconds();
    return "0" + minute + ":" + (second < 10 ? "0" + second : second);
}
exports.getRemainingTimeCaption = getRemainingTimeCaption;
function renderControls(running) {
    if (running) {
        return ("<a style=\"color: #555555;\" href=\"javascript:command('stop');\">Stop</a> " +
            "<a style=\"color: #555555;\" href=\"javascript:command('reset');\">Reset</a>");
    }
    return '<a style="color: #555555;" href="javascript:command(\'start\');">Start</a> ';
}
function render(timerText, bodyColor, running) {
    var timerHtml = "<div style=\"border: 3px solid #555555; background: " + bodyColor + "; margin: 0; padding: 0;\">\n<h1 style=\"text-align: center; font-size: 30px; color: magenta;\">" + timerText + "</h1>\n<div style=\"text-align: center\">\n" + renderControls(running) + "\n<a style=\"color: #555555;\" href=\"javascript:command('quit');\">Quit</a>\n</div></div>";
    return timerHtml;
}
exports.render = render;
function playSound(url) {
    var audio = new Audio();
    audio.src = "./babystep/sounds/" + url;
    console.log(audio.src);
    audio.load();
    audio.play();
}
