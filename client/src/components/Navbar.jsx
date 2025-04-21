import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/Icon.svg';
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
                        <div className='logo-container'>
                            <img src={logo} width={"60px"}></img>
                             <a href='/'>JUSTICIA</a>
                        </div>  
                        <div className="nav-options">
                            <p onClick={() => navigate('/')}>Home</p>
                            <p onClick={() => navigate('/login')}>Login</p>
                        </div>
                    </>
                ) : userType === 'normal' ? (
                    <>
                        <div className='logo-container'>
                            <img src={logo} width={"60px"}></img>
                             <a href='/'>JUSTICIA</a>
                        </div>  
                        <div className="nav-options">
                            <p onClick={() => navigate('/')}>Home</p>
                            <p onClick={() => navigate('/my-cases')}>My Cases</p>
                            <p onClick={logout}>Logout</p>
                        </div>
                    </>
                ) : userType === 'lawyer' ? (
                    <>
                        <div className='logo-container'>
                            <img src={logo} width={"60px"}></img>
                             <a href='/'>JUSTICIA</a>
                        </div>  
                        <div className="nav-options">
                            <p onClick={() => navigate('/')}>Home</p>
                            <p onClick={() => navigate('/assigned-cases')}>Assigned Cases</p>
                            <p onClick={() => navigate('/past-cases')}>Past Cases</p>
                            <p onClick={logout}>Logout</p>
                        </div>
                    </>
                ) : userType === 'judge' ? (
                    <>
                        <div className='logo-container'>
                            <img src={logo} width={"60px"}></img>
                             <a href='/'>JUSTICIA</a>
                        </div>  
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