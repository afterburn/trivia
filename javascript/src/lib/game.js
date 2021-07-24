const Player = require('./player');

class Game {
  constructor() {
    // Create an array for the players.
    this.players = [];

    // Define a dictionary for the categories.
    // Doing it this way instead of defining a variable that contains
    // an array for each of the categories enables us to add more later
    // in a simple manner.
    this.categories = {
      0: 'Pop',
      1: 'Science',
      2: 'Sports',
      3: 'Rock'
    };

    // Define another dictionary for the questions and fill the arrays.
    // I prefer doing it this way because we now only have to modify 
    // the categories dictionary to add more questions instead of
    // defining multiple arrays.
    this.questions = {};
    Object.values(this.categories).forEach((category) => {
      this.questions[category] = Array.from(Array(50), (_, i) =>
        `${category} Question #${i}`
      );
    });


    // Define an active player index which we can use to determine who
    // the next player should be for each of the simulation ticks.
    this.activePlayerIndex = -1;

    // Define an isGameOver flag that we can use to determine whether
    // the while loop in the start function is allowed to execute.
    this.isGameOver = false;
  }

  start () {
    // Check if the game has enough players.
    if (this.players.length < 2) {
      console.log(`Game needs at least 2 players to start.`)
      return
    }

    // Start simulation loop.
    while(!this.isGameOver) {
      this.simulate();
    }
  }

  simulate() {
    // Get the active player for this simulation tick.
    const activePlayer = this.getNextPlayer();
    console.log(`${activePlayer.name} is the active player.`);
    
    // Roll the dice.
    const rollResult = this.rollDice();
    console.log(`${activePlayer.name} rolled ${rollResult}`);

    // Check whether a player is in the penalty box and if that is the case
    // do a coin flip to determine if he/she is getting out.
    // Exit early if that is not the case.
    if (activePlayer.isPenalized) {
      if (rollResult % 2 == 0) {
        return;
      }

      // Make sure isPenalized flag is set to false so player can
      // participate in the game again. 
      activePlayer.isPenalized = false;
      console.log(`${activePlayer.name} is getting out of the penalty box.`);
    }

    // Update the player's position on the board I guess?
    const newLocation = activePlayer.move(rollResult);
 
    // Depending on the position on the board, ask a question from the associated category.
    const isCorrectAnswer = this.askQuestion(newLocation);

    // Handle wrong answer and exit function early.
    if (!isCorrectAnswer) {
      console.log(`Question was answered incorrectly.`);
      
      // Send player to penalty box.
      activePlayer.isPenalized = true;
      console.log(`${activePlayer.name} was sent to the penalty box.`)
      return;
    }

    // Increment player score if the answer was correct.
    console.log(`Answer was correct!!!!`);
    activePlayer.incrementScore();

    // Check if the game has been won.
    if (activePlayer.score === 6) {
      console.log(`Winner: ${activePlayer.name}`);
      this.isGameOver = true;
    }
  }

  addPlayer(name) {
    // Create a new player and add him/her to the players array so
    // we can use the activePlayerIndex to get the corresponding player.
    const player = new Player(name);
    this.players.push(player);
    console.log(`${name} was added as player #${this.players.length}`);
  }

  rollDice() {
    // This function will return a number between 1 and 6, simulating
    // a dice roll.
    return Math.floor(Math.random() * 6) + 1;
  }

  askQuestion(location) {
    // Get the category based on position.
    const category = this.getCategoryByLocation(location);
    console.log(`The category is ${category}`);

    // Log and remove the question from its category.
    console.log(this.questions[category].shift());
    
    // Determine whether the question was answered successfully.
    // Had to change == to != to make it work with my code.
    return Math.floor(Math.random() * 10) != 7;
  }

  getNextPlayer() {
    // Check to see if this is the first time this function is called
    // Makes sure Chet is the player for the first sim tick instead of
    // Pat.
    if (this.activePlayerIndex === -1) {
      this.activePlayerIndex = 0;
      return this.players[0];
    }

    // Increment the activePlayerIndex.
    this.activePlayerIndex++;

    // Make sure to clamp index to [0-playerCount] range.
    this.activePlayerIndex = this.activePlayerIndex % this.players.length;

    // Return the player.
    return this.players[this.activePlayerIndex];
  }

  getCategoryByLocation(location) {
    // Instead of using a large set of if's I thought it'd be easier
    // to use modulo 4 instead. 
    return this.categories[location % 4];
  }
}

module.exports = Game;