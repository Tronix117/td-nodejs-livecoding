class Party {
  number = null;
  guesses = [];
  score = null;
  solved = false;
  tries = 0;

  static currentParty = null;

  constructor(min, max) {
    this.number = Math.floor(Math.random() * (max - min) + min);
  }

  guess(input) {
    const inputNb = +input;
    if (isNaN(inputNb)) {
      throw new Error('Input is not a number')
    }
    
    this.tries++;
    this.guesses.push(input);

    if (inputNb > this.number) return '-';
    if (inputNb < this.number) return '+';

    this.solved = true;
    this.score = this.tries;

    return '=';
  }
}

module.exports = Party;
