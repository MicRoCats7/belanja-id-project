
import './App.css';
import { Routes,  Route} from "react-router-dom";
import Login from './login/login';
import Register from "./register/register";
import Home from "./pages/home";
import Whislist from './whislist/whislist';

function App() {  
  return (
    <div>
      <Routes>  
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Home />} />
        <Route path="/whislist" element={<Whislist />} />
        </Routes>
    </div>
  );
}

export default App;
