const Player = require('./player');

class Game {
  constructor() {
    this.players = [];
    this.categories = {
      0: 'Pop',
      1: 'Science',
      2: 'Sports',
      3: 'Rock'
    };

    this.questions = {};
    Object.values(this.categories).forEach((category) => {
      this.questions[category] = Array.from(Array(50), (_, i) =>
        `${category} Question #${i}`
      );
    });

    this.activePlayerIndex = -1;
    this.isGameOver = false;
  }

  start () {
    if (this.players.length < 2) {
      console.log(`Game needs at least 2 players to start.`)
      return
    }

    while(!this.isGameOver) {
      this.simulate();
    }
  }

  simulate() {
    const activePlayer = this.getNextPlayer();
    console.log(`${activePlayer.name} is the active player.`);
    
    const rollResult = this.rollDice();
    console.log(`${activePlayer.name} rolled ${rollResult}`);

    if (activePlayer.isPenalized) {
      if (rollResult % 2 == 0) {
        return;
      }

      activePlayer.isPenalized = false;
      console.log(`${activePlayer.name} is getting out of the penalty box.`);
    }

    const newLocation = activePlayer.move(rollResult);
    const isCorrectAnswer = this.askQuestion(newLocation);

    if (!isCorrectAnswer) {
      console.log(`Question was answered incorrectly.`);
      
      activePlayer.isPenalized = true;
      console.log(`${activePlayer.name} was sent to the penalty box.`)
      return;
    }

    console.log(`Answer was correct!!!!`);
    activePlayer.incrementScore();

    if (activePlayer.score === 6) {
      console.log(`Winner: ${activePlayer.name}`);
      this.isGameOver = true;
    }
  }

  addPlayer(name) {
    const player = new Player(name);
    this.players.push(player);
    console.log(`${name} was added as player #${this.players.length}`);
  }

  rollDice() {
    return Math.floor(Math.random() * 6) + 1;
  }

  askQuestion(location) {
    const category = this.getCategoryByLocation(location);
    console.log(`The category is ${category}`);
    console.log(this.questions[category].shift());
    return Math.floor(Math.random() * 10) != 7;
  }

  getNextPlayer() {
    if (this.activePlayerIndex === -1) {
      this.activePlayerIndex = 0;
      return this.players[0];
    }

    this.activePlayerIndex++;
    this.activePlayerIndex = this.activePlayerIndex % this.players.length;
    return this.players[this.activePlayerIndex];
  }

  getCategoryByLocation(location) {
    return this.categories[location % 4];
  }
}

module.exports = Game;