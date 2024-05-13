import { FunctionalComponent } from "preact";
// import { color } from "../signals/Color.ts";
import { Signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";

type Props = {
  color: Signal<string>;
};

const ColorSelect: FunctionalComponent<Props> = ({ color }) => {
  const colors = [
    "any",
    "color",
    "B&W",
  ];

  return (
    <div class="select-container">
      <label class="filter-label" for="color">Color</label>
      <select
        class="select-input"
        value={color.value !== "" ? color.value : colors[0]}
        id="color"
        name="color"
        onChange={(e) => (color.value = e.currentTarget.value)}
        required
      >
        {colors.map((color, index) => (
          <option key={index} value={color}>
            {color}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ColorSelect;
