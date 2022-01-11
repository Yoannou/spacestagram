import Home from './components/Home'
import ViewMars from './components/ViewMars.js';
import ViewEarth from './components/ViewEarth.js';
import './App.css';

function App() {
  return (
    <div className="main-wrapper">
      <Home offscreen="none"/>
      <ViewEarth offscreen="left" />
      <ViewMars offscreen="right" />
    </div>
  );
}

export default App;
