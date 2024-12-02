import React from 'react';
import '../styles/Template.css';
import Logo from "../assets/logo.jpeg";
import { useLocation } from 'react-router-dom';

const Header = () => {
    const location = useLocation();

    function setHeaderStyle(){
        const links = document.querySelectorAll('.nav_links');
        links.forEach(element => {
            element.style.textDecoration = 'none';
        });
        switch (location.pathname) {
            case '/':
                document.getElementById('home_nav').style.textDecoration = 'underline' ;
                break;
            case '/postings+applications':
                document.getElementById('postings_nav').style.textDecoration = 'underline' ;
                break;
            case '/events':
                document.getElementById('events_nav').style.textDecoration = 'underline' ;
                break;
            case '/myprofile':
                document.getElementById('myprofile_nav').style.textDecoration = 'underline' ;
                break;
            default:
                break;
        }
    };
    
    return (
        <header>
            <div id="header" onLoad={setHeaderStyle}>
                <img src={Logo} alt="MyCareer"/>
                <button id="logout">Log Out</button>
            </div>
            <hr style={{border: '1px solid black'}}/>
            <nav>
                <ul>
                    <li><a href="/" id="home_nav" className="nav_links">Home</a></li>
                    <li><a href="/postings+applications" className="nav_links" id="postings_nav">Postings/Applications</a></li>
                    <li><a href="/events" className="nav_links" id="events_nav">Events</a></li>
                    <li><a href="/myprofile" className="nav_links" id="myprofile_nav">MyProfile</a></li>
                </ul>
            </nav>
            <hr style={{border: '1px solid black'}}/>
        </header>
    );
};



export default Header;