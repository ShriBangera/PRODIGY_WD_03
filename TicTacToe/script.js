let playerText = document.getElementById('playerText');
let restartBtn = document.getElementById('restartBtn');
let boxes = Array.from(document.getElementsByClassName('box'));

let winnerIndicator = getComputedStyle(document.body).getPropertyValue('--winning-blocks');

const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;
let spaces = Array(9).fill(null);

const startGame = () => {
    boxes.forEach(box => box.addEventListener('click', boxClicked));
};

function boxClicked(e) {
    const id = e.target.id;

    if (!spaces[id] && !playerHasWon() && !isDraw()) {
        spaces[id] = currentPlayer;
        e.target.innerText = currentPlayer;

        if (currentPlayer === X_TEXT) {
            e.target.classList.add('x-symbol');
        } else {
            e.target.classList.remove('x-symbol');
        }

        if (playerHasWon()) {
            playerText.innerHTML = `${currentPlayer} has won!`;
            if (currentPlayer === X_TEXT) {
                playerText.classList.add('x-winner');
            } else {
                playerText.classList.remove('x-winner');
            }
            let winning_blocks = playerHasWon();
            winning_blocks.forEach(box => boxes[box].style.backgroundColor = winnerIndicator);

            // Automatically restart after 2 seconds
            setTimeout(restart, 2000);
            return;
        }

        if (isDraw()) {
            playerText.innerHTML = "It's a draw!";
            playerText.classList.remove('x-winner');

            // Automatically restart after 2 seconds
            setTimeout(restart, 2000);
            return;
        }

        currentPlayer = currentPlayer === X_TEXT ? O_TEXT : X_TEXT;
    }
}

const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function playerHasWon() {
    for (const condition of winningCombos) {
        let [a, b, c] = condition;

        if (spaces[a] && (spaces[a] === spaces[b] && spaces[a] === spaces[c])) {
            return [a, b, c];
        }
    }
    return false;
}

function isDraw() {
    return spaces.every(space => space !== null) && !playerHasWon();
}

restartBtn.addEventListener('click', restart);

function restart() {
    spaces.fill(null);

    boxes.forEach(box => {
        box.innerText = '';
        box.style.backgroundColor = '';
        box.classList.remove('x-symbol');
    });

    playerText.innerHTML = 'Tic Tac Toe';
    playerText.classList.remove('x-winner');
    currentPlayer = X_TEXT;
}

startGame();
