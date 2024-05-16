import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Film, Project } from "../types.ts";
import { getFilms, getProjects, addProject } from "../lib.ts";
import Filters from "../islands/Filters.tsx";
import FilmCatalogue from "../islands/FilmCatalogue.tsx";
import FilmModal from "../islands/FilmModal.tsx";
import ProjectsModal from "../islands/ProjectsModal.tsx";
import NewProjectModal from "../islands/NewProjectModal.tsx";
import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";

export const handler: Handlers = {
  GET: async (
    req: Request,
    ctx: FreshContext<unknown, { films: Film[], projects: Project[] }>,
  ) => {
    const films = await getFilms();
    const projects = getProjects(req);
    return ctx.render({ films, projects });
  },

  POST: async (
    req: Request, _ctx: FreshContext,
  ) => {
    const projects = await req.json();
    addProject(req, projects);
    return new Response();
  },
};

const Page = (props: PageProps<{ films: Film[], projects: Project[] }>) => {
  const name = useSignal<string>("");
  const brand = useSignal<string>("");
  const iso = useSignal<string>("");
  const format = useSignal<string>("");
  const color = useSignal<string>("");
  const projects = useSignal<Project[]>(props.data.projects);
  const activeFilm = useSignal<Film | null>(null);
  const projectsModalActive = useSignal<boolean>(false);
  const newProjectModalActive = useSignal<boolean>(false);

  useEffect(() => {
    fetch('/films', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(projects.value),
    });
  }, [projects.value]);

  return (
    <div class="home">
      <h1 class="title">Films</h1>
      <Filters
        films={props.data.films}
        name={name}
        brand={brand}
        iso={iso}
        format={format}
        color={color}
      />
      <FilmCatalogue
        films={props.data.films}
        name={name}
        brand={brand}
        iso={iso}
        format={format}
        color={color}
        activeFilm={activeFilm}
      />
      <FilmModal
        film={activeFilm}
        projectsActive={projectsModalActive}
      />
      <ProjectsModal
        active={projectsModalActive}
        film={activeFilm}
        projects={projects}
        newProjectActive={newProjectModalActive}
      />
      <NewProjectModal
        active={newProjectModalActive}
        projects={projects}
      />
    </div>
  );
};

export default Page;
