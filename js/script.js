var gamePlaying, score, time, num1, num2, correctAnswer, timeDecrease, correctAnsPosition, answers;

gamePlaying = false;
var startButton = document.querySelector('#start-game');


startButton.addEventListener('click', function () {
    if (gamePlaying) {
        //Reload the page
        window.location.reload();
    } else {
        gamePlaying = true;
        //    Set score to 0
        score = 0;
        document.querySelector('#score-value').textContent = score;

        //show countdown box
        show('time');

        time = 60;

        document.querySelector('#time-sec').textContent = time;

        //Reduce the time by 1 sec
        countDown();

        //show questions and answers
        generateQnA();

        // change the Start Game button text to Reset Game
        document.querySelector('#start-game').innerHTML = "Reset Game";


    }
});

// countdown function for DRY - Don't Repeat yourself.
function countDown() {

    //[id_of_setinterval] Required. The ID of the timer returned by the setInterval() method

    //here -> timeDecrease

    timeDecrease = setInterval(function () {
        time--;
        document.querySelector('#time-sec').textContent = time;
        if (time === 0) {
            stopCountDown();

        }
    }, 1000);
}

function stopCountDown() {

    //The ID of the timer returned by the setInterval() method -> timeDecrease
    clearInterval(timeDecrease);

    // show the game-over div
    show('game-over');

    //Show the final sore on the game over div.
    document.querySelector('#final-score').textContent = score;

    //hide time remaining div
    hide('time');

    //hide start game button
    hide('start-game');

    //play-again button
    var playAgain = document.querySelector('#play-again');

    // Page reloads when clicked on Play Again
    playAgain.addEventListener("click", function () {
        location.reload();
    });
}

// Hide function for DRY
function hide(Id) {
    document.getElementById(Id).style.display = 'none';
}

// Show function for DRY
function show(Id) {
    document.getElementById(Id).style.display = 'block';
}

//Generate new Question ans Answer for numbers 1 to 10

function generateQnA() {

    // random numbers between 1 to 10

    num1 = Math.floor(Math.random() * 9) + 1;
    num2 = Math.floor(Math.random() * 9) + 1;

    // show the question on the question div

    document.querySelector('.question').textContent = num1 + ' x ' + num2;

    // calculate the correct answer by multipying the numbers
    correctAnswer = num1 * num2;

    //get the random number from 1 - 4 for positioning the correct answer randomly everytime on the options
    correctAnsPosition = Math.floor(Math.random() * 3) + 1;

    //place the correct answer on the 1 of the 4 buttons
    document.querySelector('#btn' + correctAnsPosition).textContent = correctAnswer;

    // create an array with correct answer in it to make sure no random wrong numbers be equal to the correct answer.
    answers = [correctAnswer];

    //use for loop to get the random wrong numbers on the other 3 options
    for (var i = 1; i < 5; i++) {

        //fill all the options except the one which has the correct answer
        if (i !== correctAnsPosition) {

            //declare a variable for the wrong answer
            var wrongAnswer;

            //now generate the wrong answer until the all are different from one another and also different from the correct answer

            // do helps you create the random numbers first and then check the number in the array made above.
            do {
                var random1 = Math.floor(Math.random() * 9) + 1;
                var random2 = Math.floor(Math.random() * 9) + 1;
                wrongAnswer = random1 * random2;
            }
            //check the condition to see if the wrong answer is in the array or not. 
            // if it there in the array another number will be generated.
            while (answers.indexOf(wrongAnswer) > -1)

            // wrong numbers are different from one another - show them on the options.
            // to check for the next wrong number push it into the array.
            document.getElementById('btn' + i).textContent = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}

// NOW CHECK WHAT HAPPENS WHEN WE CLICK ON THE OPTIONS FOR SELECTING AN ANSWER

for (var i = 1; i < 5; i++) {

    // use the onclick event to defince what to do when clicked.
    document.getElementById('btn' + i).onclick = function () {
        //check if we are playing
        if (gamePlaying) {

            //this -> refers to the button clicked at the time
            //check if the innerHTML of the button is equal to the correct answer
            if (this.innerHTML == correctAnswer) {

                //If correct - increase the score by 1
                score += 1;

                //show the score on the top of the page
                document.querySelector('#score-value').innerHTML = score;

                //hide the Incorrect answer flag
                hide('red');
                //show the correct answer flag
                show('green');
                //set Timeout for the correct answer flag after 1 second
                setTimeout(function () {
                    hide('green')
                }, 1000);

                //if the score is more than 10 then switch the level 2 where questions will be from the numbers 11 to 20.

                if (score >= 10) {
                    generateQnALevel2();
                } else {
                    //generate New Question and Answers
                    generateQnA();
                }

            } else {

                // if answer is incorrect

                // hide the correct answer flag
                hide('green');

                //show the incorrect answer flag
                show('red');
                //set Timeout for the Incorrect answer flag after 1 second
                setTimeout(function () {
                    hide('red')
                }, 1000);
            }
        }
    }
}

// Level 2 coding

//Generate new Question ans Answer for numbers 11 to 20
function generateQnALevel2() {
    num1 = Math.floor(Math.random() * 9) + 11;
    num2 = Math.floor(Math.random() * 9) + 11;

    document.querySelector('.question').textContent = num1 + ' x ' + num2;

    correctAnswer = num1 * num2;

    correctAnsPosition = Math.floor(Math.random() * 3) + 1;

    document.querySelector('#btn' + correctAnsPosition).textContent = correctAnswer;

    answers = [correctAnswer];

    for (var i = 1; i < 5; i++) {
        if (i !== correctAnsPosition) {
            var wrongAnswer;
            do {
                var random1 = Math.floor(Math.random() * 9) + 11;
                var random2 = Math.floor(Math.random() * 9) + 11;
                wrongAnswer = random1 * random2;
            }
            while (answers.indexOf(wrongAnswer) > -1)
            document.getElementById('btn' + i).textContent = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}
