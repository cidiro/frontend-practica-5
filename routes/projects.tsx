import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Project } from "../types.ts";
import { getProjects } from "../lib.ts";

export const handler: Handlers = {
  GET: async (
    req: Request,
    ctx: FreshContext<unknown, { projects: Project[] }>,
  ) => {
    const projects = getProjects(req);
    return ctx.render({ projects });
  },
};

const Page = (props: PageProps<{ projects: Project[] }>) => {
  const projects = props.data.projects;

  return (
    <div class="projects">
      <div class="content">
        <div class="header">
          <h1>Projects</h1>
        </div>
        <div class="body">
          <div class="projects">
            {projects.length
              ? projects.map((project, index) => (
                <div class="button-container">
                  <button
                    key={index}
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
          <button>
            New Project
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
