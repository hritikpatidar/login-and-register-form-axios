import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import About from './component/About';
import Contact from './component/Contact';
import Features from './component/Features';
import Home from './component/Home';
import News from './component/News';
import Sport from './component/Sport';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Register /> }/>
      <Route path="/Login" element={ <Login /> }/>
      <Route path="/home" element={ <Home /> }/>
      <Route path="/news" element={ <News /> }/>
      <Route path="/sport" element={ <Sport /> }/>
      <Route path="/features" element={ <Features /> }/>
      <Route path="/about" element={ <About /> }/>
      <Route path="/contact" element={ <Contact /> }/>
    </Routes>
  );
}

export default App;
