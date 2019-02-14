let app = angular.module('wordGame', []);

app.controller('ctrl', ($scope) => {

    $scope.guessesRemaining = 5;
    $scope.incorrectGuesses = [];
    $scope.correctGuesses = [];
    $scope.inputGuess = '';
    $scope.displayed = '';
    let wordArray = ['Game of Thrones', 'Rick and Morty', 'The Office', 'Westworld', 'King of Queens', 'The IT crowd'];
    let randomWord = wordArray[Math.floor(Math.random() * wordArray.length)].toLowerCase();

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
        for (letter in randomWord) {
            if (randomWord[letter] === $scope.inputGuess) {
                $scope.correctGuesses.push($scope.inputGuess);
                let displayedArr = $scope.displayed.split('');
                displayedArr.splice(letter, 1, $scope.inputGuess);
                $scope.displayed = displayedArr.join('');
            }
        }
        $scope.inputGuess = '';
    }
});