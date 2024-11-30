import React, { useState } from "react";

const DashboardScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleAvatarClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOptionClick = (option) => {
    setMenuOpen(false);
    if (option === "logout") {
      console.log("Logout clicked");
      // Add logout logic here
    } else if (option === "profile") {
      console.log("View Profile clicked");
      // Add view profile logic here
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <header style={styles.navbar}>
        <h1 style={styles.navTitle}>KetiKatha</h1>
        <div style={styles.avatarContainer} onClick={handleAvatarClick}>
          <img
            src="https://via.placeholder.com/40"
            alt="Avatar"
            style={styles.avatar}
          />
        </div>
        {menuOpen && (
          <div style={styles.menu}>
            <button onClick={() => handleOptionClick("profile")} style={styles.menuItem}>
              View Profile
            </button>
            <button onClick={() => handleOptionClick("logout")} style={styles.menuItem}>
              Logout
            </button>
          </div>
        )}
      </header>

      {/* Centered Content */}
      <main style={styles.contentWrapper}>
        <div style={styles.content}>
          <h2 style={styles.heading}>Publish Story</h2>
          <form style={styles.form}>
            <label style={styles.label}>Title</label>
            <input type="text" placeholder="Enter title" style={styles.input} />

            <label style={styles.label}>Story</label>
            <textarea placeholder="Write your story here..." style={styles.textarea}></textarea>

            <label style={styles.label}>Upload Image</label>
            <button type="button" style={styles.uploadButton}>
              Upload Image
            </button>

            <button type="submit" style={styles.submitButton}>
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    margin: 0,
    padding: 0,
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f5f5f5",
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: "#f0f0f0",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  navTitle: {
    fontSize: "20px",
    fontWeight: "bold",
    margin: 0,
  },
  avatarContainer: {
    position: "relative",
    cursor: "pointer",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  menu: {
    position: "absolute",
    top: "60px",
    right: "20px",
    backgroundColor: "white",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    overflow: "hidden",
    zIndex: 10,
  },
  menuItem: {
    display: "block",
    padding: "10px 20px",
    border: "none",
    background: "none",
    textAlign: "left",
    width: "100%",
    cursor: "pointer",
  },
  contentWrapper: {
    flex: 1, // Ensures the content takes up the available space below the navbar
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heading: {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
    textAlign: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  label: {
    fontSize: "16px",
    marginBottom: "5px",
  },
  input: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  textarea: {
    padding: "10px",
    fontSize: "14px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    minHeight: "300px", // Increased height for the story input
    resize: "vertical", // Allows only vertical resizing
    overflow: "auto", // Ensures content doesn't overflow the container
  },
  uploadButton: {
    padding: "6px 12px", // Smaller button
    fontSize: "14px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  submitButton: {
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default DashboardScreen;
