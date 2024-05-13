import { FunctionalComponent } from "preact";
// import { brand } from "../signals/Brand.ts";
import { Signal } from "@preact/signals";
import { getFilms } from "../lib.ts";
import { useState } from "preact/hooks";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "preact/hooks";


type Props = {
  brand: Signal<string>;
  brands : string[];
};

const BrandSelect: FunctionalComponent<Props> = ({ brand, brands }) => {
  return (
    <div class="select-container">
      <label class="filter-label" for="brand">Brand</label>
      <select
        class="select-input"
        value={brand.value !== "" ? brand.value : brands[0]}
        id="brand"
        name="brand"
        onChange={(e) => (brand.value = e.currentTarget.value)}
      >
        {brands.map((brand, index) => (
          <option key={index} value={brand}>
            {brand}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BrandSelect;
