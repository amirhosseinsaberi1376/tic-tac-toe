import { useState } from "react";

const Player = ({ name, symbol, isActive, onChangeName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);
  const isEditingHandler = () => {
    setIsEditing((editing) => !editing);
    if (isEditing) {
      onChangeName(symbol, playerName);
    }
  };
  const playerNameHandler = (event) => {
    setPlayerName(event.target.value);
  };
  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {isEditing && (
          <input
            type="text"
            required
            value={playerName}
            onChange={playerNameHandler}
          />
        )}
        {!isEditing && <span className="player-name">{playerName}</span>}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={isEditingHandler}>
        {isEditing && <p>Save</p>}
        {!isEditing && <p>Edit Name</p>}
      </button>
    </li>
  );
};

export default Player;
