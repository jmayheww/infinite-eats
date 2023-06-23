import React, { createContext, useState } from "react";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [queryInput, setQueryInput] = useState("");
  const [submitQuery, setSubmitQuery] = useState("");

  const handleInput = (e) => {
    setQueryInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitQuery(queryInput);
    setQueryInput("");
  };

  const handleReset = () => {
    setQueryInput("");
    setSubmitQuery("");
  };

  const searchContextValue = {
    queryInput,
    submitQuery,
    handleInput,
    handleSubmit,
    handleReset,
  };

  return (
    <SearchContext.Provider value={searchContextValue}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
