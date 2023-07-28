// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [waterCount, setWaterCount] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);

  function handleUserWaterCountChange(event) {
    setUserInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userInputValue = parseInt(userInput, 10);
    if (!isNaN(userInputValue)) {
      const newUserWaterCount = waterCount + userInputValue;
      setWaterCount(newUserWaterCount);
      setHistory([...history, userInputValue]);
      setUserInput(""); // Clear the input field after submission
    }
  }

  function undoClick() {
    if (history.length > 0) {
      const lastInput = history[history.length - 1];
      setWaterCount(waterCount - lastInput);
      setHistory(history.slice(0, -1));
    }
  }

  return (
    <div>
      <h2>You've had {waterCount} ounces of water so far.</h2>
      <h2>Your water intake history today:
        <ul>
          {history.map((count, index) => (
            <li key={index}>{count}</li>
          ))}
        </ul>
      </h2>

      <UserWaterCount userInput={userInput} onCustomSubmit={handleSubmit} onInputChange={handleUserWaterCountChange} />
      <WaterReducer onWaterReducerClick={() => undoClick()} />
    </div>
  );
}

function WaterReducer({ onWaterReducerClick }) {
  return (
    <div>
      <button className="waterReducer" onClick={onWaterReducerClick}>
        Oops! Remove Last Entry
      </button>
    </div>
  );
}

function UserWaterCount({ userInput, onCustomSubmit, onInputChange }) {
  return (
    <div>
      <form id="userWaterCount" onSubmit={onCustomSubmit}>
        <input type="number" id="customOunces" value={userInput} onChange={onInputChange} />
        <input type="submit" className="userWaterCount" onClick={onCustomSubmit} value="Submit" />
      </form>
    </div>
  );
}


