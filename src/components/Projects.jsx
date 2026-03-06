import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    const fetchProjects = async () => {

      const querySnapshot = await getDocs(collection(db, "projects"));

      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setProjects(data);
    };

    fetchProjects();

  }, []);

  return (
    <section className="projects">

      <h2>My Projects</h2>

      <div className="projects-grid">

        {projects.map((project) => (

          <div key={project.id} className="project-card">

            <h3>{project.title}</h3>

            {/* Image */}
            {project.type === "image" && (
              <img src={project.media} alt="project" />
            )}

            {/* Video */}
            {project.type === "video" && (
              <iframe
                src={project.media}
                title="Project Video"
                frameBorder="0"
                allowFullScreen
                className="project-video"
              />
            )}

            <p>{project.text}</p>

          </div>

        ))}

      </div>

    </section>
  );
}