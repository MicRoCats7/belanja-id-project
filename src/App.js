import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./login/login";

  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/detailproduct" element={<DetailProduct />} />
      </Routes>
    </div>
  );
}

export default App;
