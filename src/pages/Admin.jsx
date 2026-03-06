import { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function Admin() {

  const ADMIN_USER = "Het@Kano";
  const ADMIN_PASS = "Kano@1909";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("adminAuth") === "true"
  );

  const [title, setTitle] = useState("");
  const [media, setMedia] = useState("");
  const [type, setType] = useState("image");
  const [text, setText] = useState("");

  const login = () => {
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem("adminAuth", "true");
      setIsAuth(true);
    } else {
      alert("Invalid username or password");
    }
  };

  const logout = () => {
    localStorage.removeItem("adminAuth");
    setIsAuth(false);
  };

  const handleSubmit = async () => {
    if (!title || !media) {
      alert("Fill all fields");
      return;
    }

    try {
      await addDoc(collection(db, "projects"), {
        title,
        type,
        media,
        text
      });

      alert("Project added successfully");

      setTitle("");
      setMedia("");
      setText("");

    } catch (error) {
      console.error(error);
      alert("Error saving project");
    }
  };

  if (!isAuth) {
    return (
      <div className="admin-page">
        <div className="admin-card">
          <h2>Admin Login</h2>

          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={login}>Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2>Admin Panel</h2>

        <input
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <input
          placeholder="Image / Video URL"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />

        <input
          placeholder="Caption"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleSubmit}>
          Add Project
        </button>

        <button onClick={logout}>
          Logout
        </button>

      </div>
    </div>
  );
}