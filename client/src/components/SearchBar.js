import React, { useContext } from "react";
import { SearchContext } from "../context/search";

function SearchBar() {
  const { queryInput, handleInput, handleSubmit, handleReset } =
    useContext(SearchContext);

  return (
    <form className="bg-white rounded-b-lg p-3" onSubmit={handleSubmit}>
      <div className="flex items-center justify-center">
        <input
          value={queryInput}
          onChange={handleInput}
          className="border-2 border-accent rounded w-full md:w-1/2 lg:w-1/3 p-2"
          type="text"
          placeholder="Search by product name or category..."
        />
        <button
          className="ml-3 bg-secondary text-white rounded px-4 py-2 hover:bg-accent"
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </button>
        {queryInput && (
          <button
            className="ml-3 bg-secondary text-white rounded px-4 py-2 hover:bg-accent"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
    </form>
  );
}

export default SearchBar;
