import React from 'react';
import '../styles/Template.css';
import Logo from "../assets/logo.jpeg";
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Header = () => {

    

    const id = localStorage.getItem("id");
    const location = useLocation();
    const navigate = useNavigate();

    const displayNavigation = location.pathname !== '/login' && location.pathname !== '/signin' && location.pathname!== '/usersigninsuccess';

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
                <button id="logout" onClick={() => navigate('/login')}>Log Out</button>
            </div>
            <hr style={{border: '1px solid black'}}/>
            {displayNavigation && (
                <nav>
                    <ul>
                        <li><a href={`/home`} id="home_nav" className="nav_links">Home</a></li>
                        <li><a href="/postings+applications" className="nav_links" id="postings_nav">Postings/Applications</a></li>
                        <li><a href={`/events`} className="nav_links" id="events_nav">Events</a></li>
                        <li><a href="/myprofile" className="nav_links" id="myprofile_nav">MyProfile</a></li>
                    </ul>
                    <hr style={{border: '1px solid black'}}/>
                </nav>
            )}
        </header>
    );
};



export default Header;
