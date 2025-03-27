import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import { GeneralContext } from '../context/GeneralContext';
import '../styles/Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const userType = localStorage.getItem('userType');
    const { logout } = useContext(GeneralContext);

    return (
        <div className="navbar-container">
            <div className="navbar">
                {!userType ? (
                    <>
                        <h3 className="navbar-logo"><a href='/' className="navbar-link">JUSTICIA</a></h3>   
                        <div className="nav-options">
                            <p onClick={() => navigate('/')}>Home</p>
                            <p onClick={() => navigate('/login')}>Login</p>
                        </div>
                    </>
                ) : userType === 'client' ? (
                    <>
                        <h3 className="navbar-logo">JUSTICIA</h3>
                        <div className="nav-options">
                            <p onClick={() => navigate('/')}>Home</p>
                            <p onClick={() => navigate('/my-cases')}>My Cases</p>
                            <p onClick={logout}>Logout</p>
                        </div>
                    </>
                ) : userType === 'lawyer' ? (
                    <>
                        <h3 className="navbar-logo">JUSTICIA (Lawyer)</h3>
                        <div className="nav-options">
                            <p onClick={() => navigate('/')}>Home</p>
                            <p onClick={() => navigate('/assigned-cases')}>Assigned Cases</p>
                            <p onClick={() => navigate('/past-cases')}>Past Cases</p>
                            <p onClick={logout}>Logout</p>
                        </div>
                    </>
                ) : userType === 'judge' ? (
                    <>
                        <h3 className="navbar-logo">JUSTICIA (Judge)</h3>
                        <div className="nav-options">
                            <p onClick={() => navigate('/')}>Home</p>
                            <p onClick={() => navigate('/ongoing-cases')}>Ongoing Cases</p>
                            <p onClick={() => navigate('/past-verdicts')}>Past Verdicts</p>
                            <p onClick={logout}>Logout</p>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Navbar;