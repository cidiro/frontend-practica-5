import { FunctionComponent } from "preact";
import { Product, Film } from "../types.ts";
import { Signal } from "@preact/signals";


type Props = {
  options: string[];
  activeOption: Signal<string>;
};


const HSelect : FunctionComponent<Props> = ({ options, activeOption }) => {
  const handleClick = (option: string) => {
    if (activeOption.value === option) {
      activeOption.value = "";
    } else {
      activeOption.value = option;
    }
  };

  return (
    <div class="hselect">
      {options.map((option) => (
        <button
          class={`hselect-button ${activeOption.value === option ? "active" : ""}`}
          onClick={() => handleClick(option)}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default HSelect;