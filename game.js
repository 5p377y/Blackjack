let playerCards = [];
let dealerCards = [];
let playerScore = 0;
let dealerScore = 0;
let isGameOver = false;

const playerScoreSpan = document.getElementById('player-score');
const dealerScoreSpan = document.getElementById('dealer-score');
const playerCardsDiv = document.getElementById('player-cards');
const dealerCardsDiv = document.getElementById('dealer-cards');
const btnHit = document.getElementById('btnHit');
const btnStand = document.getElementById('btnStand');
const btnNewGame = document.getElementById('btnNewGame');
const resultDiv = document.getElementById('result');



function checkForEndOfGame() {
    if (playerScore >= 21 || dealerScore >= 17) {
        isGameOver = true;
        btnHit.disabled = true;
        btnStand.disabled = true;
        if (playerScore === 21) {
            resultDiv.textContent = "You've got Blackjack!";
        } else if (playerScore > 21) {
            resultDiv.textContent = "You're bust!";
        } else if (dealerScore > 21) {
            resultDiv.textContent = "Dealer busts. You win!";
        } else if (dealerScore === 21) {
            resultDiv.textContent = "Dealer has Blackjack. You lose.";
        } else if (playerScore > dealerScore) {
            resultDiv.textContent = "You win!";
        } else {
            resultDiv.textContent = "You lose!";
        }
    }
}

function newGame() {
    playerCards = [getRandomCard(), getRandomCard()];
    dealerCards = [getRandomCard(), getRandomCard()];
    isGameOver = false;
    btnHit.disabled = false;
    btnStand.disabled = false;
    resultDiv.textContent = '';
    updateGameArea();
}

btnHit.addEventListener('click', function() {
    playerCards.push(getRandomCard());
    updateGameArea();
    checkForEndOfGame();
});

btnStand.addEventListener('click', function() {
    while (dealerScore < 17) {
        dealerCards.push(getRandomCard());
        updateScores();
    }
    updateGameArea();
    checkForEndOfGame();
});

btnNewGame.addEventListener('click', newGame);

// Start a new game initially
newGame();

function getRandomCard() {
    const suits = ['♥', '♦', '♣', '♠']; // Using suit symbols
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    const valueIndex = Math.floor(Math.random() * 13);
    const suitIndex = Math.floor(Math.random() * 4);
    const cardValue = valueIndex >= 9 ? 10 : valueIndex + 1;
    const cardSuit = suits[suitIndex];
    const cardText = values[valueIndex] + cardSuit;
    return { cardValue: cardValue, cardText: cardText, suitColor: 'white' };
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
        cardDiv.textContent = card.cardText; // Ensure only the text is set here
        playerCardsDiv.appendChild(cardDiv);
    });
    dealerCards.forEach(card => {
        const cardDiv = document.createElement('div');
        cardDiv.className = 'card';
        cardDiv.style.color = card.suitColor;
        cardDiv.textContent = card.cardText; // Ensure only the text is set here
        dealerCardsDiv.appendChild(cardDiv);
    });
    updateScores();
}
