import React, { useEffect } from "react";
import "../style/search.css";
import Navbar from "../component/navbar/navbar";
import ResultSearch from "../component/resultSearch/ResultSearch";
import Footer from "../component/footer/footer";

function SearchPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Place your search page content and styling here
  return (
    <>
      <Navbar />
      <div className="search-page">
        <div className="container-resultSearch">
          <div className="result-search">
            <ResultSearch />
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default SearchPage;
