import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { SearchContext } from "../context/search";

function SearchBar() {
  const { queryInput, handleInput, handleSubmit, handleReset } =
    useContext(SearchContext);
  const navigate = useNavigate();

  const handleBrowseVendors = () => {
    navigate("/vendors");
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <div className="bg-white rounded-b-lg p-3 flex flex-col md:flex-row md:items-center md:justify-center">
      <button
        className="bg-secondary text-white rounded px-4 py-2 hover:bg-accent mr-2"
        type="button"
        onClick={handleBrowseVendors}
      >
        &larr; Back to Vendors
      </button>
      <form
        onSubmit={handleFormSubmit}
        className="flex items-center flex-grow mt-2 md:mt-0"
      >
        <input
          value={queryInput}
          onChange={handleInput}
          className="border-2 border-accent rounded flex-grow p-2 mr-2"
          type="text"
          placeholder="Search by product name or category..."
        />
        <div className="space-x-2">
          <button
            className="bg-secondary text-white rounded px-4 py-2 hover:bg-accent"
            type="submit"
          >
            Search
          </button>
          {queryInput && (
            <button
              className="bg-secondary text-white rounded px-4 py-2 hover:bg-accent"
              type="button"
              onClick={handleReset}
            >
              Reset
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
