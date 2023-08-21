import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import styled from "@emotion/styled";

export default function SimpleAccordion() {
  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid`,
    borderRadius: "10px",
    padding: "6px",
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
          <Typography>Mobile Banking (BNI, BRI, BCA, dll)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ol style={{ padding: "0 16px" }}>
              <li>Pada menu utama, pilih Menu Lainnya</li>
              <li>Pilih Transfer</li>
              <li>Pilih Rekening Tabungan</li>
              <li>Pilih Ke Rekening BNI</li>
              <li>
                Masukkan Nomor Rekening Pembayaran Anda 9889210066874071 lalu
                tekan Benar
              </li>
              <li>
                Masukkan jumlah tagihan yang akan Anda bayar secara lengkap.
                Pembayaran dengan jumlah tidak sesuai akan otomatis ditolak
              </li>
              <li>
                Pada halaman konfirmasi transfer akan muncul jumlah yang
                dibayarkan, nomor rekening dan nama Merchant. Jika informasi
                telah sesuai tekan Ya
              </li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ marginTop: "5px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "red" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>QRIS (Shoppepay)</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <ol style={{ padding: "0 16px" }}>
              <li>
                Buka aplikasi bank atau e-wallet yang mendukung pembayaran QRIS
                di HP-mu.
              </li>
              <li>Scan QR code di atas.</li>
              <li>Pastikan total tagihan sudah benar, lalu klik “Bayar”.</li>
              <li>Setelah berhasil, pembayaran akan terverifikasi otomatis.</li>
            </ol>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
