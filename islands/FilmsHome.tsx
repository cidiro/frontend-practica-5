import { FunctionComponent } from "preact";
import { Film } from "../types.ts";
import SearchBar from "../islands/SearchBar.tsx";
import BrandSelect from "./BrandSelect.tsx";
import BrandHSelect from "./BrandHSelect.tsx";
import ISOHSelect from "./ISOHSelect.tsx";
import FormatHSelect from "./FormatHSelect.tsx";
import ColorHSelect from "./ColorHSelect.tsx";
import ISOSelect from "./ISOSelect.tsx";
import FormatSelect from "./FormatSelect.tsx";
import ColorSelect from "./ColorSelect.tsx";
import Films from "../components/Films.tsx";
import { useSignal } from "@preact/signals";

type Props = {
  films: Film[];
};

const FilmsHome: FunctionComponent<Props> = ({ films }) => {
  const name = useSignal<string>("");
  const brand = useSignal<string>("");
  const iso = useSignal<string>("");
  const format = useSignal<string>("");
  const color = useSignal<string>("");

  const brands = [...new Set(films.map((film) => film.brand))].sort();
  const isos = [...new Set(films.map((film) => film.iso.toString()))].sort((
    a,
    b,
  ) => Number(a) - Number(b));
  const formats = ["35", "120"];
  const colors = ["color", "B&W"];

  return (
    <div class="films-page">
      <h1 class="title">Films</h1>
      <div class="filters-container">
        <SearchBar name={name} />
        <BrandHSelect brand={brand} brands={brands} />
        <ISOHSelect iso={iso} isos={isos} />
        <div className="hflex-hselect-container">
          <FormatHSelect format={format} formats={formats} />
          <ColorHSelect color={color} colors={colors} />
        </div>
      </div>
      <Films
        films={films}
        name={name}
        brand={brand}
        iso={iso}
        format={format}
        color={color}
      />
    </div>
  );
};

export default FilmsHome;
