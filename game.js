let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
let isGameOver = false;
let Balance = 100;

const playerScoreSpan = document.getElementById('player-score');
const dealerScoreSpan = document.getElementById('dealer-score');
const playerCardsDiv = document.getElementById('player-cards');
const dealerCardsDiv = document.getElementById('dealer-cards');
const btnHit = document.getElementById('btnHit');
const btnStand = document.getElementById('btnStand');
const btnNewGame = document.getElementById('btnNewGame');
const resultDiv = document.getElementById('result');
const BalanceDiv = document.getElementById('Balance');  // Display Balance

function updateBalanceDisplay() {
    BalanceDiv.textContent = 'Balance: ' + Balance;
}

btnHit.addEventListener('click', function() {
    if (!isGameOver) {
        playerCards.push(getRandomCard());
        updateGameArea();
        checkForEndOfGame();
    }
});

btnStand.addEventListener('click', function() {
    if (!isGameOver) {
        while (dealerScore < 17) {
            dealerCards.push(getRandomCard());
            updateScores();
        }
        updateGameArea();
        checkForEndOfGame();
    }
});

btnNewGame.addEventListener('click', newGame);

// Start a new game initially
newGame();

function getRandomCard() {
    const suits = ['♥', '♦', '♣', '♠']; // Using suit symbols
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const valueIndex = Math.floor(Math.random() * values.length);
    const suitIndex = Math.floor(Math.random() * suits.length);
    let cardValue;

    if (values[valueIndex] === 'J' || values[valueIndex] === 'Q' || values[valueIndex] === 'K') {
        cardValue = 10;
    } else if (values[valueIndex] === 'A') {
        cardValue = 11; // Here, you might adjust based on the current score later
    } else {
        cardValue = parseInt(values[valueIndex]);
    }

    const cardSuit = suits[suitIndex];
    const cardText = values[valueIndex] + cardSuit;
    return { cardValue: cardValue, cardText: cardText, suitColor: (cardSuit === '♥' || cardSuit === '♦') ? 'white' : 'white' };
}

function updateScores() {
    playerScore = playerCards.reduce((acc, card) => acc + card.cardValue, 0);
    dealerScore = dealerCards.reduce((acc, card) => acc + card.cardValue, 0);
    playerScoreSpan.textContent = 'Player Score: ' + playerScore;
    dealerScoreSpan.textContent = 'Dealer Score: ' + dealerScore;
}

function updateGameArea() {
    playerCardsDiv.innerHTML = "Player's Cards: ";
    dealerCardsDiv.innerHTML = "Dealer's Cards: ";
    playerCards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.style.color = card.suitColor;
        cardDiv.textContent = card.cardText;
        playerCardsDiv.appendChild(cardDiv);
    });
    dealerCards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.style.color = card.suitColor;
        cardDiv.textContent = card.cardText;
        dealerCardsDiv.appendChild(cardDiv);
    });
    updateScores();
}
const betInput = document.getElementById('betInput');
const btnBet = document.getElementById('btnBet');

function placeBet() {
    const betAmount = parseInt(betInput.value);
    if (betAmount > 0 && betAmount <= Balance) {
        Balance -= betAmount; // Subtract bet amount from balance
        newGame(betAmount);
        btnBet.disabled = true; // Disable bet button after placing a bet
        betInput.disabled = true; // Disable changing the bet after the game starts
    } else {
        alert("Invalid bet amount or insufficient balance.");
    }
}

function newGame(betAmount) {
    playerCards = [getRandomCard(), getRandomCard()];
    dealerCards = [getRandomCard()];
    isGameOver = false;
    btnHit.disabled = false;
    btnStand.disabled = false;
    resultDiv.textContent = '';
    updateGameArea();
    updateBalanceDisplay();
}

function checkForEndOfGame() {
    if (playerScore >= 21 || dealerScore >= 17) {
        isGameOver = true;
        btnHit.disabled = true;
        btnStand.disabled = true;
        let winAmount = 0;
        const betAmount = parseInt(betInput.value);
        if (playerScore === 21) {
            resultDiv.textContent = "You've got Blackjack!";
            winAmount = betAmount * 2;
        } else if (playerScore > 21) {
            resultDiv.textContent = "You're bust!";
        } else if (dealerScore > 21) {
            resultDiv.textContent = "Dealer busts. You win!";
            winAmount = betAmount * 2;
        } else if (dealerScore === 21) {
            resultDiv.textContent = "Dealer has Blackjack. You lose.";
        } else if (playerScore > dealerScore) {
            resultDiv.textContent = "You win!";
            winAmount = betAmount * 2;
        } else {
            resultDiv.textContent = "You lose!";
        }
        Balance += winAmount;
        updateBalanceDisplay();
        btnBet.disabled = false; // Enable bet button for next game
        betInput.disabled = false; // Enable bet input for next game
    }
}

btnBet.addEventListener('click', placeBet);

// Initially disable game buttons until a bet is placed
btnHit.disabled = true;
btnStand.disabled = true;
btnNewGame.disabled = true;
updateBalanceDisplay();
