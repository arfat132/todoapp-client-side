import './App.css';
import Navbar from './components/Navbar';
import ToDo from './components/ToDo';
import {Routes, Route} from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
      <Route path="/" element={<ToDo />}>
        
      </Route>
    </Routes>
    </div>
  );
}

export default App;
