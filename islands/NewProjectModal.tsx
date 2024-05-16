import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import { useState } from "preact/hooks";
import { Project } from "../types.ts";

type Props = {
  active: Signal<boolean>;
  projects: Signal<Project[]>;
};

const NewProjectModal: FunctionComponent<Props> = (
  { active, projects },
) => {
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const saveProject = () => {
    projects.value = [...projects.value, {
      name: projectName,
      description: projectDesc,
      films: [],
    }];
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
