import { FunctionalComponent } from "preact";
// import { brand } from "../signals/Brand.ts";
import { Signal } from "@preact/signals";
import HSelect from "../components/HSelect.tsx";
import { getFilms } from "../lib.ts";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";


type Props = {
  color: Signal<string>;
  colors : string[];
};

const ColorHSelect: FunctionalComponent<Props> = ({ color, colors }) => {
  return (
    <div class="hselect-container">
      <label class="filter-label" for="brand">Color</label>
      <HSelect options={colors} activeOption={color} />
    </div>
  );
};

export default ColorHSelect;