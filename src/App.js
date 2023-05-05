import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./login/login";

import Register from "./register/register";
import Home from "./pages/home";
import DetailProduct from "./pages/detailproduct";
import Detailpesanan from "./pages/detailpesanan";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/detailproduct" element={<DetailProduct />} />
        <Route path="/detailpesanan" element={<Detailpesanan />} />
      </Routes>
    </div>
  );
}

export default App;
