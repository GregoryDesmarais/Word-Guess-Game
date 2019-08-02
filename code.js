var wordGuess = {
    tries: 15,
    availWords: ["javascript", "jquery", "CSS", "HTML", "bootstrap", "react"],
    curWord: "",
    curWordStatus: [],
    usedWords: [],
    userWins: 0,
    guessedLetters: [],
    letterGuess: function(letter) {
        if (this.curWord.length > 0) {
            this.playerGuess(letter);
        } else {
            //wordGuess.newGame();
        }
    },
    pickWord: function() {
        var select = Math.floor(Math.random() * this.availWords.length);
        this.curWord = this.availWords[select];
        console.log("Selected word: " + this.curWord);
        if (this.usedWords.indexOf(this.curWord) > -1) {
            console.log("Word already exists");
            if (this.usedWords.length === this.availWords.length) {
                alert("All words solved!\n\nGreat Game!");
                //wordGuess.newGame();
            } else {
                this.pickWord();
            }
        } else {
            console.log(this.curWord)
            this.usedWords.push(this.curWord);
            this.curWordStatus = [];
            for (var i = 0; i < this.curWord.length; i++) {
                this.curWordStatus.push("_");
            }
        }
    },
    newGame: function() {
        this.tries = 15;
        this.curWord = "";
        this.curWordStatus = [];
        this.usedWords = [];
        this.userWins = 0;
        this.guessedLetters = 0;
        this.pickWord();
    },
    displayWord: function() {
        var word = "";
        for (var i = 0; i < this.curWordStatus.length; i++) {
            word += this.curWordStatus[i];
            if (i === this.curWordStatus.length - 1) {
                continue;
            } else {
                word += " ";
            }
        }
        document.getElementById("curWord").textContent = word;
    }


}

document.onkeyup = function(e) {
    wordGuess.letterGuess(e.key);
    //alert(e.key);

}