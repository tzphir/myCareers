import React, { useState } from 'react';
import '../styles/Template.css';
import Logo from "../assets/logo.jpeg";
import { useLocation, useNavigate, NavLink  } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const displayNavigation = location.pathname !== '/login' && location.pathname !== '/signin' && location.pathname!== '/usersigninsuccess';

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    const clickLogo = () => {
        navigate('/home'); 
    };

    return (
        <header>
            <div id="header">
                <img src={Logo} alt="MyCareer" onClick={clickLogo} style={{ cursor: 'pointer' }} />
                {displayNavigation && <button id="logout" onClick={() => navigate('/login')}>Log Out</button>}
            </div>
            <hr style={{ border: '1px solid black' }} />
            {displayNavigation && (
                <nav className={`nav ${menuOpen ? 'nav-open' : ''}`}>
                    <button id="menu-toggle" onClick={toggleMenu}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M3 12h18M3 6h18M3 18h18" stroke="black" strokeWidth="2" />
                        </svg>
                    </button>
                    
                    <ul className={menuOpen ? 'show' : ''}>
                        {menuOpen && (
                            <button id="close-menu" onClick={closeMenu}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                    <path d="M6 18L18 6M6 6l12 12" stroke="black" strokeWidth="2" />
                                </svg>
                            </button>
                        )}
                        <li>
                            <NavLink 
                                to="/home" 
                                className={({ isActive }) => isActive ? "nav_links active" : "nav_links"}
                                onClick={closeMenu}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/postings+applications" 
                                className={({ isActive }) => isActive ? "nav_links active" : "nav_links"}
                                onClick={closeMenu}
                            >
                                Postings/Applications
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/events" 
                                className={({ isActive }) => isActive ? "nav_links active" : "nav_links"}
                                onClick={closeMenu}
                            >
                                Events
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                to="/myprofile" 
                                className={({ isActive }) => isActive ? "nav_links active" : "nav_links"}
                                onClick={closeMenu}
                            >
                                MyProfile
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            )}
            <hr style={{ border: '1px solid black' }} />
        </header>
    );
};

export default Header;
