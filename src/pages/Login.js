import React from 'react';
import '../styles/Login.css'; 
import { useNavigate } from 'react-router-dom';
import { useState } from "react";



function Login(){

    const navigate =useNavigate(); 

    const [email, setEmail] = useState(); 
    const [password, setPassword] = useState(); 


    const handleLogin = (event) => {
        //error catching 
        navigate('/')
    }

    const handleSignin = (event) => {
        navigate('/signin'); 
    }

    
    return(
       <div className="login-page"id="Login ">
        <div className="login-container" id="loginform">

                <h2>Login to myCareers</h2>
                <p>McGill's Career Help System</p>
       
                <form id="form-container" className="form-container"> 
                    <label>McGill Email </label>
                    <input
                     type="text"
                     name="email"
                     value={email}
                     />

                    <label>Password</label>
                    <input 
                     type="password" 
                     name="password" 
                     value={password}
                   />

                    <div className="separator">
                        <hr style={{border: '1px solid black'}}/>
                        <p>For assistance please contact the <a href="#">ICS Service Desk</a></p>
                    </div>

                    <div className="button-container"> 
                        <button className="primary-button" type="button" onClick={handleLogin}>Login</button>
                        <button className="primary-button secondary-button" onClick={handleSignin}>Sign in</button>
                    </div>
                </form>
        </div>
       </div>
    ); 
}

export default Login;


