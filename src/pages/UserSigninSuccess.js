import React from 'react';
import '../styles/Login.css'; 
import { useNavigate } from 'react-router-dom';



function UserSigninSuccess() {

  const navigate = useNavigate();

  const redirect = () => {
      navigate('/login');
  }

  return (

    <div>

      <p style={{textAlign:"center"}}> You have sucessfully created your profile! Please click on the following link to login </p>

      <div style={{ margin: "20px 0" }}></div>

      <div className='button-container'>
        <button className="primary-button" onClick={redirect}> Go to login page</button>
      </div>
    
      <div style={{ margin: "20px 0" }}></div>

    </div>

    );

}

export default UserSigninSuccess;
