// import logo from './logo.svg';
import React, { useEffect, useState} from 'react';
import './App.css';

export default function App() {
  const [waterCount, setWaterCount] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);

  const waterTypes = ['Water', "Tea", 'Coffee', 'Juice'];
  const [selectedWaterType, setSelectedWaterType] = useState(waterTypes[0]);

  useEffect( () => {
    const storedHistory = JSON.parse(window.localStorage.getItem('history'));
    if (storedHistory) {
      setHistory(storedHistory);
    }
  }, []);

  useEffect( () => {
    if (history.length > 0) {
      window.localStorage.setItem('history', JSON.stringify(history));
    }
  }, [history]);


  function handleUserWaterCountChange(event) {
    setUserInput(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const userInputValue = parseInt(userInput, 10);
    if (!isNaN(userInputValue)) {
      const newUserWaterCount = waterCount + userInputValue;
      const newHistoryEntry = {count: userInputValue, type: selectedWaterType };
      setWaterCount(newUserWaterCount);
      setHistory([...history, newHistoryEntry]);
      setUserInput(""); // Clear the input field after submission
    }
  }

  function handleWaterTypeChange(event) {
    setSelectedWaterType(event.target.value);
  }

  function undoClick() {
    if (history.length > 0) {
      const lastInput = history[history.length - 1]["count"];
      setWaterCount(waterCount - lastInput);
      setHistory(history.slice(0, -1));
    }
  }

  function clearHistory () {
    if (history.length > 0) {
      setHistory([]);
      localStorage.clear();
    }
  }

  return (
    <div>
      <h2>You've had {waterCount} ounces of water so far.</h2>
      <h2>Your water intake history today:</h2>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.count} ounces of {entry.type}
          </li>
        ))}
      </ul>

      <UserWaterCount
        userInput={userInput}
        onCustomSubmit={handleSubmit}
        onInputChange={handleUserWaterCountChange}
      />
      <WaterType waterTypes={waterTypes} selectedWaterType={selectedWaterType} onWaterTypeChange={handleWaterTypeChange} />
      <WaterReducer onWaterReducerClick={undoClick} />
      <ClearHistory onClearHistoryClick={clearHistory} />
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
        <label>
          Ounces:
          <input type="number" id="customOunces" value={userInput} onChange={onInputChange} />
        </label>
        <input type="submit" className="userWaterCount" onClick={onCustomSubmit} value="Submit" />
      </form>
    </div>
  );
}

function WaterType({ waterTypes, selectedWaterType, onWaterTypeChange}) {
  return (
    <div>
      <select name="selectType" id="selectType" value={selectedWaterType} onChange={onWaterTypeChange}>
        {waterTypes.map((type, index) => (
          <option key={index} value={type}>
          {type}
          </option>
        ))}
      </select>
    </div>
  )
}

function ClearHistory({onClearHistoryClick}) {
  return (
    <div>
      <button className="clearHistory" onClick={onClearHistoryClick}>
        Clear History
      </button>
    </div>
  )
}



