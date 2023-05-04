import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import styled from "@emotion/styled";

export default function FilterSimple() {
    const Accordion = styled((props) => (
      <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
      border: `1px solid`,
      borderRadius: "10px 10px 0px 0px",
      width:"350px",
      padding: "16px",
      "&:before": {
        display: "",
      },
    }));
  
    return (
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "red" }} />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              Stok
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
             tersedia
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion style={{ borderRadius: "0px" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon style={{ color: "red" }} />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>
              Kategori
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
             Kerajinan tangan 
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    );
  }
  