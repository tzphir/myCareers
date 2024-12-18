//Marie-Christine

import React from 'react';
import '../styles/Template.css'

function openCaps(){
    window.open('https://www.mcgill.ca/caps/', '_blank', 'noopener,noreferrer')
};

const Footer = () => {
    return (
        <footer>
            <div>
                <h3>Contact Us</h3>
                <p onClick={openCaps}>514-398-3304
                    <br></br>
                careers.caps@mcgill.ca</p>
            </div>
            <div>
                <h3>Notice of Consent</h3>
            </div>
            <div>
                <h3>©McGill University, 2024.</h3>
            </div>
        </footer>
    );
};

export default Footer;
