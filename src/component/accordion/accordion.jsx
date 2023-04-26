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
    padding: "16px",
    "&:before": {
      display: "none",
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
            Apa produk atau jasa yang ditawarkan oleh UMKM?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Produk atau jasa yang ditawarkan oleh UMKM bisa beragam tergantung
            dari jenis usahanya sebagai contoh UMKM di bidang makanan dan
            minuman bisa menawarkan berbagai jenis makanan dan minuman,
            sedangkan UMKM di bidang fashion bisa menawarkan pakaian, aksesoris,
            atau kerajinan tangan. <br /> <br /> Sebagai calon konsumen,
            mengetahui jenis produk atau jasa yang ditawarkan oleh UMKM bisa
            membantu kita dalam memilih produk atau jasa yang sesuai dengan
            kebutuhan dan preferensi kita.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ marginTop: "10px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "red" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>
            Bagaimana cara memesan produk atau jasa dari UMKM?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Cara memesan produk atau jasa dari UMKM bisa berbeda-beda tergantung
            dari UMKM tersebut. Namun, umumnya ada beberapa cara yang bisa
            dilakukan untuk memesan produk atau jasa dari UMKM:
            <ul style={{ margin: "20px" }}>
              <li>
                Melalui website UMKM: Banyak UMKM yang memiliki website sebagai
                sarana penjualan produk atau jasanya seperti website belanja.id,
                Pada website tersebut biasanya terdapat informasi mengenai
                produk atau jasa yang ditawarkan, harga, dan cara memesan.
              </li>
              <br />
              <li>
                Melalui media sosial: UMKM juga seringkali mempromosikan produk
                atau jasanya melalui media sosial seperti Instagram, Facebook,
                atau Twitter. Anda bisa menghubungi UMKM melalui pesan pribadi
                atau fitur komentar untuk memesan produk atau jasa seperti
                contohnya di website belanja.id.
              </li>
              <br />
              <li>
                Melalui marketplace: Banyak UMKM yang juga menjual produk atau
                jasanya di marketplace seperti di webiste kami belanja.id Anda
                bisa mencari toko UMKM tersebut di marketplace dan memesan
                produk atau jasa melalui fitur yang disediakan.
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ marginTop: "10px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "red" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>
            Apakah UMKM menerima pesanan dalam jumlah besar?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Tergantung pada jenis produk atau jasa yang ditawarkan dan kebijakan
            UMKM tersebut, sebagian besar UMKM biasanya dapat menerima pesanan
            dalam jumlah besar. Beberapa UMKM mungkin lebih fokus pada pesanan
            dalam jumlah kecil, sementara yang lain mungkin lebih tertarik
            dengan pesanan dalam jumlah besar.
            <br />
            <br />
            Untuk memesan produk atau jasa dalam jumlah besar dari UMKM,
            sebaiknya Anda menghubungi UMKM tersebut terlebih dahulu untuk
            menanyakan ketersediaan dan kemampuan UMKM dalam memenuhi pesanan
            dalam jumlah besar.
            <br />
            <br />
            Biasanya UMKM akan memberikan informasi mengenai ketersediaan stok,
            harga khusus untuk pesanan dalam jumlah besar, waktu pembuatan
            produk atau pengerjaan jasa, serta persyaratan lain yang perlu
            dipenuhi untuk memesan dalam jumlah besar. Jadi, pastikan untuk
            berkomunikasi dengan UMKM tersebut dengan jelas dan lengkap mengenai
            pesanan dalam jumlah besar yang ingin Anda pesan.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ marginTop: "10px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "red" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>
            Bagaimana cara mengembalikan produk yang tidak sesuai atau cacat?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Ada beberapa cara yang dapat Anda gunakan untuk menghubungi UMKM
            jika ada masalah atau pertanyaan:
            <ul style={{ margin: "20px" }}>
              <li>
                Melalui nomor telepon: UMKM biasanya memiliki nomor telepon yang
                tercantum di website atau media sosial mereka. Anda dapat
                mencari nomor telepon ini dan menghubungi mereka langsung.
              </li>
              <br />
              <li>
                Melalui email: UMKM biasanya juga memiliki alamat email yang
                tercantum di website atau media sosial mereka. Anda dapat
                mengirim email dengan pertanyaan atau masalah yang Anda hadapi.
              </li>
              <br />
              <li>
                Melalui media sosial: Banyak UMKM yang memiliki akun media
                sosial seperti Facebook, Instagram, atau Twitter. Anda dapat
                menghubungi mereka melalui pesan langsung atau mencantumkan
                pertanyaan atau masalah di kolom komentar.
              </li>
              <br />
              <li>
                Langsung ke toko: Jika UMKM memiliki toko fisik, Anda dapat
                datang langsung ke toko tersebut untuk bertanya atau
                menyampaikan masalah yang Anda hadapi.
              </li>
            </ul>
            Pastikan Anda memberikan informasi yang jelas dan terperinci tentang
            masalah atau pertanyaan yang Anda miliki sehingga UMKM dapat
            memberikan jawaban atau solusi yang sesuai.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion style={{ marginTop: "10px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "red" }} />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>
            Bagaimana cara menghubungi UMKM jika ada masalah atau pertanyaan?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Untuk menghubungi UMKM jika ada masalah atau pertanyaan, Anda dapat
            menggunakan beberapa cara berikut:
            <ul style={{ margin: "20px" }}>
              <li>
                Kontak yang tertera di website: Banyak UMKM memiliki informasi
                kontak seperti nomor telepon atau email yang dapat digunakan
                untuk menghubungi mereka jika ada masalah atau pertanyaan. Cari
                informasi kontak tersebut di website UMKM yang bersangkutan dan
                hubungi mereka melalui telepon atau email.
              </li>
              <br />
              <li>
                Media sosial: UMKM seringkali menggunakan media sosial untuk
                mempromosikan produk atau jasa mereka. Jika ada masalah atau
                pertanyaan, Anda dapat mengirimkan pesan melalui fitur pesan
                pribadi atau komentar di postingan media sosial mereka.
              </li>
              <br />
              <li>
                Marketplace: Jika Anda memesan produk atau jasa dari UMKM
                melalui marketplace seperti di website kami belanja.id, Anda
                dapat menggunakan fitur chat yang disediakan oleh platform
                tersebut untuk menghubungi penjual dan menanyakan masalah atau
                pertanyaan yang Anda miliki.
              </li>
            </ul>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
