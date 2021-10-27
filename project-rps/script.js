"use strict"

// set player decision
let playerChoice;
console.log(playerChoice);


function setRock() {
    document.getElementById("rock").innerHTML;
    playerChoice = "rock";
    console.log(playerChoice)
}


function setPaper() {
    document.getElementById("paper").innerHTML;
    playerChoice = "paper";
    console.log(playerChoice)
}


function setScissors() {
    document.getElementById("scissors").innerHTML;
    playerChoice = "scissors";
    console.log(playerChoice)
}

// bot decision

let decision = ["Rock", "Paper", "Scissors"];
let computerChoice;


function randomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}


function botPlay() {
    computerChoice = decision[randomNumber(0,2)];
    document.getElementById("botTalk").innerHTML = `${(computerChoice)}!`;
    console.log(`I choose... ${computerChoice}!`);
}

// win check

function checkWin() {
    if (playerChoice === computerChoice) {
        document.getElementById("resultText").innerHTML = "Draw!";
        tallyPDraw();
    } else {
        switch(playerChoice) {
            case "rock":
                if (computerChoice !== "Paper") {
                    document.getElementById("resultText").innerHTML = "You won!";
                    tallyPWin();
                } else {
                    document.getElementById("resultText").innerHTML = "You lose!";
                    tallyPLoss()
                } break
            case "paper":
                if (computerChoice !== "Scissors") {
                    document.getElementById("resultText").innerHTML = "You won!";
                    tallyPWin();
                } else {
                    document.getElementById("resultText").innerHTML = "You lose!";
                    tallyPLoss()
                } break
            case "scissors":
                if (computerChoice !== "Rock") {
                    document.getElementById("resultText").innerHTML = "You won!";
                    tallyPWin();
                } else {
                    document.getElementById("resultText").innerHTML = "You lose!";
                    tallyPLoss()
                } break
        }
    }
}

// tally counter

let addPWin = (function() {
    let counter = 0;
    return function() {counter++; return counter;}
})();

function tallyPWin(){
    document.getElementById("winText").innerHTML = addPWin();
}


let addPLoss = (function() {
    let counter = 0;
    return function() {counter++; return counter;}
})();

function tallyPLoss() {
    document.getElementById("lossText").innerHTML = addPLoss();
}


let addPDraw = (function() {
    let counter = 0;
    return function() {counter++; return counter;}
})();

function tallyPDraw() {
    document.getElementById("drawText").innerHTML = addPDraw();
}


function resetScore() {
    addPWin = (function() {
        let counter = 0;
        return function() {counter++; return counter;}
    })();
    document.getElementById("winText").innerHTML = 0;
    addPLoss = (function() {
        let counter = 0;
        return function() {counter++; return counter;}
    })();
    document.getElementById("lossText").innerHTML = 0;
    addPDraw = (function() {
        let counter = 0;
        return function() {counter++; return counter;}
    })();
    document.getElementById("drawText").innerHTML = 0;
}

// round history

let totalMatches;

function countMatches() {
    totalMatches = +document.getElementById("winText").innerHTML + +document.getElementById("lossText").innerHTML + +document.getElementById("drawText").innerHTML;
    return totalMatches;
}


let roundResult;

function checkRoundResult() {
    if (+document.getElementById("winText").innerHTML > +document.getElementById("lossText").innerHTML) {
        roundResult = "WIN";
    } else if (+document.getElementById("winText").innerHTML < +document.getElementById("lossText").innerHTML) {
        roundResult = "LOSE";
    } else {
        roundResult = "DRAW";
    }
}


let roundCount = 1;

function createRound() {   
    if (totalMatches % 5 == 0) {
        checkRoundResult();
        let roundTxt = document.createElement("P");
        let winTxt = document.createElement("span");
        let lossTxt = document.createElement("span");
        let drawTxt = document.createElement("span");
        winTxt.id = "winText";
        winTxt.classList.add("roundHistory");
        lossTxt.id = "lossText";
        lossTxt.classList.add("roundHistory");
        drawTxt.id = "drawText"
        drawTxt.classList.add("roundHistory");
        roundTxt.classList.add("roundHistory");
        roundTxt.innerHTML = `Round ${roundCount} (${roundResult}): `;
        winTxt.innerHTML = (addPWin()-1);
        lossTxt.innerHTML = (addPLoss()-1);
        drawTxt.innerHTML = (addPDraw()-1);
        document.getElementById("history").appendChild(roundTxt);
        document.getElementById("history").appendChild(winTxt);
        document.getElementById("history").appendChild(lossTxt);
        document.getElementById("history").appendChild(drawTxt);
        resetScore();
        roundCount++;
    }
}


function roundHistory() {
    let child = document.querySelectorAll(".roundHistory");
    for (let i = 0; i < child.length; i++) {
        child[i].remove(child);
    }
}

// game (stuff that should update with a click)

function game() {
    botPlay();
    checkWin()
    countMatches();
    createRound();;
}

//styling

document.getElementById("history").style.display = "none"

function togglePlay() {
    let x = document.getElementById("game");
    let y = document.getElementById("history");
    let z = document.getElementById("mainPlay");
    let h = document.getElementById("talkContainer");
    x.style.display = "inline-block";
    y.style.display = "none";
    z.style.display = "inline-block";
    h.style.display = "grid"
}

function toggleHistory() {
    let x = document.getElementById("game");
    let y = document.getElementById("history");
    let z = document.getElementById("mainPlay");
    let h = document.getElementById("talkContainer");
    x.style.display = "none";
    y.style.display = "inline-grid";
    z.style.display = "none";
    h.style.display = "inline-block";
}


document.getElementById("playButton").disabled = true;
function disableToggle() {
    document.getElementById("playButton").disabled = false;
    document.getElementById("historyButton").disabled = true;
}

function enableToggle() {
    document.getElementById("playButton").disabled = true;
    document.getElementById("historyButton").disabled = false;
}


function timeOut() {
    setTimeout(textBack,610)
    document.getElementById("botThink").innerHTML = "The computer is thinking...";
    let x = document.getElementById("botThink");
    x.style.display= "block";
    let y = document.getElementById("botTalk");
    y.style.display= "none";
    let z = document.getElementById("resultText");
    z.style.display= "none";
}


function textBack() {
    let x = document.getElementById("botThink");
    x.style.display= "none";
    let y = document.getElementById("botTalk");
    y.style.display= "block";
    let z = document.getElementById("resultText");
    z.style.display= "block";
}

function timeoutWrapper() {
    setTimeout(game,610)
    timeOut();
}

//TURBO -- use it to test the history function
function turbo(){
    for (let i = 0; i < 100; i++){
        setRock();
        timeoutWrapper();
    }
}

/* Check randomness;

let x = 0;
let y = 0;
let z = 0;

function totalCount () {
    computerChoice();
    if (computerPlay === "Rock") {
        x++;
    } else if (computerPlay === "Paper") {
        y++;
    } else {
        z++;
    }
}
for (let i = 0; i < 10000; i++) {
    totalCount();
    console.log(`X: (${x}); Y: (${y}); Z: (${z});`)
}*/


/*function randomNumber(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

let computerPlay = 0;

function computerChoice () {
    let decision = ["rock", "paper", "scissors"];
    computerPlay = decision[randomNumber(0,0)];
    return computerPlay;
} */