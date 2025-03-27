import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CaseDetails from "../pages/CaseDetails";
import Login from "../pages/Login";
import Landing from '../pages/Landing';
import Register from "../pages/Register";
import UserPage from "../pages/UserPage";
import { GeneralProvider } from "../context/GeneralContext";

function App() {
    return (
        <div>
          <BrowserRouter>
          <GeneralProvider>
                <Navbar></Navbar>
                <Routes>
                    <Route path="" element = {<Landing></Landing>}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user/id" element={<UserPage />} />
                    <Route path="/user/uid/case/caseId" element={<CaseDetails />} />
                </Routes>
                <Footer></Footer>
          </GeneralProvider>
        </BrowserRouter>
        </div>
    );
}

export default App;
