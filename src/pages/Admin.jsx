import { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  doc
} from "firebase/firestore";

export default function Admin() {

  /* ---------- AUTH ---------- */
  const ADMIN_USER = "Het@Kano";
  const ADMIN_PASS = "Kano@1909";

  const [isAuth, setIsAuth] = useState(() => {
    return localStorage.getItem("adminAuth") === "true";
  });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

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

  /* ---------- FORM STATE ---------- */

  const [title, setTitle] = useState("");
  const [media, setMedia] = useState("");
  const [type, setType] = useState("image");
  const [text, setText] = useState("");
  const [editId, setEditId] = useState(null);

  const [projects, setProjects] = useState([]);

  /* ---------- FETCH PROJECTS ---------- */

  const fetchProjects = async () => {
    const querySnapshot = await getDocs(collection(db, "projects"));

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  /* ---------- ADD OR UPDATE ---------- */

  const handleSubmit = async () => {
    if (!title || !media) return alert("Fill all fields");

    try {

      if (editId) {

        const ref = doc(db, "projects", editId);

        await updateDoc(ref, {
          title,
          type,
          media,
          text
        });

        setEditId(null);

      } else {

        await addDoc(collection(db, "projects"), {
          title,
          type,
          media,
          text
        });

      }

      setTitle("");
      setMedia("");
      setText("");

      fetchProjects();

    } catch (error) {
      console.error(error);
      alert("Error saving project");
    }
  };

  /* ---------- DELETE ---------- */

  const deleteItem = async (id) => {

    try {

      await deleteDoc(doc(db, "projects", id));

      fetchProjects();

    } catch (error) {
      console.error(error);
    }
  };

  /* ---------- EDIT ---------- */

  const editItem = (project) => {

    setTitle(project.title);
    setType(project.type);
    setMedia(project.media);
    setText(project.text || "");

    setEditId(project.id);
  };

  /* ---------- LOGIN PAGE ---------- */

  if (!isAuth) {
    return (
      <div className="admin-page">
        <div className="admin-card">

          <h2>Admin Login</h2>

          <input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="admin-main-btn" onClick={login}>
            Login
          </button>

        </div>
      </div>
    );
  }

  /* ---------- ADMIN PANEL ---------- */

  return (
    <div className="admin-page">
      <div className="admin-card">

        <h2>{editId ? "Edit Project" : "Admin Panel"}</h2>

        <input
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <input
          placeholder="Image / Video URL"
          value={media}
          onChange={(e) => setMedia(e.target.value)}
        />

        <input
          placeholder="Bottom text (caption)"
          className="caption"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="admin-main-btn" onClick={handleSubmit}>
          {editId ? "Update Project" : "Add Project"}
        </button>

        <button className="admin-logout-btn" onClick={logout}>
          Logout
        </button>

        {/* ---------- PROJECT LIST ---------- */}

        <div className="admin-projects">

          {projects.map((project) => (

            <div key={project.id} className="admin-project-group">

              <strong>{project.title}</strong>

              <div className="admin-item">

                <span>{project.text || project.type}</span>

                <div>

                  <button
                    className="admin-delete-btn"
                    onClick={() => editItem(project)}
                    style={{ background: "#1d4ed8", marginRight: "6px" }}
                  >
                    Edit
                  </button>

                  <button
                    className="admin-delete-btn"
                    onClick={() => deleteItem(project.id)}
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </div>
  );
}