const game = {
    playerHand: "",
    computerHand: "",
}

const summary = {
    numbers: 0,
    wins: 0,
    losses: 0,
    draws: 0,
}

const hands = [...document.querySelectorAll(".choice img")]; //operator rest ... zamienia nodeList na tablicę
let choiceImage = document.getElementById("choice");
let choiceImageC = document.getElementById("choiceC");

function handChoice() {
    game.playerHand = this.dataset.option;
    hands.forEach(hand => hand.style.boxShadow = "");
    this.style.boxShadow = "0 0 0 3px black";
    choiceImage.src = this.src;
}


function computerChoice() {
    const aiImage = hands[Math.floor(Math.random() * hands.length)].dataset.option;
    if (aiImage === "paper") {
        choiceImageC.src = "img/paper.png";
        return "paper";
    } else if (aiImage === "scissors") {
        choiceImageC.src = "img/scissors.png";
        return "scissors";
    } else {
        choiceImageC.src = "img/stone.png";
        return "stone";
    }
}

function checkResult(player, computer) {
    if (player === computer) {
        return "draw";
    } else if (player === "paper" && computer === "stone" ||
        player === "stone" && computer === "scissors" ||
        player === "scissors" && computer === "paper") {
        return "win";
    } else {
        return "loss";
    }
}

function showResult(player, computer, result) {
    choiceImage.dataset = player;
    choiceImageC.dataset = computer;
    document.querySelector(".stats p.numbers span").textContent = ++summary.numbers;
    if (result === "win") {
        document.querySelector(".stats p.wins span").textContent = ++summary.wins;
        document.querySelector("h2").textContent = "Ty wygrałeś!!!";
    } else if (result === "draw") {
        document.querySelector(".stats p.draws span").textContent = ++summary.draws;
        document.querySelector("h2").textContent = "remis";
    } else {
        document.querySelector(".stats p.losses span").textContent = ++summary.losses;
        document.querySelector("h2").textContent = "komputer był lepszy";
    }
}

function endGame() {
    document.querySelector(`[data-option="${game.playerHand}"]`).style.boxShadow = "";
    game.playerHand = "";
    game.computerHand = "";
    document.querySelector("h2").textContent = "Kto wygra?";
    choiceImage.src = "";
    choiceImageC.src = "";
}

startGame = () => {
    if (!game.playerHand) {
        return alert("Wybierz rękę");
    }
    // console.log(game.playerHand);
    game.computerHand = computerChoice();
    // console.log(game.computerHand);
    const gameResult = checkResult(game.playerHand, game.computerHand);
    showResult(game.playerHand, game.computerHand, gameResult);
    // console.log(gameResult);
    setTimeout(endGame, 1500);
}
hands.forEach(hand => hand.addEventListener("click", handChoice));
document.querySelector(".start").addEventListener("click", startGame)
