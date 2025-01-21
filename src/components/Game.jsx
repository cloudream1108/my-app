import React, { useState } from "react";
import Board from "./Board";
import "./Game.css";

function Game() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;
    const newBoard = [...board];
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const calculateWinner = (board) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6],            // Diagonals
    ];
    for (let [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = calculateWinner(board);

  return (
    <div className="game">
      <Board squares={board} onClick={handleClick} />
      <h2 className="game-status">
        {winner
          ? `贏家是：${winner}`
          : board.includes(null)
          ? `輪到：${isXNext ? "X" : "O"}`
          : "平手！"}
      </h2>
      <button className="reset-button" onClick={() => setBoard(Array(9).fill(null))}>重置遊戲</button>
    </div>
  );
}

export default Game;