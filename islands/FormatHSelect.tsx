import { FunctionalComponent } from "preact";
// import { brand } from "../signals/Brand.ts";
import { Signal } from "@preact/signals";
import HSelect from "../components/HSelect.tsx";
import { getFilms } from "../lib.ts";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";


type Props = {
  format: Signal<string>;
  formats : string[];
};

const FormatHSelect: FunctionalComponent<Props> = ({ format, formats }) => {
  return (
    <div class="hselect-container margin-right">
      <label class="filter-label" for="brand">Format</label>
      <HSelect options={formats} activeOption={format} />
    </div>
  );
};

export default FormatHSelect;