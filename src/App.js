import Navbar from './components/Navbar';
import ToDo from './components/ToDo';
import { Routes, Route } from "react-router-dom";
import Calender from './components/Calender';
import './App'
import CompletedTask from './components/CompletedTask';
import Footer from './components/Footer';
function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<ToDo />} />
        <Route path="/completed" element={<CompletedTask />} />
        <Route path="/calender" element={<Calender />} />
      </Routes>
      <Footer></Footer>
    </div>
  );
}

export default App;
