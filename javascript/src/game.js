exports = typeof window !== "undefined" && window !== null ? window : global;

const Game = require('./lib/game')

const game = new Game();
game.addPlayer('Chet');
game.addPlayer('Pat');
game.addPlayer('Sue');
game.start();

exports.Game = Game