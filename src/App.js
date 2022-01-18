import React, { useState } from 'react'
import Home from './components/Home'
import ViewMars from './components/ViewMars.js';
import ViewEarth from './components/ViewEarth.js';
import './App.css';

function App() {

  const [homeOffscreen, setHomeOffscreen] = useState("none");
  const [earthOffscreen, setEarthOffscreen] = useState("left");
  const [marsOffscreen, setMarsOffscreen] = useState("right");
  const [marsHidden, setMarsHidden] = useState("hidden");
  const [earthHidden, setEarthHidden] = useState("hidden");

  // Code for swapping the sections around:
  function toggleView(newView = "home") {
    if (newView === "home") {
      setEarthOffscreen("left");
      setHomeOffscreen("none");
      setMarsOffscreen("right");
      setEarthHidden("hidden");
      setMarsHidden("hidden");
    }
    if (newView === "earth") {
      setEarthOffscreen("none");
      setHomeOffscreen("right");
      setMarsOffscreen("right");
      setEarthHidden("");
      setMarsHidden("hidden");
    }
    else if (newView === "mars"){
      setEarthOffscreen("left");
      setHomeOffscreen("left");
      setMarsOffscreen("none");
      setEarthHidden("hidden");
      setMarsHidden("");
    }
  }

  /*
  
      <div className="b1" onClick={() => {toggleView("earth")}}></div>
      <div className="b2" onClick={() => {toggleView("home")}}></div>
      <div className="b3" onClick={() => {toggleView("mars")}}></div>
  */

  return (
    <div className="main-wrapper">
      <Home offscreen={homeOffscreen} onButtonClick={toggleView} />
      <ViewEarth offscreen={earthOffscreen} hidden={earthHidden} onButtonClick={toggleView} />
      <ViewMars offscreen={marsOffscreen} hidden={marsHidden} onButtonClick={toggleView} />
    </div>
  );
}

export default App;
