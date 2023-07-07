// import logo from './logo.svg';
import React from 'react';
import { useState } from 'react';
import './App.css';

export default function App() {
  const [waterCount, setWaterCount] = useState(0);

  function handleClick() {
    setWaterCount(waterCount + 1);
  }

  function undoClick() {
    if (waterCount > 0) {
      setWaterCount(waterCount - 1);
    } else {
      setWaterCount(0);
    }
  }

  function handleUserWaterCountChange() {
    const userInput = parseInt(
      document.getElementById("userWaterCount").value,
      10
    );
    setWaterCount(waterCount + userInput);
  }

  return (
    <div>
      <h2>You've had {waterCount} glasses of water so far.</h2>
      <input id="userWaterCount" type="number" />
      <UserWaterCount onCustomSubmit={handleUserWaterCountChange} />
      <WaterCounter
        waterCount={waterCount}
        onWaterCountClick={() => handleClick()}
      />
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

function UserWaterCount({ onCustomSubmit }) {
  return (
    <div>
      <button className="userWaterCount" onClick={onCustomSubmit}></button>
    </div>
  );
}
