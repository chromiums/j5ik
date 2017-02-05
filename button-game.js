var Tessel = require("tessel-io");
var five = require("johnny-five");
var timer;
var max = 10;
var min = 3;

var board = new five.Board({
  io: new Tessel()
});

var get_timer_value = () => {
  var v = (Math.random() * (max - min + 1) + min) * 1000;
  console.log(v);

  return v;
}

var game_over = () => {
    console.log("GAME OVER");
    process.exit()
}

var reset = (leds) => {
  clearTimeout(timer);
  timer = setTimeout(() => game_over(), get_timer_value());
  leds.forEach((led) => led.toggle());
}

board.on("ready", function() {
  var leds = new five.Leds(["b5", "b6"]);
  var buttons = new five.Buttons(["a5", "a6"]);

  timer = setTimeout(() => game_over(), get_timer_value());

  leds[0].on();
  leds[1].off();

  buttons.on("press", (button) => {
    reset(leds);
  });
});
