import Navbar from './components/Navbar';
import ToDo from './components/ToDo';
import { Routes, Route } from "react-router-dom";
import Calender from './components/Calender';

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/calender" element={<Calender />} />
      </Routes>
    </div>
  );
}

export default App;
