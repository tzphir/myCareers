import React, { useState } from 'react';
import '../styles/Template.css';
import Logo from "../assets/logo.jpeg";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);
    const displayNavigation = location.pathname !== '/login' && location.pathname !== '/signin' && location.pathname!== '/usersigninsuccess';

    function setHeaderStyle() {
        const links = document.querySelectorAll('.nav_links');
        links.forEach(element => {
            element.style.textDecoration = 'none';
        });
        switch (location.pathname) {
            case '/home':
                document.getElementById('home_nav').style.textDecoration = 'underline' ;
                break;
            case '/postings+applications':
                document.getElementById('postings_nav').style.textDecoration = 'underline';
                break;
            case '/events':
                document.getElementById('events_nav').style.textDecoration = 'underline';
                break;
            case '/myprofile':
                document.getElementById('myprofile_nav').style.textDecoration = 'underline';
                break;
            default:
                break;
        }
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const closeMenu = () => {
        setMenuOpen(false);
    };

    return (
        <header>
            <div id="header" onLoad={setHeaderStyle}>
                <img src={Logo} alt="MyCareer" />
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
                        <li><a href="/home" id="home_nav" className="nav_links" onClick={closeMenu}>Home</a></li>
                        <li><a href="/postings+applications" className="nav_links" id="postings_nav" onClick={closeMenu}>Postings/Applications</a></li>
                        <li><a href="/events" className="nav_links" id="events_nav" onClick={closeMenu}>Events</a></li>
                        <li><a href="/myprofile" className="nav_links" id="myprofile_nav" onClick={closeMenu}>MyProfile</a></li>
                    </ul>
                </nav>
            )}
            <hr style={{ border: '1px solid black' }} />
        </header>
    );
};

export default Header;