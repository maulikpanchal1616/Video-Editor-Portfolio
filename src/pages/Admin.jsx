import { useState } from "react";

export default function Admin() {
  /* ---------- AUTH ---------- */
  const ADMIN_USER = "Het@Kano";
  const ADMIN_PASS = "Kano@1909";

  const [isAuth, setIsAuth] = useState(
    localStorage.getItem("adminAuth") === "true"
  );

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
  const [editInfo, setEditInfo] = useState(null);

  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  const saveProjects = (data) => {
    localStorage.setItem("projects", JSON.stringify(data));
  };

  const handleSubmit = () => {
    if (!title || !media) return alert("Fill all fields");

    let updated = [...projects];

    if (editInfo) {
      const { gIndex, iIndex } = editInfo;
      updated[gIndex].items[iIndex] = { type, media, text };
      setEditInfo(null);
    } else {
      let group = updated.find((p) => p.title === title);
      if (!group) {
        group = { title, items: [] };
        updated.push(group);
      }
      group.items.push({ type, media, text });
    }

    saveProjects(updated);
    setMedia("");
    setText("");
  };

  const deleteItem = (gIndex, iIndex) => {
    let updated = [...projects];
    updated[gIndex].items.splice(iIndex, 1);
    if (updated[gIndex].items.length === 0) updated.splice(gIndex, 1);
    saveProjects(updated);
  };

  const editItem = (gIndex, iIndex) => {
    const item = projects[gIndex].items[iIndex];
    setTitle(projects[gIndex].title);
    setType(item.type);
    setMedia(item.media);
    setText(item.text || "");
    setEditInfo({ gIndex, iIndex });
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
        <h2>{editInfo ? "Edit Project" : "Admin Panel"}</h2>

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
          placeholder="Bottom text (caption) " className="caption"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="admin-main-btn" onClick={handleSubmit}>
          {editInfo ? "Update Project" : "Add Project"}
        </button>

        <button className="admin-logout-btn" onClick={logout}>
          Logout
        </button>

        <div className="admin-projects">
          {projects.map((group, gIndex) => (
            <div key={gIndex} className="admin-project-group">
              <strong>{group.title}</strong>

              {group.items.map((item, iIndex) => (
                <div key={iIndex} className="admin-item">
                  <span>{item.text || item.type}</span>
                  <div>
                    <button
                      className="admin-delete-btn"
                      onClick={() => editItem(gIndex, iIndex)}
                      style={{ background: "#1d4ed8", marginRight: "6px" }}
                    >
                      Edit
                    </button>
                    <button
                      className="admin-delete-btn"
                      onClick={() => deleteItem(gIndex, iIndex)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
