import React, { useState } from "react";
import "./App.css";
import DataDisplay from "./components/DataDisplay";
import { QUERIES } from "./components/queries";

export default function App() {
  const [queryKey, setQueryKey] = useState(null); // Default to the first query
  const [queryFilter, setQueryFilter] = useState("");

  const handleQueryChange = (event) => {
    setQueryKey(event.target.value);
  };

  const handlesetQueryFilterChange = (event) => {
    setQueryFilter(event.target.value);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">GraphQL Data</h1>

      <div className="input-container">
        <label htmlFor="querySelect">Select a query:</label>
        <select
          id="querySelect"
          value={queryKey || ""}
          onChange={handleQueryChange}
        >
          <option value="" disabled hidden>
            Select a query...
          </option>
          {Object.keys(QUERIES).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>

      <div className="input-container">
        <label htmlFor="queryFilter">Enter Query Filter:</label>
        <input
          type="text"
          id="queryFilter"
          value={queryFilter}
          onChange={handlesetQueryFilterChange}
        />
      </div>

      {queryKey && (
        <DataDisplay queryKey={queryKey} queryFilter={queryFilter} />
      )}
    </div>
  );
}
