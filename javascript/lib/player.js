class Player {
  constructor(name) {
    this.name = name;
    this.location = 0;
    this.score = 0;
    this.isPenalized = false;
  }

  move(rollResult) {
    this.location += rollResult;
    
    if (this.location > 11) {
      this.location -= 12;
    }

    console.log(`${this.name}'s new location is ${this.location}`);
    return this.location;
  }

  incrementScore() {
    this.score++;
    console.log(`${this.name} now has ${this.score} Gold Coins.`);
  }
}

module.exports = Player;