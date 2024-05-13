import { FunctionComponent } from "preact";
import { Film, Product } from "../types.ts";
import { Signal } from "@preact/signals";
import { useState } from "preact/hooks";
import AddFilm from "../islands/AddFilm.tsx";
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
};

const Films: FunctionComponent<Props> = (
  { films, name, brand, iso, format, color },
) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeFilm, setActiveFilm] = useState<Film>(films[0]);

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

  const handleClick = (film: Film) => {
    setModalOpen(true);
    setActiveFilm(film);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <div class="films">
        {films.map((film) => (
          <div
            class="item"
            key={film._id}
            onClick={() => handleClick(film)}
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
      {modalOpen && (
        <div class="modal">
          <div class="modal-content">
            <div class="modal-header">
              <h1>{activeFilm.name}</h1>
              <button class="button" onClick={closeModal}>X</button>
            </div>
            <div class="item">
              <img src={activeFilm.staticImageUrl} alt={activeFilm.name} />
              <div class="details">
                <span class="brand">Brand: {activeFilm.brand}</span>
                <span class="iso">
                  Format:
                  {activeFilm.formatOneTwenty && activeFilm.formatThirtyFive
                    ? "35mm & 120"
                    : activeFilm.formatOneTwenty
                    ? "120"
                    : activeFilm.formatThirtyFive
                    ? "35mm"
                    : "Unknown"}
                </span>
                <span class="description">{activeFilm.description}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Films;
