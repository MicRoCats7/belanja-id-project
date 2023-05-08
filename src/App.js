import "./App.css";
import Register from "./register/register";
import Home from "./pages/home";
import Login from "./login/login";
import DetailProduct from "./pages/detailproduct";
import Detailpesanan from "./pages/detailpesanan";
import Whislist from "./whislist/whislist";
import { Route, Routes } from "react-router";
import DaftarToko from "./pages/daftarToko";
import Toko from "./pages/toko";
import HomeToko from "./pages/homeToko";
import ChatToko from "./pages/chatToko";
import TambahProduk from "./pages/tambahProduk";
import DaftarProduk from "./pages/daftarProduk";
import PesananToko from "./pages/pesananToko";
import UlasanPembeli from "./pages/ulasanPembeli";
import PengaturanToko from "./pages/pengaturanToko";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/whislist" element={<Whislist />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detailproduct" element={<DetailProduct />} />
        <Route path="/detailpesanan" element={<Detailpesanan />} />
        <Route path="/daftartoko" element={<DaftarToko />} />
        <Route path="/toko" element={<Toko />} />
        <Route path="/hometoko" element={<HomeToko />} />
        <Route path="/chat" element={<ChatToko />} />
        <Route path="/tambahproduk" element={<TambahProduk />} />
        <Route path="/daftarproduk" element={<DaftarProduk />} />
        <Route path="/pesanantoko" element={<PesananToko />} />
        <Route path="/ulasanpembeli" element={<UlasanPembeli />} />
        <Route path="/pengaturantoko" element={<PengaturanToko />} />
      </Routes>
    </div>
  );
}

export default App;
