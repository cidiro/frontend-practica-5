import { FunctionComponent } from "preact";
import { Film } from "../types.ts";
import { Signal } from "@preact/signals";
import { pascalize } from "../lib.ts";

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
  films = films.filter((film) => {
    return (
      (name.value === "" ||
        film.name.toLowerCase().includes(name.value.toLowerCase())) &&
      (brand.value === "" ||
        film.brand.toLowerCase() === brand.value.toLowerCase()) &&
      (iso.value === "" || iso.value === "all" ||
        film.iso.toString() === iso.value) &&
      (format.value === "" || format.value === "all" ||
        (format.value === "35" && film.formatThirtyFive) ||
        (format.value === "120" && film.formatOneTwenty)) &&
      (color.value === "" || color.value === "any" ||
        (color.value == "Color" ? film.color : !film.color))
    );
  });

  return (
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
            <span class="name">{pascalize(film.name)}</span>
            <span class="brand">{pascalize(film.brand)}</span>
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
  );
};

export default FilmCatalogue;
