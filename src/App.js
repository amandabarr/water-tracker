// import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';

export default function App() {
  const [waterCount, setWaterCount] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);

  function handleClick() {
    const newWaterCount = waterCount + 8;
    setWaterCount(newWaterCount);
    setHistory([...history, newWaterCount]);
  }

  function undoClick() {
    if (waterCount > 8) {
      setWaterCount(waterCount - 8);
    } else {
      setWaterCount(0);
    }
  }

  // function handleUserWaterCountChange() {
  //   const inputElement = document.getElementById("customOunces");
  //   const userInput = parseInt(
  //     inputElement.value,
  //     10
  //   );
  //   setWaterCount(waterCount + userInput);
  //   inputElement.value=""; //clears the input field
  // }

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
      <p>
      <WaterCounter
        waterCount={waterCount}
        onWaterCountClick={() => handleClick()}
      />
      </p>
      <WaterReducer onWaterReducerClick={() => undoClick()} />
    </div>
  );
}

function WaterCounter({ onWaterCountClick }) {
  return (
    <div>
      <button className="waterCount" onClick={onWaterCountClick}>
        Add 8oz Water
      </button>
    </div>
  );
}

function WaterReducer({ onWaterReducerClick }) {
  return (
    <div>
      <button className="waterReducer" onClick={onWaterReducerClick}>
        Oops! Remove 8oz Water
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


