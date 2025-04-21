import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRole }) => {
    const userType = localStorage.getItem("userType");
    console.log("ProtectedRoute: required =", allowedRole, "found =", userType);
  
    if (!userType || userType !== allowedRole) {
      return <Navigate to="/login" />;
    }
  
    return children;
};
export default ProtectedRoute;
