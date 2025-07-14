import './App.scss';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Login from './pages/Login/Login';
import DashBoard from './pages/DashBoard/DashBoard';
import Footer from './pages/Footer/Footer';



function AppWrapper() {
  const location = useLocation();
  const showFooter = location.pathname === '/'; // conditionally render

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
      {showFooter && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;