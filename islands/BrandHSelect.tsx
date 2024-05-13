import { FunctionalComponent } from "preact";
// import { brand } from "../signals/Brand.ts";
import { Signal } from "@preact/signals";
import HSelect from "../components/HSelect.tsx";
import { getFilms } from "../lib.ts";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";


type Props = {
  brand: Signal<string>;
  brands : string[];
};

const BrandHSelect: FunctionalComponent<Props> = ({ brand, brands }) => {
  return (
    <div class="hselect-container hselect-container-wide">
      <label class="filter-label" for="brand">Brand</label>
      <HSelect options={brands} activeOption={brand} />
    </div>
  );
};

export default BrandHSelect;