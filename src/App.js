import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';


function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
    </Routes>
  </Router>
  );
}

export default App;
