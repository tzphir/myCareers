import React, { useState } from 'react';
import '../styles/Login.css'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function Signin(){

    const inputStyle = {
        width: "100%",
        padding: "0.5vw",
        marginBottom: "2vh",
        fontWeight: "normal",
        marginTop: "1vh",
        boxSizing: "border-box",
    };

    // Declare all required fields here
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate(); 

    const handleSignin = (event) => {
        event.preventDefault();

        // First, check that there are no empty fields
        if (!email || !password || !confirmPassword) {
            window.alert("All fields are required!");
            return;
        }

        // First, check if passwords match
        if (password !== confirmPassword) {
            window.alert("Passwords don't match! Please try again.");
            return;
        }

        // Check if the email is a mcgill one
        if (!email.endsWith("mcgill.ca")) {

            window.alert("Please use your McGill email when signing in.");
            return;

        }

        // Proceed with POST request
        axios.post("http://localhost:8000/Users/signin", { email, password })
            .then(result => {
                console.log(result);

                // Already a record with the same email inside the database
                if (result.data.message === "User already exists") {
                    window.alert("User already exists.");
                } 

                // When all succeeds, we can go to the redirect page
                else {
                    navigate('/usersigninsuccess');
                }
            })
            .catch(err => {
                console.error(err);
            });

    }
        
        
    const handleLogin = (event) => {
        navigate('/login')
    }

    
    return(
       <div className="login-page"id="Signin">
        <div className="login-container" id="signinform">

                <h2 style={{textAlign: "center"}}>Sign in to myCareers</h2>
                <p>McGill's Career Help System</p>
       
                <form onSubmit={handleSignin} id="sign-in-container" className="form-container"> 
                    <label>McGill Email </label>
                    <input
                     type="text"
                     name="email"
                     placeholder="Enter McGill Email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     className='exclude-style'
                     style={inputStyle}
                     /> <br />

                    <label>New Password</label>
                    <input 
                     type="password" 
                     name="password"
                     placeholder="Enter Password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                   />
                   <label>Reenter Password</label>
                    <input 
                     type="password" 
                     name="confirmPassword"
                     placeholder="Confirm Password"
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                   />

                    <div className="separator">
                        <hr style={{border: '1px solid black'}}/>
                        <p>For assistance please contact the <a href="#">ICS Service Desk</a></p>
                    </div>

                    <div className="button-container"> 
                        <button className="primary-button" type="submit">Sign in</button>
                        <button className="primary-button secondary-button" type="button" onClick={handleLogin}>Log in</button>
                    </div>
                </form>
        </div>
       </div>
    ); 
}

export default Signin;
