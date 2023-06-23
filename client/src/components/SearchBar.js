import React, { useState } from "react";

function SearchBar({ handleSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(input);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-b-lg p-3 flex items-center justify-between"
    >
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="border-2 border-accent rounded w-full p-2"
        type="text"
        placeholder="Search by name or category..."
      />
      <button
        className="ml-3 bg-secondary text-white rounded p-2"
        type="submit"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;
