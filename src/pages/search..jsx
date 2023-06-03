import React from "react";
import "../style/search.css";
import Navbar from "../component/navbar/navbar";
import ResultSearch from "../component/resultSearch/ResultSearch";

function SearchPage() {
  // Place your search page content and styling here
  return (
    <div>
      <Navbar />
      <div className="container-resultSearch">
        <div className="result-search">
          <ResultSearch />
        </div>
      </div>
      {/* <h1>Search Results</h1>
      Add more components and styles as needed */}
    </div>
  );
}

export default SearchPage;
