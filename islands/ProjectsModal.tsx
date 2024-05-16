import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import { useEffect, useState } from "preact/hooks";
import { Film, Project } from "../types.ts";

type Props = {
  active: Signal<boolean>;
  film: Signal<Film | null>;
  newProjectActive: Signal<boolean>;
};

const ProjectsModal: FunctionComponent<Props> = (
  { active, film, newProjectActive },
) => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const cookies = document.cookie.split("; ");
    const projects = cookies.find((cookie) => cookie.startsWith("projects=")) ||
      "";
    if (!projects) {
      document.cookie = `projects=[]; path=/`;
    }
    setProjects(projects ? JSON.parse(projects.split("=")[1]) : []);
  }, []);

  const addFilmToProject = (project: string) => {
    if (!film.value) {
      return;
    }

    const updatedProjects = projects.map((p: Project) => {
      if (p.name === project && film.value !== null) {
        p.films.push(film.value);
      }
      return p;
    });

    document.cookie = `projects=${JSON.stringify(updatedProjects)}; path=/`;
    active.value = false;
  };

  return (
    <>
      {active.value && (
        <div class="modal">
          <div class="content">
            <div class="header">
              <h1>Projects</h1>
              <button
                class="button-close"
                onClick={() => {
                  active.value = false;
                }}
              >
                ✖
              </button>
            </div>
            <div class="body">
              <div class="projects">
                {projects.length
                  ? projects.map((project, index) => (
                    <div class="button-container">
                      <button
                        key={index}
                        onClick={() => {
                          addFilmToProject(project.name);
                        }}
                      >
                        <span class="name">
                          {project.name.length > 25
                            ? `${project.name.slice(0, 22)}...`
                            : project.name}
                        </span>
                        <span class="description">
                          {project.description.length > 55
                            ? `${project.description.slice(0, 52)}...`
                            : project.description}
                        </span>
                      </button>
                    </div>
                  ))
                  : <p>There are no projects yet.</p>}
              </div>
            </div>
            <div class="footer">
              <button
                onClick={() => {
                  newProjectActive.value = true;
                }}
              >
                New Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectsModal;
