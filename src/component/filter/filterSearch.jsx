import React, { useState } from "react";
import "./filterSearch.css";

function App() {
  const [accordionOpen, setAccordionOpen] = useState(false);
  const [accordionOpen2, setAccordionOpen2] = useState(false);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };
  const toggleAccordion2 = () => {
    setAccordionOpen2(!accordionOpen2);
  };

  return (
    <div>
      Filter
      <div className="accordion-filter">
        <button
          className={`accordion-toggle ${accordionOpen ? "open" : ""}`}
          onClick={toggleAccordion}
        >
          <span className="accordion-text">Lokasi</span>
          <span className={`arrow ${accordionOpen ? "up" : "down"}`} />
        </button>
        <div className={`accordion-content ${accordionOpen ? "open" : ""}`}>
          <div className="page-ulasan">
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
          </div>
        </div>
      </div>
      <div className="accordion-filter">
        <button
          className={`accordion-toggle ${accordionOpen2 ? "open" : ""}`}
          onClick={toggleAccordion2}
        >
          <span className="accordion-text">Rating</span>
          <span className={`arrow ${accordionOpen2 ? "up" : "down"}`} />
        </button>
        <div className={`accordion-content ${accordionOpen2 ? "open" : ""}`}>
          <div className="page-ulasan">
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
