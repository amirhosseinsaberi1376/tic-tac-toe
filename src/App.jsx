import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "../src/winning-combinations";
import GameOver from "./components/GameOver";

const intialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  let currentPlayer = "X";
  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}
function deriveGameBoard(turns) {
  let gameBoard = [...intialGameBoard.map((array) => [...array])];

  for (let turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }
  return gameBoard;
}

function deriveWinner(gameBoard, players) {
  let winner = null;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSuareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSuareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSuareSymbol =
      gameBoard[combination[2].row][combination[2].column];
    if (
      firstSuareSymbol &&
      firstSuareSymbol === secondSuareSymbol &&
      firstSuareSymbol === thirdSuareSymbol
    ) {
      winner = players[firstSuareSymbol];
    }
  }
  return winner;
}

function App() {
  const [turns, setTurns] = useState([]);
  const [players, setPlayers] = useState({
    X: "Player 1",
    O: "Player 2",
  });
  const activePlayer = deriveActivePlayer(turns);
  const gameBoard = deriveGameBoard(turns);
  const winner = deriveWinner(gameBoard, players);
  const isDraw = turns.length === 9 && !winner;
  const handleSelectSquare = (rowIndex, colIndex) => {
    setTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  };

  const handleRematch = () => {
    setTurns([]);
  };

  const handleSettingPlayerNames = (symbol, newName) => {
    setPlayers((prevPlayerNames) => {
      return {
        ...prevPlayerNames,
        [symbol]: newName,
      };
    });
  };

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            name="Player1"
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handleSettingPlayerNames}
          />
          <Player
            name="Player2"
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handleSettingPlayerNames}
          />
        </ol>
        {(winner || isDraw) && (
          <GameOver winner={winner} onRematch={handleRematch} />
        )}
        <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
