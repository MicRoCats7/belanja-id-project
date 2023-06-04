import React from "react";
import "./filterSearch.css";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";
import { useState } from "react";

function FilterToko() {
  const [accordionOpen, setAccordionOpen] = useState(true);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };

  const BpIcon = styled("span")(({ theme }) => ({
    borderRadius: 3,
    width: 23,
    height: 23,
    boxShadow:
      theme.palette.mode === "dark"
        ? "0 0 0 1px rgb(16 22 26 / 40%)"
        : "inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)",
    ".Mui-focusVisible &": {
      outline: "2px auto #000",
      outlineOffset: 2,
    },
    "input:hover ~ &": {
      outline: "2px auto #EF233C",
    },
    "input:disabled ~ &": {
      boxShadow: "none",
      background:
        theme.palette.mode === "dark"
          ? "rgba(57,75,89,.5)"
          : "rgba(206,217,224,.5)",
    },
  }));

  const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: "#EF233C",
    backgroundImage:
      "linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))",
    "&:before": {
      display: "block",
      width: 23,
      height: 23,
      backgroundImage:
        "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3E%3Cpath" +
        " fill-rule='evenodd' clip-rule='evenodd' d='M12 5c-.28 0-.53.11-.71.29L7 9.59l-2.29-2.3a1.003 " +
        "1.003 0 00-1.42 1.42l3 3c.18.18.43.29.71.29s.53-.11.71-.29l5-5A1.003 1.003 0 0012 5z' fill='%23fff'/%3E%3C/svg%3E\")",
      content: '""',
    },
    "input:hover ~ &": {
      backgroundColor: "#EF233C",
    },
  });

  function BpCheckbox(props) {
    return (
      <Checkbox
        sx={{
          "&:hover": { bgcolor: "transparent" },
        }}
        disableRipple
        color="default"
        checkedIcon={<BpCheckedIcon />}
        icon={<BpIcon />}
        inputProps={{ "aria-label": "Checkbox demo" }}
        {...props}
      />
    );
  }

  return (
    <div className="container-filter">
      <h2>Filter</h2>
      <div className="accordion-filter-lokasi">
        <button
          className={`accordion-toggle-filter ${accordionOpen ? "open" : ""}`}
          onClick={toggleAccordion}
        >
          <span className="accordion-text-filter">Lokasi</span>
          <span className={`arrowFilter ${accordionOpen ? "up" : "down"}`} />
        </button>
        <div
          className={`accordion-content-filter ${accordionOpen ? "open" : ""}`}
        >
          <div className="page-filter">
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Sumbawa</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Sumbawa</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Sumbawa</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Sumbawa</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Sumbawa</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Sumbawa</label>
            </div>
            <Link to={"/modal-lokasi"}>
              <p>Lihat Lebih banyak</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterToko;
