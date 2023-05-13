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
import TambahProduk from "./pages/tambahProduk";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/whislist" element={<Whislist />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tambahproduk" element={<TambahProduk />} />
        <Route path="/detailproduct" element={<DetailProduct />} />
        <Route path="/detailpesanan" element={<Detailpesanan />} />
        <Route path="/daftartoko" element={<DaftarToko />} />
        <Route path="/toko/*" element={<Toko />} />
      </Routes>
    </div>
  );
}

export default App;
