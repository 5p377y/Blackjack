let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
let isGameOver = false;
let coins = 10;  // Starting coins

const playerScoreSpan = document.getElementById('player-score');
const dealerScoreSpan = document.getElementById('dealer-score');
const playerCardsDiv = document.getElementById('player-cards');
const dealerCardsDiv = document.getElementById('dealer-cards');
const btnHit = document.getElementById('btnHit');
const btnStand = document.getElementById('btnStand');
const btnNewGame = document.getElementById('btnNewGame');
const resultDiv = document.getElementById('result');
const coinsDiv = document.getElementById('coins');  // Display coins

function updateCoinsDisplay() {
    coinsDiv.textContent = 'Coins: ' + coins;
}

function checkForEndOfGame() {
    if (playerScore >= 21 || dealerScore >= 17) {
        isGameOver = true;
        btnHit.disabled = true;
        btnStand.disabled = true;
        let winAmount = 0;
        if (playerScore === 21) {
            resultDiv.textContent = "You've got Blackjack!";
            winAmount = 2;
        } else if (playerScore > 21) {
            resultDiv.textContent = "You're bust!";
        } else if (dealerScore > 21) {
            resultDiv.textContent = "Dealer busts. You win!";
            winAmount = 2;
        } else if (dealerScore === 21) {
            resultDiv.textContent = "Dealer has Blackjack. You lose.";
        } else if (playerScore > dealerScore) {
            resultDiv.textContent = "You win!";
            winAmount = 2;
        } else {
            resultDiv.textContent = "You lose!";
        }
        coins += winAmount;
        updateCoinsDisplay();
    }
}

function newGame() {
    if (coins > 0) {
        coins -= 1; // Bet 1 coin to start a game
        playerCards = [getRandomCard(), getRandomCard()];
        dealerCards = [getRandomCard()];
        isGameOver = false;
        btnHit.disabled = false;
        btnStand.disabled = false;
        resultDiv.textContent = '';
        updateGameArea();
        updateCoinsDisplay();
    } else {
        alert("You're out of coins!");
    }
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
