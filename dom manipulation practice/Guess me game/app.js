// Game function:
// -Player must guess a number between a min and max
// - Player gets a certain amount of guesses
// -Notify player of guesses remaining
// -notify the player of the correct answer if he/she loses
// -Let player choose to play again

// Variables in Javascript side
let minNumValue = 1,
  maxNumValue = 10,
  winningNum = 2,
  guessesLeft = 3;

//   Variables for UI (Dom Elements)
const guessInputBox = document.querySelector("#guessInputBox"),
  gameBox = document.querySelector("#gameBox"),
  guessInputBtn = document.querySelector("#guessInputBtn"),
  minNum = document.querySelector(".minNum"),
  maxNum = document.querySelector(".maxNum"),
  message = document.querySelector("#message"),
  svg = document.querySelector("svg");

// assign play again button
gameBox.addEventListener("mousedown", function (e) {
  if (e.target.value === "Play again") {
    window.location.reload();
  }
});

//assign the js value to minNum and maxNum
minNum.textContent = minNumValue;
maxNum.textContent = maxNumValue;

// assign event-listener to submit btn
guessInputBtn.addEventListener("click", messageInfo);
function messageInfo(e) {
  let guess = parseInt(guessInputBox.value);
  //   display correct if any
  if (guess === winningNum) {
    setMessage(
      ` ${winningNum} is the correct number. YOU WIN !`,
      "rgb(83, 206, 83)"
    );
    guessInputBox.style.borderColor = " rgb(83, 206, 83)";
    guessInputBox.disabled = true;
    guessInputBtn.value = "Play again";
    guessInputBtn.className += " play-again";
  } else {
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      setMessage(
        `Game Over, You Lost. The correct number is ${winningNum}`,
        "rgb(183, 127, 127)"
      );
      guessInputBox.disabled = true;
      guessInputBtn.value = "Play again";
      svg.style.display = "none";
    } else {
      // Game continues even answer is wrong
      // Clear Input
      guessInputBox.value = "";
      // set border
      guessInputBox.style.borderColor = " rgb(183, 127, 127)";
      // guessesLeft = guessesLeft - 1;
      setMessage(
        ` ${guess} is the wrong number. ${guessesLeft} guess(es) left`,
        "rgb(183, 127, 127)"
      );
    }
    // // stop the display of messages after guesses left = 0
    // if (guessesLeft < 0) {
    //   message.style.display = "none";
    // }
    //   display error message if input box is empty, this will override the previous message above
    if (isNaN(guess) || guess < minNum || guess > maxNum) {
      svg.style.display = "block";
      setMessage(
        ` Please enter a number between ${minNumValue} and ${maxNumValue}`,
        "rgb(183, 127, 127)"
      );
    }
  }
}

//   setMessage function
//     we are setting the parameter called color so that any color we input in the function 'setMessage' will be applied and we can edit it anytime and would not have the same color applied all through the project even as we will require different text colors later on. This makes the message appear as red only if the function with the parameter 'color' is given red
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}
