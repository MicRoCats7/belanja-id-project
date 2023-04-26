import './App.css';
import Register from "./register/register";
import Home from "./pages/home";
import Login from "./login/login";
import DetailProduct from "./pages/detailproduct";
import Whislist from './whislist/whislist';


function App() {  
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/whislist" element={<Whislist />} />
        <Route path="/register" element={<Register />} />
        <Route path="/detailproduct" element={<DetailProduct />} />
        </Routes>
    </div>
  );
}

export default App;
