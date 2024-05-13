import { FunctionalComponent } from "preact";
import { format } from "../signals/Format.ts";
import { Signal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { useEffect } from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";

type Props = {
  format: Signal<string>;
};

const FormatSelect: FunctionalComponent<Props> = ({ format }) => {
  const formats = [
    "all",
    "35",
    "120"
  ];

  return (
    <div class="select-container">
      <label class="filter-label" for="format">Format</label>
      <select
        class="select-input"
        value={format.value !== "" ? format.value : formats[0]}
        id="format"
        name="format"
        onChange={(e) => (format.value = e.currentTarget.value)}
        required
      >
        {formats.map((format, index) => (
          <option key={index} value={format}>
            {format}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormatSelect;
