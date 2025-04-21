import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import CaseDetails from "../pages/CaseDetails";
import Login from "../pages/Login";
import LawyerPage from "../pages/LawyerPage";
import JudgePage from "../pages/JudgePage";
import Landing from '../pages/Landing';
import Register from "../pages/Register";
import UserPage from "../pages/UserPage";
import { GeneralProvider } from "../context/GeneralContext";
import ProtectedRoute from "./protectedRoute"; // Adjust the path as needed

function App() {
    return (
        <div>
            <BrowserRouter basename="/Pocket-Justitia">
                <GeneralProvider>
                    <Navbar />
                    <Routes>
                        <Route path="" element={<Landing />} />
                        <Route path="/cases/:caseId" element={<CaseDetails />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            path="/user"
                            element={
                                <ProtectedRoute allowedRole="normal">
                                    <UserPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/lawyer"
                            element={
                                <ProtectedRoute allowedRole="lawyer">
                                    <LawyerPage />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/judge"
                            element={
                                <ProtectedRoute allowedRole="judge">
                                    <JudgePage />
                                </ProtectedRoute>
                            }
                        />
                    </Routes>
                    <Footer />
                </GeneralProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
