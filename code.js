var wordGuess = {
    tries: 15,
    availWords: ["javascript", "jquery", "CSS", "HTML", "bootstrap", "react"],
    curWord: "",
    usedWords: [],
    userWins: 0,
    guessedLetters: [],
    test: function(letter){
        if(this.curWord.length > 0)
        {
            wordGuess.playerGuess(letter);
        }
        else 
        {
            wordGuess.newGame();
        }
    },
    newGame: function() {
        var select = Math.floor(Math.random() * wordGuess.availWords.length);
        wordGuess.curWord = wordGuess.availWords[select];
        console.log("Selected word: " + wordGuess.curWord);
        if (wordGuess.usedWords.indexOf(wordGuess.curWord) > -1) {
            console.log("Word already exists");
            if (wordGuess.usedWords.length == wordGuess.availWords.length) {
                alert("All words solved!\n\nGreat Game!");
            }
            else {
                wordGuess.newGame();
            }
        }
        else {
            console.log(wordGuess.curWord)
            wordGuess.usedWords.push(wordGuess.curWord);
        }
    },

}

document.onkeyup = function(e) {
    wordGuess.test(e.key);
    //alert(e.key);

}