import { FunctionalComponent } from "preact";
// import { brand } from "../signals/Brand.ts";
import { Signal } from "@preact/signals";
import HSelect from "../components/HSelect.tsx";
import { getFilms } from "../lib.ts";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";


type Props = {
  iso: Signal<string>;
  isos : string[];
};

const ISOHSelect: FunctionalComponent<Props> = ({ iso, isos }) => {
  return (
    <div class="hselect-container hselect-container-wide">
      <label class="filter-label" for="brand">ISO</label>
      <HSelect options={isos} activeOption={iso} />
    </div>
  );
};

export default ISOHSelect;