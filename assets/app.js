let app = angular.module('wordGame', []);

app.controller('ctrl', ($scope) => {

    $scope.guessesRemaining = 5;
    $scope.incorrectGuesses = [];
    $scope.correctGuesses = [];
    $scope.inputGuess = '';
    $scope.displayed = '';
    let wordArray = ['Game of Thrones', 'Rick and Morty', 'The Office', 'Westworld', 'King of Queens', 'The IT crowd'];
    let randomWord = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();

    $scope.generateWord = () => {
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
        let correctLetter = false;
        for (letter in randomWord) {
            if (randomWord[letter] === $scope.inputGuess.toUpperCase()) {
                correctLetter = true;
                let displayedArr = $scope.displayed.split('');
                displayedArr.splice(letter, 1, $scope.inputGuess.toUpperCase());
                $scope.displayed = displayedArr.join('');
            }
        }
        if (!correctLetter) {
            $scope.guessesRemaining--;
            $scope.incorrectGuesses.push($scope.inputGuess.toUpperCase());
        }
        if (correctLetter) {
            $scope.correctGuesses.push($scope.inputGuess.toUpperCase());
            correctLetter = false;
        }
        $scope.inputGuess = '';
    }
});