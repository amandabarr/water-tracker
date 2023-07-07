// import logo from './logo.svg';
import React from 'react';
import { useState } from 'react';
import './App.css';

// export default function App() {
//   return (
//     <div>
//       <h1>Don't Forget to Hydrate</h1>
//       <WaterCounter />
//     </div>
//   );
// }

// function WaterCounter () {
//   const [waterCount, setWaterCount] = useState(0);
//   function handleClick() {
//     setWaterCount(waterCount + 1);
//   }
//   return (
//     <div>
//     <h1>You've had {waterCount} glasses of water so far.</h1>
//     <button className="water-count" onClick={handleClick}>Add Water</button>
//     </div>
//   );
// }

export default function App() {
  const [waterCount, setWaterCount] = useState(0);
  function handleClick() {
    setWaterCount(waterCount + 1);
  }
  function undoClick() {
    if (waterCount > 0) {
      setWaterCount(waterCount - 1);
    } else {
      setWaterCount == 0;
    }

  }
  return (
    <div>
      <h1>Don't Forget to Hydrate!</h1>
      <WaterCounter waterCount={waterCount} onWaterCountClick={() => handleClick()} />
      <WaterReducer onWaterReducerClick={() => undoClick()} />
    </div>
  );
}

function WaterCounter ({ waterCount, onWaterCountClick}) {

  return (
    <div>
    <h2>You've had {waterCount} glasses of water so far.</h2>
    <button className="WaterCount" onClick={onWaterCountClick}>Add 8oz Water</button>
    </div>
  );
}

function WaterReducer ({ onWaterReducerClick }) {

  return (
  <div>
    <button className="WaterReducer" onClick={onWaterReducerClick}>Oops! Remove 8oz Water</button>
  </div>
  );
}