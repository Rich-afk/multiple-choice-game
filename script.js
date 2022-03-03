var startEl = document.querySelector('#start');
var gameEl = document.querySelector('#game');
var endEl = document.querySelector('#end');
var hsEl = document.querySelector('#highscores')
var questionEl = document.querySelector('#questions');

var beginBtn = document.querySelector('#begin');
var initialsInput = document.querySelector('#initials');

// for timer
var timeEl = document.querySelector(".time");
var mainEl = document.getElementById("main");

var count = 0;
var score = 0;
var secondsLeft = 60;
var timerInterval;

var questions = [

    {
        questionTitle: "What's my name?",
        choices: ['Rich', 'Richard', 'Casey', 'Poor'],
        correctAns: 'Richard'
    },

    {
        questionTitle: "Where am I from?",
        choices: ['Baltimore', 'Charlotte', 'Los Angeles', 'New York'],
        correctAns: 'Baltimore'
    },

    {
        questionTitle: 'What is my most popular song on Spotify?',
        choices: ['Secret', 'Odyssey', 'Boba Tea', 'Goldfish'],
        correctAns: 'Secret'
    },

    {
        questionTitle: 'What is my favorite color?',
        choices: ['Red', 'Purple', 'Blue', 'Black'],
        correctAns: 'Red'
    },

    {
        questionTitle: 'What is my favorite anime?',
        choices: ["JoJo's Bizarre Adventure", 'Sword Art Online', 'Clannad: Afterstory', 'Devilman Crybaby'],
        correctAns: 'Devilman Crybaby'
    },

    {
        questionTitle: 'Who is my favorite artist?',
        choices: ['Kendrick Lamar', 'J. Cole', 'Kanye West', 'Rich Kim'],
        correctAns: 'Kendrick Lamar'
    }
];

function startScreen() {
    startEl.style.display = "block";
    gameEl.style.display = "none";
    endEl.style.display = "none";
    hsEl.style.display = "none";
}

function gameScreen() {
    startEl.style.display = "none";
    gameEl.style.display = "block";
    endEl.style.display = "none";
    hsEl.style.display = "none";

    setTime();
    renderQuestion();
}


function renderQuestion() {

    questionEl.innerHTML = '';

    var question = questions[count];

    var title = question.questionTitle;

    var titleHeading = document.createElement('h2');

    titleHeading.textContent = title;
    questionEl.appendChild(titleHeading);

    for (var i = 0; i < question.choices.length; i++) {
        var item = question.choices[i];
        var answerBtn = document.createElement('button');
        answerBtn.textContent = item;
        questionEl.appendChild(answerBtn);
    }
}

function endScreen() {
    startEl.style.display = "none";
    gameEl.style.display = "none";
    endEl.style.display = "block";
    hsEl.style.display = "none";
}

function highscoreScreen() {
    startEl.style.display = "none";
    gameEl.style.display = "none";
    endEl.style.display = "none";
    hsEl.style.display = "block";

    var localHS = JSON.parse(localStorage.getItem("highScores"));

    for(var i = 0; i < localHS.length ; i++) {
        var container = document.createElement('article');
        container.classList.add("initsection");
        //getting initials from local and displaying
        var initial = localHS[i].initials;
        var initialHeading = document.createElement('h2');
        initialHeading.textContent = initial;
        // hsEl.appendChild(initialHeading);
        //getting score from local and displaying
        var score = localHS[i].score;
        var scoreHeading = document.createElement('h2');
        scoreHeading.textContent = score;
        container.appendChild(initialHeading);
        container.appendChild(scoreHeading);
        hsEl.appendChild(container);
    
    }
}

function init() {
    startScreen();
}


function handleInitialSubmit(event) {
    event.preventDefault();

    var stored = JSON.parse(localStorage.getItem('highScores')) || [];
    var updatedScores = stored.concat({
        score: score,
        initials: initialsInput.value
    });

    localStorage.setItem('highScores', JSON.stringify(updatedScores));
    highscoreScreen();
}


beginBtn.addEventListener('click', gameScreen);
gameEl.addEventListener('click', function (event) {
    if (event.target.matches('button')) {
        //if the button text matches the answer, add 100
        if(event.target.innerHTML === questions[count].correctAns) {
            score += 100;
        }
        else {
            secondsLeft -= 10;
            // var incorrect = 'Incorrect!';
            // var inHeading = document.createElement('h2');
            // gameEl.appendChild(inHeading);
        }
        count++;
        if (count < questions.length) {
            renderQuestion();
        } else {
            clearInterval(timerInterval);
            score += secondsLeft * 10;
            endScreen();
        }
    }
});



//implementation for timer

//timer display
function printSecondsLeft() {
  timeEl.textContent = secondsLeft;
}

function countdown() {
  secondsLeft--;
  printSecondsLeft();

  if(secondsLeft === 0) {
    // Stops execution of action at set interval
    clearInterval(timerInterval);
    endScreen();
  }

}

function setTime() {
  printSecondsLeft();
  // Sets interval in variable
  timerInterval = setInterval(countdown, 1000);
}


init();
endEl.addEventListener('submit', handleInitialSubmit);
