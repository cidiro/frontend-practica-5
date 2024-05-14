import { FunctionComponent } from "preact";
import { Film } from "../types.ts";
import HSelect from "../components/HSelect.tsx";
import SearchBar from "../islands/SearchBar.tsx";
import BrandSelect from "./BrandSelect.tsx";
import BrandHSelect from "./BrandHSelect.tsx";
import ISOHSelect from "./ISOHSelect.tsx";
import FormatHSelect from "./FormatHSelect.tsx";
import ColorHSelect from "./ColorHSelect.tsx";
import ISOSelect from "./ISOSelect.tsx";
import FormatSelect from "./FormatSelect.tsx";
import ColorSelect from "./ColorSelect.tsx";
import FilmCatalogue from "./FilmCatalogue.tsx";
import Filters from "./Filters.tsx";
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


  return (
    <div class="home">
      <h1>Films</h1>
      <Filters
        films={films}
        name={name}
        brand={brand}
        iso={iso}
        format={format}
        color={color}
      />
      <FilmCatalogue
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
