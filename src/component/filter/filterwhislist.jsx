import React, { useState } from "react";
import "./filterSearch.css";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import "./filterwhis.css";

function App() {
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [accordionOpen2, setAccordionOpen2] = useState(true);
  const [accordionOpen3, setAccordionOpen3] = useState(true);
  const [accordionOpen4, setAccordionOpen4] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [value, setValue] = useState("");
  const [valueRate, setValueRate] = React.useState(5);
  const [valueRate2, setValueRate2] = React.useState(4);
  const [valueRate3, setValueRate3] = React.useState(3);
  const [valueRate4, setValueRate4] = React.useState(2);
  const [valueRate5, setValueRate5] = React.useState(1);

  const toggleAccordion = () => {
    setAccordionOpen(!accordionOpen);
  };
  const toggleAccordion2 = () => {
    setAccordionOpen2(!accordionOpen2);
  };
  const toggleAccordion3 = () => {
    setAccordionOpen3(!accordionOpen3);
  };
  const toggleAccordion4 = () => {
    setAccordionOpen4(!accordionOpen4);
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

  const handleChangeNumber2 = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue(result);
  };

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="container-filter">
      <div className="accordion-filter-lokasi">
        <button
          className={`accordion-toggle-filter ${accordionOpen ? "open" : ""}`}
          onClick={toggleAccordion}
        >
          <span className="accordion-text-filter">Kategori</span>
          <span className={`arrowFilter ${accordionOpen ? "up" : "down"}`} />
        </button>
        <div
          className={`accordion-content-filter ${accordionOpen ? "open" : ""}`}
        >
          <div className="page-filter">
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Kerajinan Tangan</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Produk Pertanian</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Makanan/minuman</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Pakaian</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Elektronik</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Furniture</label>
            </div>
            <Link to={"/modal-lokasi"}>
              <p>Lihat Lebih banyak</p>
            </Link>
          </div>
        </div>
      </div>
      <div className="accordion-filter-kondisi">
        <button
          className={`accordion-toggle-filter ${accordionOpen4 ? "open" : ""}`}
          onClick={toggleAccordion4}
        >
          <span className="accordion-text-filter">Stok</span>
          <span className={`arrowFilter ${accordionOpen4 ? "up" : "down"}`} />
        </button>
        <div
          className={`accordion-content-filter ${accordionOpen4 ? "open" : ""}`}
        >
          <div className="page-filter">
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Tersedia</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Tidak Tersedia</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
