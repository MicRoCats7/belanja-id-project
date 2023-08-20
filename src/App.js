import "./App.css";
import Register from "./register/register";
import Home from "./pages/home";
import Login from "./login/login";
import DetailProduct from "./pages/detailproduct";
import Detailpesanan from "./pages/detailpesanan";
import Whislist from "./pages/whislist";
import { Route, Routes } from "react-router";
import DaftarToko from "./pages/daftarToko";
import TambahProduk from "./pages/tambahProduk";
import Profile from "./pages/profile";
import Toko from "./pages/toko";
import Event from "./pages/event";
import Detailevent from "./pages/detailevent";
import Search from "./pages/search.";
import Keranjang from "./pages/keranjang";
import { SkeletonTheme } from "react-loading-skeleton";
import Detailtoko from "./pages/detailtoko";
import Notifikasi from "./pages/notifikasi";
import UbahProduk from "./pages/ubahProduk";
import CategoryPage from "./pages/categoryPage";
import ChatUser from "./pages/chatUser";

function App() {
  return (
    <div>
      <SkeletonTheme baseColor="#E9E9E9" highlightColor="#E0E0E0">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/whislist" element={<Whislist />} />
          <Route path="/register" element={<Register />} />
          <Route path="/tambahproduk" element={<TambahProduk />} />
          <Route path="/detailproduct/:id" element={<DetailProduct />} />
          <Route path="/detailpesanan" element={<Detailpesanan />} />
          <Route path="/daftartoko" element={<DaftarToko />} />
          <Route path="/profile/*" element={<Profile />} />
          <Route path="/toko/*" element={<Toko />} />
          <Route path="/Event" element={<Event />} />
          <Route path="/detailevent/:id" element={<Detailevent />} />
          <Route path="/search" element={<Search />} />
          <Route path="/category/:id/:name" element={<CategoryPage />} />
          <Route path="/cart" element={<Keranjang />} />
          <Route path="/detailtoko/:id" element={<Detailtoko />} />
          <Route path="/notifikasi" element={<Notifikasi />} />
          <Route path="/ubahProduk/:id" element={<UbahProduk />} />
          <Route path="/chat" element={<ChatUser />} />
          <Route path="/chat/:to_id" element={<ChatUser />} />
        </Routes>
      </SkeletonTheme>
    </div>
  );
}

export default App;
