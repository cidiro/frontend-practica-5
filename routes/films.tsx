import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import { Film, Project } from "../types.ts";
import { getFilms } from "../lib.ts";
import Filters from "../islands/Filters.tsx";
import FilmCatalogue from "../islands/FilmCatalogue.tsx";
import FilmModal from "../islands/FilmModal.tsx";
import ProjectsModal from "../islands/ProjectsModal.tsx";
import NewProjectModal from "../islands/NewProjectModal.tsx";
import { useSignal } from "@preact/signals";

export const handler: Handlers = {
  GET: async (
    _req: Request,
    ctx: FreshContext<unknown, { films: Film[] }>,
  ) => {
    const films = await getFilms();
    return ctx.render({ films });
  },
};

const Page = (props: PageProps<{ films: Film[] }>) => {
  const name = useSignal<string>("");
  const brand = useSignal<string>("");
  const iso = useSignal<string>("");
  const format = useSignal<string>("");
  const color = useSignal<string>("");
  const activeFilm = useSignal<Film | null>(null);
  const projectsModalActive = useSignal<boolean>(false);
  const newProjectModalActive = useSignal<boolean>(false);

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
        newProjectActive={newProjectModalActive}
      />
      <NewProjectModal
        active={newProjectModalActive}
      />
    </div>
  );
};

export default Page;
