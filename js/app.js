/*
 * Create an array that holds all of your cards
 */
let cardsIcons = ["fa fa-diamond",
                  "fa fa-paper-plane-o",
                  "fa fa-anchor",
                  "fa fa-bolt",
                  "fa fa-cube",
                  "fa fa-leaf",
                  "fa fa-bicycle",
                  "fa fa-bomb"
                  ]
let cardsArray = cardsIcons.concat(cardsIcons);

/*
* Create the Global Variables to be used
*/

let matchedCardsArray = [];
let numCardsOpened = 0;
let firstOpenedCard = '';
let secondOpenedCard = '';
let deckCards = document.querySelector(".deck");
let shuffledCardsArray = [];

/* Initialize the Counter that keeps track of the number of moves the player makes */

let countMoves = 0;
let counterMoves = document.querySelector(".moves");

/* Initialize the Timer that keeps track of the time in seconds that the player plays the game */

let timeSecondsCount = 0;
let countSeconds = 0;
let timerCounter = document.querySelector(".timecount");

/* Define and Initialize the Star Rating counter */
let starCount = 0;

//* Refresh Board Game when the restart button is clicked
const refreshButton = document.querySelector(".restart");
refreshButton.addEventListener("click", function() {
  deckCards.innerHTML = '';
  displayBoardGame();
  initializeVariables();
});

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

//* Shuffle function from http://stackoverflow.com/a/2450976 */
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//* Display the Board Game using the shuffled list of cards */
function displayBoardGame() {
shuffledCardsArray = shuffle(cardsArray);
for (var i=0; i < shuffledCardsArray.length; i++) {
  let cardItem = document.createElement("li");
  cardItem.classList.add("card");
  cardItem.innerHTML = `<i class="${shuffledCardsArray[i]}"> </i>`;
//Add the card into the deck of cards
  deckCards.appendChild(cardItem);
}
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

function initializeVariables() {
 matchedCardsArray = [];
 numCardsOpened = 0;
 firstOpenedCard = '';
 secondOpenedCard = '';

 /* Initialize the Counter that keeps track of the number of moves the player makes */
 countMoves = 0;
 counterMoves = document.querySelector(".moves");
 counterMoves.innerHTML = countMoves;

 /* Initialize the Timer that keeps track of the time in seconds that the player plays the game */
 timeSecondsCount = 0;
 countSeconds = 0;
 countSeconds = setInterval(myTimer,1000);

 /* Initialize the Star counter */
 starCount = 0;

/* Adds the Event Listener "click" to each card on the deck of cards */
 let cardsList = document.getElementsByClassName("card");
 for (var i = 0; i < cardsList.length; i++) {
   cardsList[i].addEventListener("click", showCardImage);
 }
}

//* myTimer Function simply adds 1 for every second*/
function myTimer() {
    timeSecondsCount++;
    document.querySelector(".timecount").innerHTML = timeSecondsCount;
}


/* Function that shows the symbol of the card when it is clicked */
function showCardImage() {
   //*numCardsOpened++;
   if (!this.classList.contains("open")){ //this condition check to make sure the card clicked is not already opened
   if (numCardsOpened === 0) { //this is the first card opened
      numCardsOpened++;
      this.classList.add("open");
      this.classList.add("show");
      firstOpenedCard = this;
    }
   else if (numCardsOpened === 1) { //this is the second card opened; compare this card with the first card to see if's a match
        numCardsOpened++;
        this.classList.add("open");
        this.classList.add("show");
        secondOpenedCard = this;
        updateMovesCounter();
        checkCardsMatch();
        checkEndGame();
    }
  }

 }

//* Function that checks if the two opened cards Match*/
 function checkCardsMatch() {
  setTimeout(function() {
    numCardsOpened = 0;
  if (firstOpenedCard.innerHTML === secondOpenedCard.innerHTML) {
    matchedCardsArray.push(firstOpenedCard);
    matchedCardsArray.push(secondOpenedCard);
    firstOpenedCard.classList.add("match");
    secondOpenedCard.classList.add("match");
    openedCardsArray = [];
    firstOpenedCard = '';
    secondOpenedCard = '';
  }
  else {
    firstOpenedCard.classList.remove("open");
    firstOpenedCard.classList.remove("show");
    secondOpenedCard.classList.remove("open");
    secondOpenedCard.classList.remove("show");
    firstOpenedCard = '';
    secondOpenedCard = '';
  }

}, 500);
}

//* Increments the Moves Counter and Displays it on the page */
function updateMovesCounter () {
    countMoves++;
    counterMoves.innerHTML = countMoves;
}

//* Checks if the end of the Game has been reached. Meaning all the cards have been opened and matched! Display Congratulations Window!
function checkEndGame() {
  setTimeout(function() {
  if (matchedCardsArray.length === 16) {
    stopTimer();
    getStarRating();
    displayEndGameModal();
    setTimeout(function() {
      deckCards.innerHTML = '';
      displayBoardGame();
      initializeVariables();
    }, 7000);
  }
}, 3000);
}

//* Stops the Game timer
function stopTimer() {
  clearInterval(countSeconds);
}

//* Star Rating Implementation
//* If time < 40 seconds and Number of Moves <= 20 Then 3 Stars
//* If time >  40 and < 60 and Number of Moves > 20 and Number of Moves < 30 Then 2 stars
//* if time >= 60 and Number of Moves > = 30 and < 40 then 1 stars
//* Else 0 Stars
function getStarRating() {
  if ((timeSecondsCount <= 40) && (countMoves <= 20)) {
    starCount = 3;
  }
  else if ((timeSecondsCount > 40) && (timeSecondsCount < 60) && (countMoves > 20) && (countMoves <= 30)) {
    starCount = 2;
  }
  else if ((timeSecondsCount >= 60) && (timeSecondsCount < 80) && (countMoves > 30) && (countMoves <= 40)) {
    starCount = 1;
  }
  else {
    starCount = 0;
  }
}

//* https://www.w3schools.com/howto/howto_css_modals.asp */
//* Displays the Congratulatory Pop-up Window after the Game Ends */
function displayEndGameModal() {
    let modalGameEnds = document.querySelector(".modal");
    let span = document.querySelector(".close");
    let finishTime = document.querySelector(".timefinish");
    let finishMoves = document.querySelector(".movesfinish");
    let finishStars = document.querySelector(".starsfinish");
    finishTime.innerHTML = timeSecondsCount;
    finishMoves.innerHTML = countMoves;
    finishStars.innerHTML = starCount;
    modalGameEnds.style.display = "block";
    span.onclick = function() {
        modalGameEnds.style.display = "none";
    }
    window.onclick = function(event) {
        if (event.target == modalGameEnds) {
            modalGameEnds.style.display = "none";
        }
    }
}

//* START THE GAME *//
displayBoardGame();
initializeVariables();
