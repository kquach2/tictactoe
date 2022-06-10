const Gameboard = (() => {
    const board = new Array(9).fill("");

    const checkForWin = (marker) => {
        return (board.slice(0,3) == [marker, marker, marker] || board.slice(3,6) == [marker, marker, marker] || board.slice(6,9) == [marker, marker, marker] || [board[0], board[3], board[6]] == [marker, marker, marker] || 
        [board[1], board[4], board[7]] == [marker, marker, marker] || [board[2], board[5], board[8]] == [marker, marker, marker] || [board[0], board[4], board[8]] == [marker, marker, marker] || [board[2], board[4], board[6]] == [marker, marker, marker]);
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
            if (square.textContent == "") {
                square.textContent = gameFlow.getCurrentPlayer.mark;
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
        }
        else messageElement.textContent = `${winner} is the winner!`;
    }

    restartBtn.addEventListener('click', () => {
        currentPlayer == player1;
        Gameboard.resetBoard();
        squares.forEach((square) => {
            square.textContent = '';
        });
        setMessage(`${currentPlayer.name}'s turn`);
    });

    return {setMessage, setResultMessage};

})();

const gameFlow = (() => {
    const player1 = playerFactory('player1', 'X');
    const player2 = playerFactory('player2','O');

    let currentPlayer = player1;

    const playRound = (index) => {
        Gameboard.setCell(parseInt(index), currentPlayer.mark);
        if (Gameboard.checkForWin(currentPlayer.mark)) {
            displayController.setResultMessage(currentPlayer.name);
        }
        else if (!Gameboard.getBoard().includes("")) displayController.setResultMessage('tie');
        else {
            switchPlayer();
            displayController.setMessage(`${currentPlayer.name}'s turn`);
        }
    }

    const getCurrentPlayer = () => {
        return currentPlayer;
    }

    const switchPlayer = () => {
        if (currentPlayer == player1) {
            currentPlayer == player2;
        }
        else currentPlayer == player1;
    }

    return {playRound, getCurrentPlayer, reset() { currentPlayer == player1; }};

});


