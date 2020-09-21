"use strict"

let userScore = 0;
let computerScore = 0;

const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");

const scoreBoard_div = document.querySelector(".score-board");

const result_p = document.querySelector(".result>p");

const rock_div = document.getElementById("r");
const paper_div = document.getElementById("p");
const scissors_div = document.getElementById("s");

function getComputerChoice() {
    const choices = ["r", "p", "s"];
    const probability = Math.floor(Math.random() * 3);
    return choices[probability];
}

function translateChoiceToWord(letter) {
    if (letter === "r") return "Rock";
    if (letter === "p") return "Paper";
    return "Scissors"
}

function determineAdjective(userChoice, computerChoice) {
    switch (userChoice + computerChoice) {
        case "rs": return "breaks";
        case "sp": return "cuts";
        case "pr": return "covers";
        case "sr": return "are broke by";
        case "ps": return "is cut by";
        case "rp": return "is covered by";
    }
}

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerText = String(userScore);
    const smallUserWord = "user".fontsize(3).sub();
    const smallComputerWord = "comp".fontsize(3).sub();
    result_p.innerHTML = `${translateChoiceToWord(userChoice)}${smallUserWord} ${determineAdjective(userChoice, computerChoice)} ${translateChoiceToWord(computerChoice)}${smallComputerWord}. You win!`

    document.getElementById(userChoice).classList.add("green-glow");
    setTimeout(() => document.getElementById(userChoice).classList.remove("green-glow"), 400)
}

function lose(userChoice, computerChoice) {
    computerScore++;
    computerScore_span.innerText = String(computerScore);
    const smallUserWord = "user".fontsize(3).sub();
    const smallComputerWord = "comp".fontsize(3).sub();
    result_p.innerHTML = `${translateChoiceToWord(userChoice)}${smallUserWord} ${determineAdjective(userChoice, computerChoice)} ${translateChoiceToWord(computerChoice)}${smallComputerWord}. You lose!`
    document.getElementById(userChoice).classList.add("red-glow");
    setTimeout(() => document.getElementById(userChoice).classList.remove("red-glow"), 400)
}

function draw(userChoice, computerChoice) {
    const smallUserWord = "user".fontsize(3).sub();
    const smallComputerWord = "comp".fontsize(3).sub();
    result_p.innerHTML = `${translateChoiceToWord(userChoice)}${smallUserWord} vs ${translateChoiceToWord(computerChoice)}${smallComputerWord}. It's a draw!`
    document.getElementById(userChoice).classList.add("gray-glow");
    setTimeout(() => document.getElementById(userChoice).classList.remove("gray-glow"), 400)
}

function game(userChoice) {
    const computerChoice = getComputerChoice();

    if (userChoice === computerChoice) {
        draw(userChoice, computerChoice);
        return;
    }

    switch (userChoice + computerChoice) {
        case "rs":
        case "pr":
        case "sp":
            win(userChoice, computerChoice);
            break;
        default:
            lose(userChoice, computerChoice);
            break;
    }
}

function main() {
    rock_div.addEventListener("click", () => game("r"));
    paper_div.addEventListener("click", () => game("p"));
    scissors_div.addEventListener("click", () => game("s"));
}

main();