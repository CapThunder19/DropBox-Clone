import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

const AppContent = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup'];

  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path='/' element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
