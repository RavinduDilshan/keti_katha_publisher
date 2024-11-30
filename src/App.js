import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebaseConfig'; // Firebase config file
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Monitor auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loader/spinner
  }

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <LoginScreen />} />
        
        {/* Protected Route */}
        <Route 
          path="/dashboard" 
          element={user ? <DashboardScreen /> : <Navigate to="/" />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
