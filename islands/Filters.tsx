import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";
import HSelect from "../components/HSelect.tsx";
import { Film } from "../types.ts";

type Props = {
  films: Film[];
  name: Signal<string>;
  brand: Signal<string>;
  iso: Signal<string>;
  format: Signal<string>;
  color: Signal<string>;
};

const Filters: FunctionComponent<Props> = (
  { films, name, brand, iso, format, color },
) => {
  const brands = [...new Set(films.map((film) => film.brand))].sort();
  const isos = [...new Set(films.map((film) => film.iso.toString()))].sort((
    a,
    b,
  ) => Number(a) - Number(b));
  const formats = ["35", "120"];
  const colors = ["color", "B&W"];

  return (
    <div class="filters">
      <div class="filter">
        <label>Film Name</label>
        <input
          type="text"
          placeholder="Search by film name..."
          value={name.value}
          onInput={(e) => name.value = e.currentTarget.value}
        />
      </div>
      <div class="filter">
        <label>Brand</label>
        <HSelect options={brands} activeOption={brand} />
      </div>
      <div class="filter">
        <label>ISO</label>
        <HSelect options={isos} activeOption={iso} />
      </div>
      <div class="horizontal">
        <div class="filter">
          <label>Format</label>
          <HSelect options={formats} activeOption={format} />
        </div>
        <div class="filter">
          <label>Color</label>
          <HSelect options={colors} activeOption={color} />
        </div>
      </div>
    </div>
  );
};

export default Filters;
