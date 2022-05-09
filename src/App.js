import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Register /> }/>
      <Route path="/Login" element={ <Login /> }/>
    </Routes>
  );
}

export default App;
