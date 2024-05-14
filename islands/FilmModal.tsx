import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import { Film } from "../types.ts";

type Props = {
  film: Signal<Film | null>;
  projectsActive: Signal<boolean>;
};

const FilmModal: FunctionComponent<Props> = (
  { film, projectsActive },
) => {
  return (
    <>
      {film.value && (
        <div class="modal">
          <div class="content">
            <div class="header">
              <h1>{film.value.name}</h1>
              <button
                class="button-close"
                onClick={() => {
                  film.value = null;
                }}
              >
                X
              </button>
            </div>
            <div class="body">
              <img src={film.value.staticImageUrl} alt={film.value.name} />
              <div class="details">
                <span class="brand">Brand: {film.value.brand}</span>
                <span class="iso">
                  Format:
                  {film.value.formatOneTwenty && film.value.formatThirtyFive
                    ? "35mm & 120"
                    : film.value.formatOneTwenty
                    ? "120"
                    : film.value.formatThirtyFive
                    ? "35mm"
                    : "Unknown"}
                </span>
                <span class="description">{film.value.description}</span>
              </div>
            </div>
            <div class="footer">
              <button
                class="button-projects"
                onClick={() => {
                  if (film.value) {
                    window.location.href = "/film/" + film.value._id;
                  }
                }}
              >
                View Details
              </button>
              <button
                class="button-details"
                onClick={() => {
                  projectsActive.value = true;
                }}
              >
                Add to Project
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilmModal;
