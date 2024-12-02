import React from 'react';
import '../styles/Template.css';
import Logo from "../assets/logo.jpeg";

const Header = () => {
    const location = useLocation();

    const setHeaderStyle = () => {
        switch (location.pathname) {
            case '/':
                return 'Home';
            case '/about':
                return 'About Us';
            case '/contact':
                return 'Contact Us';
            default:
                return 'Page Not Found';
        }
    };
    
    return (
        <header>
            <div id="header">
                <img src={Logo} alt="MyCareer"/>
                <button id="logout">Log Out</button>
            </div>
            <hr style={{border: '1px solid black'}}/>
            <nav>
                <ul>
                    <li><a href="/" id="home_nav">Home</a></li>
                    <li><a href="/postings+applications" id="postings_nav">Postings/Applications</a></li>
                    <li><a href="/events" id="events_nav">Events</a></li>
                    <li><a href="/myprofile" id="myprofile_nav">MyProfile</a></li>
                </ul>
            </nav>
            <hr style={{border: '1px solid black'}}/>
        </header>
    );
};



export default Header;