import React from 'react';
import '../styles/Login.css'; 
import { useNavigate } from 'react-router-dom';



function Signin(){

    const navigate = useNavigate(); 

    const handleSignin = (event) => {
        //error catching, backend 
        navigate('/')
    }
    const handleLogin = (event) => {
        navigate('/login')
    }

    
    return(
       <div className="login-page"id="Signin ">
        <div className="login-container" id="signinform">

                <h2>Sign in to myCareers</h2>
                <p>McGill's Career Help System</p>
       
                <form onSubmit={handleSignin} id="sign-in-container" className="form-container"> 
                    <label>McGill Email </label>
                    <input
                     type="text"
                     name="email"
                     />

                    <label>New Password</label>
                    <input 
                     type="password" 
                     name="password" 
                   />
                   <label>Reenter Password</label>
                    <input 
                     type="password" 
                     name="re-password" 
                   />

                    <div className="separator">
                        <hr style={{border: '1px solid black'}}/>
                        <p>For assistance please contact the <a href="#">ICS Service Desk</a></p>
                    </div>

                    <div className="button-container"> 
                        <button className="primary-button" type="submit" onClick={handleSignin}>Signin</button>
                        <button className="primary-button secondary-button" type="button" onClick={handleLogin}>Login</button>
                    </div>
                </form>
        </div>
       </div>
    ); 
}

export default Signin;


