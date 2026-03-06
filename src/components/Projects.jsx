import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";

export default function Projects() {

  const [projects, setProjects] = useState([]);

  useEffect(() => {

    const fetchProjects = async () => {

      const querySnapshot = await getDocs(collection(db, "projects"));

      const data = querySnapshot.docs.map(doc => ({
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

            {project.type === "image" && (
              <img src={project.media} alt="project"/>
            )}

            {project.type === "video" && (
              <video controls>
                <source src={project.media} type="video/mp4" />
              </video>
            )}

            <p>{project.text}</p>

          </div>

        ))}

      </div>

    </section>
  );
}