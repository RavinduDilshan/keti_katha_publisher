import React, { useEffect, useState } from "react";
import { auth } from "../firebaseConfig"; // Import your Firebase config
import { getFirestore, doc, getDoc, collection, addDoc } from "firebase/firestore"; // Firestore imports
import { signOut } from "firebase/auth";

const DashboardScreen = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);
  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [loading, setLoading] = useState(false); // Loading state
  const [fullName, setFullName] = useState("");
  const db = getFirestore(); // Initialize Firestore

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (userId) {
          const userDocRef = doc(db, "users", userId);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            const { firstName, lastName } = userDoc.data();
            setFullName(`${firstName} ${lastName}`);
          } else {
            console.error("No such document!");
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [db]);

  // Handle logout
  const handleLogout = async () => {
    await signOut(auth);
    window.location.reload(); // Redirect to the login screen
  };

  const handleAvatarClick = () => {
    setMenuOpen(!menuOpen);
  };

  const handleOptionClick = async (option) => {
    setMenuOpen(false);
    if (option === "logout") {
      await handleLogout();
    } else if (option === "profile") {
      console.log("View Profile clicked");
      // Add view profile logic here
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // Strip the prefix (e.g., data:image/webp;base64,)
        const base64Data = reader.result.split(",")[1];
        setBase64Image(base64Data);
      };
      reader.readAsDataURL(file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !story || !base64Image) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    setLoading(true); // Start loading
    try {
      const storyData = {
        author: fullName,
        title,
        story,
        image: base64Image,
      };
      await addDoc(collection(db, "stories"), storyData);
      alert("Story submitted successfully!");
      setTitle("");
      setStory("");
      setBase64Image(null);
      setSelectedImage(null);
    } catch (error) {
      console.error("Error submitting story:", error);
      alert("Failed to submit story. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div style={styles.container}>
      {/* Navigation Bar */}
      <header style={styles.navbar}>
        <h1 style={styles.navTitle}>KetiKatha</h1>
        <div style={styles.navRight}>
          <span style={styles.welcomeText}>Welcome {fullName}!</span>
          <div style={styles.avatarContainer} onClick={handleAvatarClick}>
            <img
              src="https://via.placeholder.com/40"
              alt="Avatar"
              style={styles.avatar}
            />
          </div>
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
          <h2 style={styles.heading}>Create Story</h2>
          <form style={styles.form} onSubmit={handleSubmit}>
            <label style={styles.label}>Title</label>
            <input
              type="text"
              placeholder="Enter title"
              style={styles.input}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <label style={styles.label}>Story</label>
            <textarea
              placeholder="Write your story here..."
              style={styles.textarea}
              value={story}
              onChange={(e) => setStory(e.target.value)}
            ></textarea>

            <label style={styles.label}>Upload Image</label>
            <div>
              <input
                type="file"
                accept="image/*"
                style={styles.fileInput}
                onChange={handleImageChange}
              />
              {selectedImage && (
                <div style={styles.imagePreview}>
                  <img src={selectedImage} alt="Preview" style={styles.previewImage} />
                </div>
              )}
            </div>

            <button type="submit" style={styles.submitButton} disabled={loading}>
              {loading ? (
                <div className="spinner" style={styles.spinner}></div>
              ) : (
                "Submit"
              )}
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
  navRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  welcomeText: {
    fontSize: "16px",
    color: "#333",
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
    flex: 1,
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
    minHeight: "300px",
    resize: "vertical",
  },
  fileInput: {
    marginBottom: "10px",
  },
  imagePreview: {
    marginTop: "10px",
    textAlign: "center",
  },
  previewImage: {
    maxWidth: "100%",
    maxHeight: "200px",
    borderRadius: "8px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
  },
  submitButton: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "12px",
    fontSize: "16px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    position: "relative",
    height: "40px",
  },

  spinner: {
    width: "16px",
    height: "16px",
    border: "2px solid #f3f3f3",
    borderTop: "2px solid #28a745",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },


};

export default DashboardScreen;
