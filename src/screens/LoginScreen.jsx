import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig"; // Import your Firebase config

const LoginScreen = ({ navigateToDashboard }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false); // State for spinner

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); // Start spinner
    setError(""); // Reset error

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigateToDashboard(); // Navigate to the dashboard after successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Stop spinner
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.title}>KetiKatha Publisher</h2>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? (
            <div style={styles.spinner}></div>
          ) : (
            "Login"
          )}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f5f5f5",
  },
  form: {
    width: "300px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "white",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "10px",
    margin: "10px -10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid #ffffff",
    borderTop: "2px solid transparent",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  error: {
    color: "red",
    marginBottom: "15px",
    fontSize: "14px",
  },
  "@keyframes spin": {
    "0%": { transform: "rotate(0deg)" },
    "100%": { transform: "rotate(360deg)" },
  },
};

export default LoginScreen;
