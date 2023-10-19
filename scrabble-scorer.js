// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
	  }
	}
	return letterPoints;
}

//TODO: your job is to finish writing these functions and variables that we've named //
//TODO: don't change the names or your program won't work as expected. //

function initialPrompt() {
   word = input.question("Let's play some Scrabble!\n\nEnter a word to score: ");
   //console.log(oldScrabbleScorer(word));
   
   return word;
}

let simpleScorer = function(word) {
   return word.length;
};

let vowelBonusScorer = function(word) {
   let score = 0;
   const vowels = ['A', 'E', 'I', 'O', 'U'];
   for (let i = 0; i < word.length; i++) {
      if (vowels.includes(word[i].toUpperCase())) {
         score += 3;
      } else {
         score += 1;
      }
   }
   return score;
};

let scrabbleScorer = function(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 //! changed newPointStructure to oldPointStructure and it worked
	  for (const pointValue in oldPointStructure) {
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue); //pointValue is a string, so I had to change the type to Number
		 }
	  }
	}
	return letterPoints;
};

const scoringAlgorithms = [
   {
      name: 'Simple Score',
      description: 'Each letter is worth 1 point.',
      scorerFunction: simpleScorer
   },
   {
      name: 'Bonus Vowels',
      description: 'Vowels are 3 pts, consonants are 1 pt.',
      scorerFunction: vowelBonusScorer
   },
   {
      name: 'Scrabble',
      description: 'The traditional scoring algorithm.',
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   let prompt = input.question("Which sorting algorithm would you like to use?\n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: ");

   console.log(`Score for '${word}: ${scoringAlgorithms[prompt].scorerFunction(word)}`);
}

function transform(oldPointStructure) {
   let newObject = {};
   for (pointValue in oldPointStructure) {
      for (let i = 0; i < oldPointStructure[pointValue].length; i ++) {
         let letter = oldPointStructure[pointValue][i].toLowerCase();

         newObject[letter] = Number(pointValue);
      }
   }
   return newObject;
};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   initialPrompt();
   scorerPrompt();
   
}

//! Don't write any code below this line //
//! And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
