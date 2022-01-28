import React, { useState } from "react";
import Board from "../Board/Board";
import "./Game.css";

const Game = () => {
  const [gameHistory, setGameHistory] = useState([
    { squares: Array(9).fill(null) },
  ]); // Start of game
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  // states to hold player names
  const [player1, setPlayer1] = useState("X");
  const [player2, setPlayer2] = useState("O");
  // states to keep history of games won
  const [score1, setScore1] = useState(0);
  const [score2, setScore2] = useState(0);

  const calculateWinner = (squares) => {
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

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }

    return null;
  };

  const handleWinX = () => {
    setScore1(score1 + 1);
  };

  const handleWinO = () => {
    setScore2(score2 + 1);
  };

  const handleClick = (i) => {
    const history = gameHistory.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    console.log(squares);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";

    setGameHistory([...history, { squares }]);
    setStepNumber(history.length);
    setXisNext(!xIsNext);
    if (calculateWinner(squares) === "X") {
      handleWinX();
    }
    if (calculateWinner(squares) === "O") {
      handleWinO();
    }
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const current = gameHistory[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = gameHistory.map((step, move) => {
    const desc = move ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;
  if (winner) {
    // displays winner text with name from player state
    status = "Winner: " + (winner === "X" ? `${player1}` : `${player2}`);
    console.log(winner);
  } else {
    // displays text for next player with name from player state
    status = "Next player: " + (xIsNext ? `${player1}` : `${player2}`);
  }

  // functions to update player names
  const handleChangeP1 = (e) => {
    setPlayer1(e.target.value);
  };

  const handleChangeP2 = (e) => {
    setPlayer2(e.target.value);
  };

  // function to restart game
  const handleRestart = () => {
    setStepNumber(0);
    setGameHistory([{ squares: Array(9).fill(null) }]);
    setXisNext(true);
  };

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
      <div className="scores-container">
        <div className="names">
          {/* inputs for typed player names  */}
          <input
            className="player1"
            placeholder="X"
            value={player1}
            onChange={handleChangeP1}
          />
          <input
            className="player2"
            placeholder="O"
            value={player2}
            onChange={handleChangeP2}
          />
        </div>
        <div className="scores">
          {/* divs to display player win history */}
          <div>
            {player1} wins: {score1}
          </div>
          <div>
            {player2} wins: {score2}
          </div>
        </div>
        {/* button to restart game */}
        <button onClick={handleRestart}>Restart Game</button>
      </div>
    </div>
  );
};

export default Game;
