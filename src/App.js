import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const Navigate =useNavigate();
  return (
    <Routes>
      <Route path="/" element={ <Register /> }/>
      {/* <Route path="/Login" element={ <Login /> }/>
      <Route path="/home" element={ <Home /> }/>        
      <Route path="/Login" element={ <Login /> }/> */}
      {
        localStorage.getItem('auth_token')?
        <Route path="/home" element={ <Home /> }/>:
        <Route path="/Login" element={ <Login /> }/>
      }

    </Routes>
  );
}

export default App;
