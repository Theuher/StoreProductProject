import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LogIn from './LogIn';
import Home from './Home';
import Registration from './Registration';
import Dashboard from './Dashboard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import store from './store';
import { useAuth } from './useAuth';
import { Provider } from 'react-redux';

function AppContent() {

  const isAuthenticated = useAuth();
  return (
    <BrowserRouter>
      <div >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/Reg" element={<Registration />} />
          {isAuthenticated && (
            <>
              <Route path="/Dashboard" element={<Dashboard />} />
            </>
          )}
          <Route path='*' element = {<Navigate to="/Login"/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function App(){
  return(
    <Provider store={store}>
      <AppContent/>
    </Provider>
  )
}

export default App;
