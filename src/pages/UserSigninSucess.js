import React from 'react';
import '../styles/Login.css'; 
import { useNavigate } from 'react-router-dom';



function UserSigninSucess() {

  const navigate = useNavigate();

  const redirect = () => {
      navigate('/login');
  }

  return (

    <div className="login-page"id="Signin">

      <p> You have sucessfully created your profile! Please click on the following link to login </p>
      <button className="primary-button" onClick={redirect}> Go to login page</button>
    
      
      
    

    </div>

    );

}

export default UserSigninSucess;
