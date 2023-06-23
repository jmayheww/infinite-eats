import React, { useContext } from "react";
import { SearchContext } from "../context/search";

function SearchBar() {
  const { queryInput, handleInput, handleSubmit, handleReset } =
    useContext(SearchContext);

  return (
    <form className="bg-white rounded-b-lg p-3" onSubmit={handleSubmit}>
      <div className="flex items-center">
        <input
          value={queryInput}
          onChange={handleInput}
          className="border-2 border-accent rounded w-full p-2"
          type="text"
          placeholder="Search by product name or category..."
        />
        <button
          className="ml-3 bg-secondary text-white rounded p-2"
          type="submit"
          onClick={handleSubmit}
        >
          Search
        </button>
      </div>
      {queryInput && (
        <div className="flex justify-center mt-2">
          <button
            className="bg-secondary text-white rounded p-2 text-sm"
            type="button"
            onClick={handleReset}
          >
            Reset
          </button>
        </div>
      )}
    </form>
  );
}

export default SearchBar;
