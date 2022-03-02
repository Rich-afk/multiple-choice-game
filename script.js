var startEl = document.querySelector('#start');
var gameEl = document.querySelector('#game');
var endEl = document.querySelector('#end');

var beginBtn = document.querySelector('#begin');
var initialsInput = document.querySelector('#initials');

var question =  [
    {
        questionTitle: 'This is question 1',
        choices: ['choice one', 'choice two', 'choice three','choice four'],
        correctAns: 'choice one'
    },

    {
        questionTitle: 'This is question 2',
        choices: ['choice one', 'choice two', 'choice three','choice four'],
        correctAns: 'choice one'
    },

    {
        questionTitle: 'This is question 3',
        choices: ['choice one', 'choice two', 'choice three','choice four'],
        correctAns: 'choice one'
    },

    {
        questionTitle: 'This is question 4',
        choices: ['choice one', 'choice two', 'choice three','choice four'],
        correctAns: 'choice one'
    }
];

function startScreen() {
  startEl.style.display = "block";
  gameEl.style.display = "none";
  endEl.style.display = "none";
}

function gameScreen() {
  startEl.style.display = "none";
  gameEl.style.display = "block";
  endEl.style.display = "none";


  //maybe have this as a seperate function
    var title = question[0].questionTitle;
    var answerBtn = document.createElement('p');

    //title
    answerBtn.textContent = 1 + '.' + title;
    gameEl.appendChild(answerBtn);
    
    //choices
    for(var i = 0; i < 4; i++) {
        var choiceOneBtn = document.createElement('button');
        choiceOneBtn.textContent = question[0].choices[i];
        gameEl.appendChild(choiceOneBtn);
    }
}

//give each choice an event listener, which brings it to the next question. We want to replace 0 with 1 then, so maybe have a globally incrementing value.



function endScreen() {
  startEl.style.display = "none";
  gameEl.style.display = "none";
  endEl.style.display = "block";
}

function init() {
  startScreen();
}

beginBtn.addEventListener('click', gameScreen);
gameEl.addEventListener('click', endScreen);

init();