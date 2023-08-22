import React, { useState } from "react";
import "./filterSearch.css";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import Rating from "@mui/material/Rating";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import apiurl from "../../utils/apiurl";
import axios from "axios";

function App({ onProvincesSelect, onPriceFilter }) {
  const [accordionOpen, setAccordionOpen] = useState(true);
  const [accordionOpen2, setAccordionOpen2] = useState(true);
  const [accordionOpen3, setAccordionOpen3] = useState(true);
  const [accordionOpen4, setAccordionOpen4] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);
  const [value, setValue] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [valueRate, setValueRate] = React.useState(5);
  const [valueRate2, setValueRate2] = React.useState(4);
  const [valueRate3, setValueRate3] = React.useState(3);
  const [valueRate4, setValueRate4] = React.useState(2);
  const [valueRate5, setValueRate5] = React.useState(1);
  const [showAllProvinces, setShowAllProvinces] = useState(false);
  const [visibleDataCount, setVisibleDataCount] = useState(15);
  const dataPerPage = 15;
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleMinPriceChange = (event) => {
    setMinPrice(event.target.value);
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(event.target.value);
  };

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
  const handleShowMore = () => {
    setVisibleDataCount(visibleDataCount + dataPerPage);
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

  const fetchProvinces = async () => {
    try {
      const response = await axios.get(apiurl() + "provinces");
      const responseData = response.data;

      if (responseData.meta && responseData.meta.code === 200) {
        const provincesData = responseData.data;
        const provincesWithNames = provincesData.map((province) => ({
          ...province,
          province_name: province.province,
        }));
        setProvinces(provincesWithNames);
        setSelectedProvinces(provincesWithNames);
      } else {
        console.log("Failed to fetch provinces:", responseData.meta.message);
      }
    } catch (error) {
      console.log("Failed to fetch provinces:", error);
    }
  };

  const handleChangeNumber2 = (event) => {
    const result = event.target.value.replace(/\D/g, "");

    setValue(result);
  };

  const handleClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // const handleProvinceChange = (provinceId) => {
  //   setSelectedProvinces((prevSelectedProvinces) => {
  //     if (prevSelectedProvinces.includes(provinceId)) {
  //       return prevSelectedProvinces.filter((id) => id !== provinceId);
  //     } else {
  //       return [...prevSelectedProvinces, provinceId];
  //     }
  //   });
  // };

  const handleFilter = () => {
    onPriceFilter(minPrice, maxPrice);
  };

  const handleProvinceChange = (provinceId) => {
    setSelectedProvinces((prevSelectedProvinces) => {
      const updatedSelectedProvinces = prevSelectedProvinces.includes(
        provinceId
      )
        ? prevSelectedProvinces.filter((id) => id !== provinceId)
        : [...prevSelectedProvinces, provinceId];

      onProvincesSelect(updatedSelectedProvinces);
      return updatedSelectedProvinces;
    });
  };
  useEffect(() => {
    // fetchProvinces();
  }, []);

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
            {provinces.slice(0, visibleDataCount).map((province) => (
              <div className="checkbox-filter" key={province.province_id}>
                <BpCheckbox
                  checked={selectedProvinces.includes(province.province_id)}
                  onChange={() => handleProvinceChange(province.province_id)}
                />
                <label htmlFor="">{province.province_name}</label>
              </div>
            ))}
          </div>
          {visibleDataCount < provinces.length && (
            <p className="merah-p" onClick={handleShowMore}>
              Lihat Lebih Banyak
            </p>
          )}
        </div>
      </div>
      <div className="accordion-filter">
        <button
          className={`accordion-toggle-filter ${accordionOpen2 ? "open" : ""}`}
          onClick={toggleAccordion2}
        >
          <span className="accordion-text-filter">Harga</span>
          <span className={`arrowFilter ${accordionOpen2 ? "up" : "down"}`} />
        </button>
        <div
          className={`accordion-content-filter ${accordionOpen2 ? "open" : ""}`}
        >
          <div className="page-filter-harga">
            <div className="harga-satuan-filter">
              <div className="box-harga-satuan-filter">
                <h4>Rp</h4>
              </div>
              <input
                type="number"
                placeholder="Harga Terendah"
                value={minPrice}
                onChange={handleMinPriceChange}
                maxLength={100}
              />
            </div>
            <div className="harga-satuan-filter">
              <div className="box-harga-satuan-filter">
                <h4>Rp</h4>
              </div>
              <input
                type="number"
                placeholder="Harga Tertinggi"
                value={maxPrice}
                onChange={handleMaxPriceChange}
                maxLength={100}
              />
            </div>
            {/* <button onClick={handleFilter}>Filter</button> */}
            {/* <div
              className={`box-harga-filter ${
                activeIndex === 0 ? "active" : ""
              }`}
              onClick={() => handleClick(0)}
            >
              <h1>Rp380 rb - Rp620 rb</h1>
            </div>
            <div
              className={`box-harga-filter ${
                activeIndex === 1 ? "active" : ""
              }`}
              onClick={() => handleClick(1)}
            >
              <h1>Rp700 rb -Rp1 jt</h1>
            </div>
            <div
              className={`box-harga-filter ${
                activeIndex === 2 ? "active" : ""
              }`}
              onClick={() => handleClick(2)}
            >
              <h1>Rp1 jt-Rp5 jt</h1>
            </div> */}
          </div>
        </div>
      </div>
      <div className="accordion-filter">
        <button
          className={`accordion-toggle-filter ${accordionOpen3 ? "open" : ""}`}
          onClick={toggleAccordion3}
        >
          <span className="accordion-text-filter">Rating</span>
          <span className={`arrowFilter ${accordionOpen3 ? "up" : "down"}`} />
        </button>
        <div
          className={`accordion-content-filter ${accordionOpen3 ? "open" : ""}`}
        >
          <div className="page-filter">
            <div className="page-filter-rate">
              <Rating name="read-only" value={valueRate} readOnly />
              <h1>Keatas</h1>
            </div>
            <div className="page-filter-rate">
              <Rating name="read-only" value={valueRate2} readOnly />
              <h1>Keatas</h1>
            </div>
            <div className="page-filter-rate">
              <Rating name="read-only" value={valueRate3} readOnly />
              <h1>Keatas</h1>
            </div>
            <div className="page-filter-rate">
              <Rating name="read-only" value={valueRate4} readOnly />
              <h1>Keatas</h1>
            </div>
            <div className="page-filter-rate">
              <Rating name="read-only" value={valueRate5} readOnly />
              <h1>Keatas</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="accordion-filter-kondisi">
        <button
          className={`accordion-toggle-filter ${accordionOpen4 ? "open" : ""}`}
          onClick={toggleAccordion4}
        >
          <span className="accordion-text-filter">Kondisi</span>
          <span className={`arrowFilter ${accordionOpen4 ? "up" : "down"}`} />
        </button>
        <div
          className={`accordion-content-filter ${accordionOpen4 ? "open" : ""}`}
        >
          <div className="page-filter">
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Baru</label>
            </div>
            <div className="checkbox-filter">
              <BpCheckbox />
              <label htmlFor="">Bekas</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
