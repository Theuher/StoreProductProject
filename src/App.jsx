import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LogIn from './LogIn';
import Home from './Home';
import Registration from './Registration';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Import custom CSS for margin and padding reset

function App() {
  return (
    <BrowserRouter>
      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/Reg" element={<Registration />} />
          <Route path="/Dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
