import React from "react";
import { useLocation } from "react-router-dom";
import "../style/search.css";
import Navbar from "../component/navbar/navbar";
import FilterSearch from "../component/filter/filterSearch";
import ResultSearch from "../component/resultSearch/ResultSearch";

function SearchPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("query");

  // Place your search page content and styling here
  return (
    <div>
      <Navbar />
      <div className="container-resultSearch">
        <div className="result-search">
          <FilterSearch />
          <ResultSearch />
        </div>
      </div>
      {/* <h1>Search Results</h1>
      <p>Showing results for: {query}</p>
      Add more components and styles as needed */}
    </div>
  );
}

export default SearchPage;
