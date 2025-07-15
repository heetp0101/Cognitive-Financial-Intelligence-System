import { Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { registerUser } from '../auth/Signup';
import '../resources/authentication.css';
function Register() {

  const navigate = useNavigate();

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

  const handleRegisterClick = async () => {
    console.log('Form values:', formValues);
    // You can perform any desired action using formValues.
  try{
  
    const registrationResult = await registerUser(formValues.name, formValues.email,formValues.password);

    console.log(`Results :  ${registrationResult}`);
    navigate('/login');
    // if (registrationResult) {
    //   // Handle successful registration (e.g., show a success message or navigate to a new page)
    //   console.log("sucessfull");

    //   navigate('/login');
    // } else {
    //   // Handle registration error (e.g., display an error message to the user).
    //   console.error('Registration error:', registrationResult);
    // }
    } catch (error) {
        console.log("Unexpected Error");
    }
  }
  
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
            <dotlottie-player src="https://lottie.host/34dd7329-6473-43de-a471-d76c83f2da8b/YkuVGpWb1l.json" background="transparent" speed="1"  loop autoplay></dotlottie-player>
          </div>
        </div>
        <div className='col-md-4'>
          <Form layout='vertical' >
            <h1>SHEYMONEY / REGISTER</h1>
            <hr/>
            <Form.Item label="Name :" name="name" id="name">
               <Input onChange={(e) => handleChange('name', e.target.value)} />

            </Form.Item>

            <Form.Item label="Email :" name="email" id="email">
               <Input onChange={(e) => handleChange('email', e.target.value)} />

            </Form.Item>

            <Form.Item label="Password :" name="password" id="password">
               <Input onChange={(e) => handleChange('password', e.target.value)} />

            </Form.Item>

            <div className='d-flex justify-content-between align-items-center'>
            <NavLink to={'/login'} >Already Registered. Click Here to Login</NavLink>
            <button className='primary' type ='button' onClick={handleRegisterClick}>REGISTER</button>
             </div>
          
          </Form>
           
        </div>
      </div>
    </div>
  )
}

export default Register;
