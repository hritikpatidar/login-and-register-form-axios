import { Route, Routes} from 'react-router-dom';
import About from './pages/About';
import Contact from './pages/Contact';
import Features from './pages/Features';
import Home from './pages/Home';
import News from './pages/News';
import Sport from './pages/Sport';
import Layout from './component/Layout';
import Login from './component/Login';
import Register from './component/Register';
import PrivateRoute from './privateroute/PrivateRoute';
import Forgetpwd from './component/Forgetpwd';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Register /> }/>
      <Route path="/Login" element={ <Login /> }/>
      <Route path="/forgetpassword" element={ <Forgetpwd />}/>
      
      <Route exact element={<PrivateRoute />}>
        <Route path="" element={ <Layout />}>
          <Route index path="home" element={ <Home /> }/>
          <Route path="news" element={ <News /> }/>
          <Route path="sport" element={ <Sport /> }/>
          <Route path="features" element={ <Features /> }/>
          <Route path="about" element={ <About /> }/>
          <Route path="contact" element={ <Contact /> }/>
        </Route>
      </Route>
      
    </Routes>
  );
}

export default App;
