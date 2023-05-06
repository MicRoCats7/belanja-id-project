
import './App.css';
import Register from "./register/register";
import Home from "./pages/home";
import Login from "./login/login";
import DetailProduct from "./pages/detailproduct";
import Detailpesanan from "./pages/detailpesanan";
import Whislist from './whislist/whislist';
import { Route, Routes } from 'react-router';

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
      </Routes>
    </div>
  );
}

export default App;
