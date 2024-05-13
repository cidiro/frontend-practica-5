import { FunctionalComponent } from "preact";
// import { iso } from "../signals/ISO.ts";
import { Signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";

type Props = {
  iso: Signal<string>;
};

const ISOSelect: FunctionalComponent<Props> = ({ iso }) => {
  const isos = [
    "all",
    "100",
    "250",
    "300",
    "400",
  ];

  return (
    <div class="select-container">
      <label class="filter-label" for="iso">ISO</label>
      <select
        class="select-input"
        value={iso.value !== "" ? iso.value : isos[0]}
        id="iso"
        name="iso"
        onChange={(e) => (iso.value = e.currentTarget.value)}
        required
      >
        {isos.map((iso, index) => (
          <option key={index} value={iso}>
            {iso}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ISOSelect;
