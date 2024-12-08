import React from 'react';
import '../styles/Login.css'; 
import { useNavigate } from 'react-router-dom';


function UserSigninSucess() {

  const navigate = useNavigate();

  return (

    <div className="login-page"id="Signin">

      <p> You have sucessfully created your profile! Please click on the following link to login </p>
      
      
    

    </div>

    );
