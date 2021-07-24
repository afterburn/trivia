class Player {
  constructor(name) {
    this.name = name;
    this.location = 0;
    this.score = 0;
    this.isPenalized = false;
  }

  move(rollResult) {
    this.location += rollResult;
    
    // I wasn't quite sure what this was doing but I think it might have
    // been an attempt to normalize the places[] values to a range
    // that would play well with the original currentCategory function
    // which has been made redundant in my refactored code. If you would
    // disable this check in the original code you would see the 'Rock' 
    // category being chosen with a higher frequency, mine keeps the 
    // frequency between categories roughly the same, even if these lines
    // are commented out.
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