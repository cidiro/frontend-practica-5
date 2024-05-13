import { useEffect, useState } from "preact/hooks";

import { FunctionComponent } from "preact";
import { Signal } from "@preact/signals";

type Props = {
  name: Signal<string>;
};

const SearchBar: FunctionComponent<Props> = ({ name }) => {

  return (
    <div className="search-bar-container">
      <label class="filter-label" for="brand">Film Name</label>
      <input
        type="text"
        id = "name"
        name="name"
        placeholder="Search by film name..."
        value={name.value}
        onInput={(e) => name.value = e.currentTarget.value}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;