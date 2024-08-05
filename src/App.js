import { useState } from 'react';

// Square component represents a single square in the tic-tac-toe board
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

// Board component represents the tic-tac-toe board
function Board({ xIsNext, squares, onPlay }) {
  // Handle click event on a square
  function handleClick(i) {
    // If there's a winner or the square is already filled, return early
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    // Create a copy of the squares array
    const nextSquares = squares.slice();
    // Set the value of the clicked square based on the current player
    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }
    // Call the onPlay function with the updated squares array
    onPlay(nextSquares);
  }

  // Determine the winner
  const winner = calculateWinner(squares);
  // Set the status message
  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Game component represents the entire game
export default function Game() {
  // State to keep track of the history of moves
  const [history, setHistory] = useState([Array(9).fill(null)]);
  // State to keep track of the current move
  const [currentMove, setCurrentMove] = useState(0);
  // Determine if 'X' is the next player
  const xIsNext = currentMove % 2 === 0;
  // Get the current squares from the history
  const currentSquares = history[currentMove];

  // Handle play event
  function handlePlay(nextSquares) {
    // Create a new history array with the new move
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    // Update the history and current move
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  // Jump to a specific move in the history
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  // Create a list of moves for the history
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

// Function to calculate the winner of the game
function calculateWinner(squares) {
  // Define the winning combinations
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  // Check if any winning combination is met
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  // Return null if no winner
  return null;
}