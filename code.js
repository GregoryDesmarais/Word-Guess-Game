var wordGuess = {
    tries: 15,
    availWords: ["javascript", "jquery", "CSS", "HTML", "bootstrap", "react"],
    curWord: "",
    usedWords: [],
    userWins: 0,
    guessedLetters: [],
    newGame: function () {
        var select = Math.ceil(Math.random() * wordGuess.availWords.length);
        wordGuess.curWord = wordGuess.availWords[select];
        console.log("Selected word: " + wordGuess.curWord);
        if (wordGuess.usedWords.indexOf(wordGuess.curWord) > -1) {
            wordGuess.usedWords.push(wordGuess.curWord);
            console.log(wordGuess.curWord)
        }
        else {
            console.log("Word already exists");
            //wordGuess.newGame();
        }
    }
}