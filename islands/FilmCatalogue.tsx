import { FunctionComponent } from "preact";
import { Film, Project } from "../types.ts";
import { Signal } from "@preact/signals";
import { useState } from "preact/hooks";
import AddFilm from "./AddFilm.tsx";
// import { brand } from "../signals/Brand.ts";
// import { iso } from "../signals/ISO.ts";
// import { format } from "../signals/Format.ts";

type Props = {
  films: Film[];
  name: Signal<string>;
  brand: Signal<string>;
  iso: Signal<string>;
  format: Signal<string>;
  color: Signal<string>;
  activeFilm: Signal<Film | null>;
};

const FilmCatalogue: FunctionComponent<Props> = (
  { films, name, brand, iso, format, color, activeFilm },
) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [pModalOpen, setPModalOpen] = useState<boolean>(false);
  const [cModalOpen, setCModalOpen] = useState<boolean>(false);
  // const [activeFilm.value, setActiveFilm] = useState<Film>(films[0]);
  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  if (name.value !== "") {
    films = films.filter((film) =>
      film.name.toLowerCase().includes(name.value.toLowerCase())
    );
  }

  if (brand.value !== "") {
    films = films.filter((film) => film.brand === brand.value);
  }

  if (iso.value !== "" && iso.value !== "all") {
    films = films.filter((film) => film.iso.toString() === iso.value);
  }

  if (format.value !== "" && format.value !== "all") {
    films = films.filter((film) => {
      if (format.value === "35") return film.formatThirtyFive;
      if (format.value === "120") return film.formatOneTwenty;
      return false;
    });
  }

  if (color.value !== "" && color.value !== "any") {
    films = films.filter((film) =>
      color.value == "color" ? film.color : !film.color
    );
  }

  const closeModal = () => {
    setModalOpen(false);
    setPModalOpen(false);
    setCModalOpen(false);
  };

  const openPModal = () => {
    const cookies = document.cookie.split("; ");
    const projectsCookie = cookies.find((cookie) =>
      cookie.startsWith("projects=")
    );
    // .... que desastre

    setPModalOpen(true);
  };

  const createProject = () => {
    const cookies = document.cookie.split("; ");
    const projectsCookie = cookies.find((cookie) =>
      cookie.startsWith("projects=")
    );
    if (!projectsCookie) {
      document.cookie = `projects=${
        JSON.stringify([
          { projectName, projectDesc, films: [] },
        ])
      }; path=/`;
    } else {
      const projects: Project[] = JSON.parse(projectsCookie.split("=")[1]);
      projects.push({ name: projectName, description: projectDesc, films: [] });
      document.cookie = `cart=${JSON.stringify(projects)}; path=/`; // we must set the path to / so the cookie is available in all pages
    }

    setCModalOpen(false);
  };

  return (
    <>
      <div class="catalogue">
        {films.map((film) => (
          <div
            class="item"
            key={film._id}
            onClick={() => {
              activeFilm.value = film;
            }}
          >
            <img src={film.staticImageUrl} alt={film.name} />
            <div class="details">
              <span class="name">{film.name}</span>
              <span class="brand">{film.brand}</span>
              <span class="iso">
                {film.formatOneTwenty && film.formatThirtyFive
                  ? "35mm & 120"
                  : film.formatOneTwenty
                  ? "120"
                  : film.formatThirtyFive
                  ? "35mm"
                  : "Unknown"}
              </span>
            </div>
          </div>
        ))}
      </div>

      {
        /* {modalOpen && (
        <div class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h1>{activeFilm.value.name}</h1>
              <button class="button-close" onClick={closeModal}>X</button>
            </div>
            <div class="item">
              <img src={activeFilm.value.staticImageUrl} alt={activeFilm.value.name} />
              <div class="details">
                <span class="brand">Brand: {activeFilm.value.brand}</span>
                <span class="iso">
                  Format:
                  {activeFilm.value.formatOneTwenty && activeFilm.value.formatThirtyFive
                    ? "35mm & 120"
                    : activeFilm.value.formatOneTwenty
                    ? "120"
                    : activeFilm.value.formatThirtyFive
                    ? "35mm"
                    : "Unknown"}
                </span>
                <span class="description">{activeFilm.value.description}</span>
              </div>
            </div>
            <button class="button" onClick={openPModal}>
              Add to Project
            </button>
          </div>
        </div>
      )} */
      }

      {pModalOpen && (
        <div class="pmodal">
          <div class="modal-content">
            <div class="modal-header">
              <h1>Projects</h1>
              <button class="button-close" onClick={closeModal}>X</button>
            </div>
            <div class="item">
              <div class="details">
                <span class="brand">List of Projects</span>
              </div>
            </div>
            <button class="button" onClick={() => setCModalOpen(true)}>
              Create Project
            </button>
          </div>
        </div>
      )}

      {cModalOpen && (
        <div class="pmodal">
          <div class="modal-content">
            <div class="modal-header">
              <h1>New Project</h1>
              <button class="button-close" onClick={closeModal}>X</button>
            </div>
            <div class="item">
              <div class="details">
                <input
                  type="text"
                  placeholder="Project Name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.currentTarget.value)}
                />
                <input
                  type="text"
                  placeholder="Description"
                  value={projectDesc}
                  onChange={(e) => setProjectDesc(e.currentTarget.value)}
                />
              </div>
            </div>
            <button class="button" onClick={createProject}>
              Save Project
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FilmCatalogue;
