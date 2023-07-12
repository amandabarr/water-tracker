// import logo from './logo.svg';
import React from 'react';
import { useState } from 'react';
import './App.css';

export default function App() {
  const [waterCount, setWaterCount] = useState(0);

  function handleClick() {
    setWaterCount(waterCount + 8);
  }

  function undoClick() {
    if (waterCount > 8) {
      setWaterCount(waterCount - 8);
    } else {
      setWaterCount(0);
    }
  }

  function handleUserWaterCountChange() {
    const inputNumber = document.getElementById("customOunces");
    const userInput = parseInt(
      document.getElementById("customOunces").value,
      10
    );
    setWaterCount(waterCount + userInput);
    inputNumber.value="";
  }

  return (
    <div>
      <h2>You've had {waterCount} ounces of water so far.</h2>

      <UserWaterCount onCustomSubmit={handleUserWaterCountChange} />
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

function UserWaterCount({ onCustomSubmit }) {
  return (
    <div>
      <form id="userWaterCount">
        <input type="number" id="customOunces" />
        <input type="button" className="userWaterCount" onClick={onCustomSubmit} value="Submit" />
      </form>
    </div>
  );
}

