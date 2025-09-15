function rollDice() { 
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;
    var fileName1 = "../dicee/images/dice" + dice1 + ".png";
    var fileName2 = "../dicee/images/dice" + dice2 + ".png";
    var diceImage1 = document.getElementsByClassName("img1")[0];
    var diceImage2 = document.getElementsByClassName("img2")[0];
    diceImage1.src = fileName1;
    diceImage2.src = fileName2;

    if (dice1 > dice2) {
        diceResult.innerHTML = "Player 1 won!";
    }
    else if (dice1 === dice2) {
        diceResult.innerHTML = "It's a tie!";
    }
    else if (dice1 < dice2) {
        diceResult.innerHTML = "Player 2 won!";
    }

}

var button = document.getElementById("roll");
button.addEventListener("click", rollDice)

var diceResult = document.getElementById("result");


