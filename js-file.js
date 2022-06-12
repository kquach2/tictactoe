const Gameboard = (() => {
    let board = new Array(9).fill("");

    const checkForWin = (marker) => {
        return (JSON.stringify(board.slice(0,3)) == JSON.stringify([marker, marker, marker]) || JSON.stringify(board.slice(3,6)) == JSON.stringify([marker, marker, marker]) || JSON.stringify(board.slice(6,9)) == JSON.stringify([marker, marker, marker]) || JSON.stringify([board[0], board[3], board[6]]) == JSON.stringify([marker, marker, marker]) || 
        JSON.stringify([board[1], board[4], board[7]]) == JSON.stringify([marker, marker, marker]) || JSON.stringify([board[2], board[5], board[8]]) == JSON.stringify([marker, marker, marker]) || JSON.stringify([board[0], board[4], board[8]]) == JSON.stringify([marker, marker, marker]) || JSON.stringify([board[2], board[4], board[6]]) == JSON.stringify([marker, marker, marker]));
    }

    const getBoard = () => {
        return [...board];
    }

    const setCell = (index, marker) => {
        board[index] = marker;
    }

    return {setCell, getBoard, checkForWin, resetBoard() { board = new Array(9).fill(""); }};

})();

    
const playerFactory = (name, mark) => {
    return {name, mark};
}

const displayController = (() => {
    const squares = document.querySelectorAll('.square');
    const messageElement = document.querySelector('#message');
    const restartBtn = document.querySelector('#restart');

    squares.forEach((square) => {
        square.addEventListener('click', () => {
            if (square.textContent == "" && !gameFlow.getGameOver()) {
                square.textContent = gameFlow.getCurrentPlayer().mark;
                gameFlow.playRound(square.dataset.index);
            }
        });
    });

    const setMessage = (message) => {
        messageElement.textContent = message;
    }

    const setResultMessage = (winner) => {
        if (winner == 'tie') {
            messageElement.textContent = 'The game has ended in a tie!';
            gameFlow.endGame();
        }
        else {
            messageElement.textContent = `${winner} is the winner!`;
            gameFlow.endGame();
        }
    }

    restartBtn.addEventListener('click', () => {
        Gameboard.resetBoard();
        gameFlow.reset();
        squares.forEach((square) => {
            square.textContent = '';
        });
        setMessage(`${gameFlow.getCurrentPlayer().name}'s turn`);
    });

    return {setMessage, setResultMessage};

})();

const gameFlow = (() => {
    let gameOver = false;
    const player1 = playerFactory('Player X', 'X');
    const player2 = playerFactory('Player O','O');

    let currentPlayer = player1;

    const playRound = (index) => {
        Gameboard.setCell(parseInt(index), currentPlayer.mark);
        if (Gameboard.checkForWin(currentPlayer.mark)) {
            displayController.setResultMessage(currentPlayer.name);
            gameOver = true;
        }
        else if (!Gameboard.getBoard().includes("")) displayController.setResultMessage('tie');
        else {
            console.log('Hello');
            switchPlayer();
            displayController.setMessage(`${currentPlayer.name}'s turn`);
        }
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const switchPlayer = () => {
        if (currentPlayer == player1) {
            currentPlayer = player2;
        }
        else currentPlayer = player1;
    }

    const endGame = () => {
        gameOver = true;
    }

    const getGameOver = () => {
        return gameOver;
    }

    return {playRound, getCurrentPlayer, endGame, getGameOver, reset() { currentPlayer = player1; gameOver = false; }};

})();


