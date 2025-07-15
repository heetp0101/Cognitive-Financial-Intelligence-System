import { Form, Input } from 'antd';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import 'local-storage';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { loginUser } from '../auth/Login';
import '../resources/authentication.css';
function Login() {

    const navigate = useNavigate();

    const firebaseConfig = {
      apiKey: "AIzaSyByA9Jr_gDNp6OkHuSkMhxjTP_x_5SEyGc",
      authDomain: "expense-tracker-a8a57.firebaseapp.com",
      databaseURL: "https://expense-tracker-a8a57-default-rtdb.firebaseio.com",
      projectId: "expense-tracker-a8a57",
      storageBucket: "expense-tracker-a8a57.appspot.com",
      messagingSenderId: "335618173369",
      appId: "1:335618173369:web:38bb527a5f70ccbb71ae68",
      measurementId: "G-VR4651YZW7"
  };
  
  const app = initializeApp(firebaseConfig);
  
  const auth = getAuth(app);

      const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        password: '',
      });
  
      const handleChange = (id, value) => {
        
        setFormValues((prevFormValues) => ({
          ...prevFormValues,
          [id]: value,
        }));
      };

      const HandleRegisterClick = ()=>{

      try {
        const user =  loginUser(formValues.email, formValues.password, navigate);
        if (user) {
          // If the login is successful, navigate to the Home page and pass the username as a state
          
        }
      } catch (error) {
       console.error("Login Error ",error); 
      }
  };

  useEffect(()=>{
    if(localStorage.getItem("name"))
    {
      navigate("/home");
    }
  },[]);



  return (
    <div className='register'>
      <div className='row justify-content-center align-items-center w-100 h-100'>
        <div className='col-md-5'>
          <div className='lottie'>
          <dotlottie-player 
  src="https://lottie.host/a23f6a4b-2dc1-4993-9ae6-426cbd2fed86/OQUDZKUwV6.lottie" 
  background="transparent" 
  speed="1" 
  loop 
  autoplay
></dotlottie-player>
          </div>
        </div>
        <div className='col-md-4'>
          <Form layout='vertical'>
            <h1>SHEYMONEY / LOGIN</h1>
            <hr/>


            <Form.Item label="Email :" name="email" id="email">
              <Input onChange={(e) => handleChange('email', e.target.value)} />

            </Form.Item>

            <Form.Item label="Password :" name="password" id="password">
              <Input onChange={(e) => handleChange('password', e.target.value)} />

            </Form.Item>
            <div className='d-flex justify-content-between align-items-center'>
            <NavLink to={'/register'}>Not Registered ? Click Here to Register </NavLink>
            <button className='primary' type ='submit'  onClick={HandleRegisterClick}>LOGIN</button>
             </div>
          
          </Form>

       </div>
      </div>
    </div>
  )
}

export default Login;
