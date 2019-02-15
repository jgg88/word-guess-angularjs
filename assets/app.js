let app = angular.module('wordGame', []);

app.controller('ctrl', ($scope) => {
    $scope.gameInPlay = true;
    $scope.guessesRemaining = 5;
    $scope.incorrectGuesses = [];
    $scope.correctGuesses = [];
    $scope.inputGuess = '';
    $scope.displayed = '';
    $scope.showValidationError = true;
    let wordArray = ['Game of Thrones', 'Rick and Morty', 'The Office', 'Westworld', 'King of Queens', 'The IT crowd'];
    let randomWord;
    let correctLetter;

    $scope.generateWord = () => {
        randomWord = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();
        $scope.gameInPlay = true;
        $scope.guessesRemaining = 5;
        $scope.incorrectGuesses = [];
        $scope.correctGuesses = [];
        $scope.inputGuess = '';
        $scope.displayed = '';
        console.log(randomWord)
        for (i=0; i < randomWord.length; i++) {
            if (randomWord[i] === ' ') {
                $scope.displayed += ' ';
            } else {
                $scope.displayed += '-';
            }
        }
    }
    $scope.generateWord();
    
    $scope.guessedLetter = () => {
        $scope.showValidationError = true;
        if ($scope.correctGuesses.includes($scope.inputGuess.toUpperCase()) || $scope.incorrectGuesses.includes($scope.inputGuess.toUpperCase())) {
            $scope.inputGuess = '';
            $scope.showValidationError = false;
            return;
        }
        for (letter in randomWord) {
            if (randomWord[letter] === $scope.inputGuess.toUpperCase()) {
                correctLetter = true;
                let displayedArr = $scope.displayed.split('');
                displayedArr.splice(letter, 1, $scope.inputGuess.toUpperCase());
                $scope.displayed = displayedArr.join('');
            }
        }
        if (correctLetter === false) {
            $scope.guessesRemaining--;
            $scope.incorrectGuesses.push($scope.inputGuess.toUpperCase());
        } else {
            $scope.correctGuesses.push($scope.inputGuess.toUpperCase());
            correctLetter = false;
        }
        $scope.inputGuess = '';
        if ($scope.displayed === randomWord.toUpperCase()) {
            $scope.gameInPlay = false;
            $scope.gameOverText = `Congratulations! You correctly guessed ${randomWord}!`;
        } else if ($scope.guessesRemaining === 0) {
            $scope.gameInPlay = false;
            $scope.gameOverText = `Sorry you lost, the answer was ${randomWord}!`;
        }
    }
});