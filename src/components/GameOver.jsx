const GameOver = ({ winner, onRematch }) => {
  return (
    <div id="game-over">
      <h2>Game over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>Draw!</p>}
      <p>
        <button onClick={onRematch}>Rematch!</button>
      </p>
    </div>
  );
};

export default GameOver;
