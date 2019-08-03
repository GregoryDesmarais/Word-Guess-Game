var allowedKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var gameStatus = document.getElementById("gameStatus");
var audio = new Audio('assets/sounds/correct.mp3');
var wordGuess = {
    tries: 0,
    availWords: ["javascript", "jquery", "css", "html", "bootstrap", "react"],
    // availWords: ["css"],
    curWord: "",
    curWordStatus: [],
    usedWords: [],
    userWins: 0,
    guessedLetters: [],
    letterGuess: function(letter) {
        if (this.guessedLetters.indexOf(letter) < 0) {
            this.tries--;
            if (this.tries === 0) {
                gameStatus.innerHTML = "Sorry! No more guesses!<br>";
                gameStatus.innerHTML += "Press <kbd>Shift</kbd> to play again!";
            }
            this.guessedLetters.push(letter);
            if (this.curWord.length > 0) {
                for (var i = 0; i < this.curWordStatus.length; i++) {
                    console.log("letter: " + letter);
                    if (letter === this.curWord[i]) {
                        this.curWordStatus[i] = letter;
                        console.log(this.curWordStatus);
                    }
                }
                this.updateStatus();
            }
        }
    },
    pickWord: function() {
        var select = Math.floor(Math.random() * this.availWords.length);
        this.curWord = this.availWords[select];
        console.log("Selected word: " + this.curWord);
        if (this.usedWords.indexOf(this.curWord) > -1) {
            this.pickWord();
        } else {
            this.curWordStatus = [];
            for (var i = 0; i < this.curWord.length; i++) {
                this.curWordStatus.push("_");
            }
        }
        this.tries = this.curWord.length + 3;
    },
    newGame: function() {
        this.curWord = "";
        this.curWordStatus = [];
        this.guessedLetters = [];
        this.pickWord();
        this.updateStatus();
        gameStatus.textContent = "";
    },
    updateStatus: function() {
        var word = "";
        for (var i = 0; i < this.curWordStatus.length; i++) {
            word += this.curWordStatus[i];
            if (i === this.curWordStatus.length - 1) {
                continue;
            } else {
                word += " ";
            }
        }
        if (this.curWordStatus.indexOf("_") < 0) {
            this.userWins++;
            gameStatus.innerHTML = "You Win!<br>";
            gameStatus.innerHTML += "Press <kbd>Shift</kbd> to play again!";
            this.tries = 0;
            audio.play();
            this.usedWords.push(this.curWord);
        }
        document.getElementById("curWord").textContent = word;
        document.getElementById("guessRemain").textContent = this.tries;
        document.getElementById("guessedLetters").textContent = this.guessedLetters;
        document.getElementById("winCount").textContent = this.userWins;
        if (this.usedWords.length === this.availWords.length) {
            gameStatus.innerHTML = "All words solved!";
        }

    }


}

document.onkeyup = function(e) {
    console.log(e.key);
    if (wordGuess.tries === 0) {

    }
    if (e.key == "Shift" && (wordGuess.usedWords.length < wordGuess.availWords.length) && (wordGuess.curWord.split("").length == wordGuess.curWordStatus.length)) {
        wordGuess.newGame();
        wordGuess.updateStatus();
    } else if (allowedKeys.indexOf(e.key) > -1 && (wordGuess.usedWords.length < wordGuess.availWords.length) && wordGuess.tries > 0) {
        wordGuess.letterGuess(e.key);
    }
}

wordGuess.newGame();
wordGuess.updateStatus();