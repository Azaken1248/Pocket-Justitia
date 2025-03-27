import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";

import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Register from "../pages/Register";
import { GeneralProvider } from "../context/GeneralContext";

function App() {
    return (
        <div>
          <BrowserRouter>
          <GeneralProvider>
                <Navbar></Navbar>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
                <Footer></Footer>
          </GeneralProvider>
        </BrowserRouter>
        </div>
    );
}

export default App;
