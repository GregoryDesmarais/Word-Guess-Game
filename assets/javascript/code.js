//Globals

var allowedKeys = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var gameStatus = document.getElementById("gameStatus");
var audio = new Audio('assets/sounds/correct.mp3');

//Game Object
var wordGuess = {
    tries: 0,
    availWords: ["javascript", "jquery", "css", "html", "bootstrap", "react", "array", "object", "function", 'variable'],
    curWord: "",
    curWordStatus: [],
    usedWords: [],
    userWins: 0,
    guessedLetters: [],
    letterGuess: function(letter) { //Checks input letter copared to word.
        if (this.guessedLetters.indexOf(letter) < 0) {
            this.tries--; //Decrement "tries"
            if (this.tries === 0) {
                gameStatus.innerHTML = "Sorry! No more guesses!<br>"; //No more "tries", Game Over!
                gameStatus.innerHTML += "Press <kbd>Shift</kbd> to play again!";
            }
            this.guessedLetters.push(letter); //Add letter to "guessed" pool.
            for (var i = 0; i < this.curWordStatus.length; i++) {
                if (letter === this.curWord[i]) {
                    this.curWordStatus[i] = letter; //If letter exists, change the _ to the proper letter.
                }
            }
            this.updateStatus();
        }
    },
    pickWord: function() { //Randomly picks a word from the availWords array.
        var select = Math.floor(Math.random() * this.availWords.length);
        this.curWord = this.availWords[select];
        if (this.usedWords.indexOf(this.curWord) > -1) { //If the word was already solved, pick another.
            this.pickWord();
        } else {
            this.curWordStatus = [];
            for (var i = 0; i < this.curWord.length; i++) { //create the curWordStatus array to break down each individual letter. 
                this.curWordStatus.push("_"); //Underscores as placeholders.
            }
        }
        this.tries = this.curWord.length + 3; //User tries are equal to selected word length, plus 3.
    },
    newGame: function() { //Resets most variables, Selects another word, then updates the page display.
        this.curWord = "";
        this.curWordStatus = [];
        this.guessedLetters = [];
        this.pickWord();
        this.updateStatus();
        gameStatus.textContent = "";
    },
    updateStatus: function() { //Updates the game display, including current word, tries, and wins.
        var word = "";
        for (var i = 0; i < this.curWordStatus.length; i++) {
            word += this.curWordStatus[i];
            if (i === this.curWordStatus.length - 1) {
                continue;
            } else {
                word += " ";
            }
        }
        if (this.curWordStatus.indexOf("_") < 0) { //No underscores?  VICTORY!
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
            gameStatus.innerHTML = "All words solved!"; //Informs player that all words have been solved.
        }

    }


}

document.onkeyup = function(e) {
        console.log(e.key);
        if (e.key == "Shift" && (wordGuess.usedWords.length < wordGuess.availWords.length)) {
            wordGuess.newGame(); //Reset if there are still words available. 
            wordGuess.updateStatus();
        } else if (allowedKeys.indexOf(e.key) > -1 && (wordGuess.usedWords.length < wordGuess.availWords.length) && wordGuess.tries > 0) {
            wordGuess.letterGuess(e.key); //if a-z, then check to see if it is a part of the word.
        }
    }
    //Run game code after declaring everything.  Update page display after.
wordGuess.newGame();
wordGuess.updateStatus();