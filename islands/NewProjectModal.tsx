import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import { useState } from "preact/hooks";

type Props = {
  active: Signal<boolean>;
};

const NewProjectModal: FunctionComponent<Props> = (
  { active },
) => {
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const saveProject = () => {
    const cookies = document.cookie.split("; ");
    const projectsCookie =
      cookies.find((cookie) => cookie.startsWith("projects=")) || "";

    const projects = projectsCookie
      ? JSON.parse(projectsCookie.split("=")[1])
      : [];

    projects.push({ name: projectName, description: projectDesc, films: [] });
    document.cookie = `projects=${JSON.stringify(projects)}; path=/`;

    setProjectName("");
    setProjectDesc("");
  };

  return (
    <>
      {active.value && (
        <div class="modal">
          <div class="content">
            <div class="header">
              <h1>New Project</h1>
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
              <div class="form">
                <div class="input">
                  <label for="projectName">Project Name</label>
                  <input
                    type="text"
                    id="projectName"
                    value={projectName}
                    onInput={(e) => setProjectName(e.currentTarget.value)}
                  />
                </div>
                <div class="input">
                  <label for="projectDesc">Description</label>
                  <textarea
                    id="projectDesc"
                    value={projectDesc}
                    onInput={(e) => setProjectDesc(e.currentTarget.value)}
                  />
                </div>
              </div>
            </div>
            <div class="footer">
              <button
                onClick={() => {
                  if (projectName && projectDesc) {
                    saveProject();
                    active.value = false;
                  }
                }}
              >
                Save Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NewProjectModal;
