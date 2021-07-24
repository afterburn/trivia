### My thought process

1. Understanding the code and gathering requirements (see list below for requirements I could gather within the given timeframe).
2. Coming up with a better structure that is more scalable but especially easier to maintain.
3. Refactor the code.
4. Add a bundler (webpack) to transpile code into browser format.
5. Create simple express server to serve to code, making it production ready.

```
- ability to add players to the game.
- ability to roll a dice resulting in a number between 1 - 6.
- ability to ask questions from 4 different categories ('pop', 'science', 'sports', 'rock).
- ability to simulate answering a question.
- ability to keep track of player scores (gold coins).

- whenever a question is answered correctly award a gold coin.
  Math.floor(Math.random()\*10) == 7 is used to determine whether question was answered wrongly
  This gives the player a 10% chance to answer incorrectly because it will compare a random
  value between 0 - 9 with 7 (for some reason) which is a 1 in 10 chance.

- if the question is answered incorrectly, player is placed inside penalty box
  on the next tick player with penalty has to do a coin toss to determine whether or not they
  are allowed to leave the penalty box, this is the roll % 2 != 0 part.
  if the coin toss is won, then the player is allowed to answer a question in the same turn.
  if answered incorrectly player has to go back into the penalty box.

- game is finished when one of the players has 6 coins.
- game is only playable when there are 2 or more players.
```
