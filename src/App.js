import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./login/login";
import Register from "./register/register";
import Home from "./pages/home";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
