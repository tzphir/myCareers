import React from 'react';
import '../styles/Login.css'; 
import { useNavigate } from 'react-router-dom';
import { useState } from "react";
import axios from 'axios';



function Login(){

    // Set required fields
    const [email, setEmail] = useState(); 
    const [password, setPassword] = useState(); 
    const navigate = useNavigate(); 


    const handleLogin = (event) => {

        event.preventDefault();

        // Basic validation
        if (!email || !password) {
            window.alert("Please enter both email and password.");
            return;
        }

        axios.post("http://localhost:8000/Users/login", { email, password })
        .then(result => {
            console.log(result);

            if (result.data.message === "Success") {
                const id = result.data.id;
                // store the id for the home page
                localStorage.setItem("id", id);
                navigate(`/home/${id}`);
            } else {
                window.alert("Login failed. Please try again.");
            }
        })
        .catch(err => {
            console.error(err);
        });
        
    };

    const handleSignin = (e) => {
        e.preventDefault();
        navigate('/signin'); 
    }

    
    return(
       <div className="login-page"id="Login ">
        <div className="login-container" id="loginform">

                <h2>Login to myCareers</h2>
                <p>McGill's Career Help System</p>
       
                <form id="form-container" className="form-container" onSubmit={handleLogin}> 
                    <label>McGill Email </label>
                    <input
                     type="text"
                     name="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)} 
                     />

                    <label>Password</label>
                    <input 
                     type="password" 
                     name="password" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                   />

                    <div className="separator">
                        <hr style={{border: '1px solid black'}}/>
                        <p>For assistance please contact the <a href="#">ICS Service Desk</a></p>
                    </div>


                    <div className="button-container"> 
                        <button className="primary-button" type="submit">Login</button>
                        <button className="primary-button secondary-button" onClick={handleSignin}>Sign in</button>
                    </div>

                </form>

                    
                


        </div>
       </div>
    ); 
}

export default Login;
