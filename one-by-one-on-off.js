var five = require("johnny-five");
var Tessel = require("tessel-io");
var board = new five.Board({
  io: new Tessel()
});
board.on("ready", () => {
  var leds = new five.Leds(["a2", "a3", "a4", "a5", "a6", "a7"]);
  var index = 0;
  var step = 1;

  board.loop(100, () => {
    leds.off().slice(0, index).on();
    index += step;
    if (index === 0 || index === leds.length) {
      step *= -1;
    }
  });
});
