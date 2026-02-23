import Project3DCard from "./Project3DCard";

export default function Projects() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  return (
    <section className="projects" id="projects">
      <h2>My Projects</h2>

      {projects.length === 0 && <p>No projects yet.</p>}

      {projects.map((group, index) => (
        <div key={index} className="project-group">
          <h3>{group.title}</h3>

          <div className="project-grid">
            {group.items.map((item, i) => (
              <Project3DCard key={i} item={item} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
