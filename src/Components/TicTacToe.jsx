import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import circle_icon from "../Assets/circle.png";
import cross_png from "../Assets/cross.png";
import Confetti from "react-confetti";
import { useWindowSize } from "@uidotdev/usehooks";

const TicTacToe = ({ f_size, f_streak }) => {
  const navigate = useNavigate();
  const n = parseInt(f_size); // grid size
  const size = parseInt(f_streak); // game streak
  const [gridData, setGridData] = useState(
    Array.from({ length: n }, () => Array(n).fill(null))
  );
  const wind_size = useWindowSize();
  const [count, setCount] = useState(0);
  const [lock, setLock] = useState(false);
  const [winner, setWinner] = useState(null);
  const [animate, setAnimate] = useState(false);

  function checkWinner(grid) {
    const checkLine = (line) => {
      for (let i = 0; i <= line.length - size; i++) {
        const subLine = line.slice(i, i + size);
        if (subLine.every((cell) => cell === "x")) return "x";
        if (subLine.every((cell) => cell === "o")) return "o";
      }
      return null;
    };

    for (let row of grid) {
      const rowWinner = checkLine(row);
      if (rowWinner) return rowWinner;
    }

    for (let col = 0; col < n; col++) {
      const column = grid.map((row) => row[col]);
      const columnWinner = checkLine(column);
      if (columnWinner) return columnWinner;
    }

    const getDiagonal = (startX, startY, dx, dy) => {
      const diagonal = [];
      let x = startX,
        y = startY;
      while (x >= 0 && x < n && y >= 0 && y < n) {
        diagonal.push(grid[x][y]);
        x += dx;
        y += dy;
      }
      return diagonal;
    };

    for (let i = 0; i <= n - size; i++) {
      let diag1 = getDiagonal(i, 0, 1, 1);
      let diag2 = getDiagonal(0, i, 1, 1);
      let diag3 = getDiagonal(i, n - 1, 1, -1);
      let diag4 = getDiagonal(0, n - 1 - i, 1, -1);

      const diagonalWinner =
        checkLine(diag1) ||
        checkLine(diag2) ||
        checkLine(diag3) ||
        checkLine(diag4);
      if (diagonalWinner) return diagonalWinner;
    }

    return null;
  }

  function handleClick(i1, i2) {
    if (lock || gridData[i1][i2] !== null || winner) {
      return;
    }

    const newGridData = gridData.map((row, rowIndex) =>
      row.map((cell, cellIndex) => {
        if (rowIndex === i1 && cellIndex === i2) {
          return count % 2 === 0 ? "x" : "o";
        }
        return cell;
      })
    );

    setGridData(newGridData);
    setCount(count + 1);

    const gameWinner = checkWinner(newGridData);
    if (gameWinner) {
      setWinner(gameWinner);
      setLock(true);
    }
  }

  function resetGrid() {
    const hasActiveCells = gridData.some((row) =>
      row.some((cell) => cell !== null)
    );
    if (hasActiveCells) {
      setAnimate(true);
      setTimeout(() => {
        setGridData(Array.from({ length: n }, () => Array(n).fill(null)));
        setCount(0);
        setLock(false);
        setWinner(null);
        setAnimate(false);
      }, 300);
    } else {
      setGridData(Array.from({ length: n }, () => Array(n).fill(null)));
      setCount(0);
      setLock(false);
      setWinner(null);
    }
  }

  return (
    <div className="w-full h-screen bg-slate-900 text-white select-none">
      <div className="load-animate flex flex-col h-screen justify-center items-center">
        <p className="text-center font-bold text-6xl mb-20 text-[#4ababa] mob:text-4xl mob:mb-16">
          TicTacToe Game
        </p>
        {winner && (
          <p className="text-center font-bold text-4xl mb-3 mob:text-xl">
            Congratulations {winner === "x" ? "Circle" : "Cross"} won!!
          </p>
        )}
        <div
          className={animate ? "grid-container" : ""}
          style={{ display: "flex", flexDirection: "column" }}
        >
          {gridData.map((row, rowIndex) => (
            <div key={rowIndex} style={{ display: "flex" }}>
              {row.map((cell, cellIndex) => (
                <div
                  key={cellIndex}
                  className={
                    cell
                      ? "bg-gray-500 class cursor-pointer rounded-md mob:rounded-sm m-[5px] shadow-sm shadow-gray-400 border-2 border-gray-600 mob:px-5 mob:w-2.5rem flex justify-center items-center"
                      : "bg-gray-500 hover:bg-gray-300 duration-300 class cursor-pointer rounded-md mob:rounded-sm m-[5px] shadow-sm shadow-gray-400 border-2 border-gray-600 mob:px-5 mob:w-2.5rem flex justify-center items-center"
                  }
                  onClick={() => handleClick(rowIndex, cellIndex)}
                >
                  {cell && (
                    <img
                      src={cell === "x" ? circle_icon : cross_png}
                      alt="icon"
                      className="mob:w-[100%] mob:h-[80%] object-contain mob:scale-150"
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div className="flex space-x-4 mt-10">
          <div
            className="bg-sky-500 rounded-md px-5 py-3 font-semibold text-lg mob:text-base cursor-pointer mob:px-4 mob:py-2"
            onClick={resetGrid}
          >
            {winner ? "Play Again?" : "Reset"}
          </div>
          <div
            className="bg-sky-500 rounded-md px-5 py-3 font-semibold text-lg mob:text-base cursor-pointer mob:px-4 mob:py-2"
            onClick={() => navigate("/")}
          >
            Settings
          </div>
        </div>
      </div>
      {winner && <Confetti width={wind_size.width} height={wind_size.height} />}
    </div>
  );
};

export default TicTacToe;
