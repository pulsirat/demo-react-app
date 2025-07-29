
import React, { useState } from 'react';
import './Login.scss';
import '../../assets/styles/inputs.scss';
import '../../assets/styles/theme-buttons.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import ExchangeRate from '../ExchangeRate/ExchangeRate';

const Login = () => {

   const {
      register,
      handleSubmit
   } = useForm();

   const navigate = useNavigate();

   const onSubmit = async (data) => {

      console.log("Data", data);
      try {
         const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
         });

         const result = await response.json();

         if (response.ok) {
            console.log('Login success:', result);
            const token = result.token;
            localStorage.setItem('Authorization', token);
            navigate('/dashboard');
         } else {
            console.error('Login failed:', result.message || "Unknown error");
            alert(result.message);
         }
      } catch (error) {
         console.error('Error calling API:', error);
      }
   }

   const [showExachange, setShowshowExachange] = useState(false);

   return (
      <div className="login-container">
         <div className="login-left">
            <h1>Experience the new <strong>Country Client Onborading</strong></h1>
            <div className="features">
               <p>🔒 Secure</p>
               <p>👌 Easy</p>
               <p>⏱ Fast</p>
            </div>

            <div class='exachange-rate'>
               <button class='test-class' onClick={() => setShowshowExachange(true)}>Exachange Rate</button>
               {showExachange && <ExchangeRate />}
            </div>
            <p>Access more than just banking with your Country ID username and password</p>
            <div className="safety-tip">
               <h3>Staying safe</h3>
               <p>Fraudsters try to trick you into giving your login details via email, SMS and phone calls. Never share your login details with anyone. <button type="button" className="link-button" style={{background:'none',border:'none',color:'#0078d4',textDecoration:'underline',cursor:'pointer',padding:0}} onClick={() => alert('Learn more about staying safe!')}>Learn more</button></p>
            </div>
         </div>
         <div className="login-right">
  
            <div>
               <form onSubmit={handleSubmit(onSubmit)}>
                  <div className='login-input'>
                     <label class="nlsg-c-form-element__label login-label" id="username-label" for="userName">Username</label>
                     <input class="nlsg-c-form-element__control"
                        {...register("userName")}
                        id="username" type="text" />
                  </div>
                  <div className='login-input'>
                     <label class="nlsg-c-form-element__label login-label" id="password-label" for="password">Password</label>
                     <input class="nlsg-c-form-element__control"
                        {...register("password", { required: true })} id="password" type="password" />
                  </div>

                  <p className="forgot-link">Forgot your details?</p>
                  <p className="terms">By logging in you accept the <a href="/terms-and-conditions">terms and conditions</a>.</p>
                  <div class='login-button' >
                     <button type="submit" className="login-btn" >Log in</button>
                  </div>
               </form >
            </div>

         </div>
      </div>
   );
};

export default Login;
