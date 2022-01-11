import Home from './components/Home'
import ViewMars from './components/ViewMars.js';
import ViewEarth from './components/ViewEarth.js';
import './App.css';

function App() {
  return (
    <div className="main-wrapper">
      <Home />
      <ViewMars active="false" />
      <ViewEarth active="false" />
    </div>
  );
}

export default App;
