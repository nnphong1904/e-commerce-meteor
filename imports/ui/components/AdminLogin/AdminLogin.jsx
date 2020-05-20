import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import './AdminLogin.css';
const AdminLogin = ()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval');
      if (errMessage === ''){
        setErrMessage('');
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const loginHandler = (email, password)=>{
    console.log(Meteor.user())
    Meteor.loginWithPassword(email, password, (err)=>{
      if (err){
        setErrMessage('Your e-mail/password is invalid');
      }
      else {
        console.log(Meteor.user());
      }
    })
  }

  const onChangeHandler = (e, setState)=>{
    setState(e.target.value);
  }

  const content = (
    <div className="admin-login-form-container">
      <div className="admin-login-form-overlay">
        <div className="admin-login-form-holder">
          <div className="admin-login-form-header">Log in</div>
          <div className="admin-login-form-err-message">{errMessage}</div>
          <div className="admin-login-input-field">
              <div className="admin-email">
                <div className="admin-login-input-title">Email</div>
                <input 
                  onChange={(e)=>onChangeHandler(e, setEmail)}
                  className="admin-login-input" 
                  placeholder='email@sample.com' 
                  type="text"/>
              </div>
              <div className="admin-password">
                <div className="admin-login-input-title">Password</div>
                <input 
                  onChange={(e)=>onChangeHandler(e, setPassword)}
                  className="admin-login-input" 
                  placeholder='Enter password' 
                  type="password"/>
              </div>
              <button onClick={()=>loginHandler(email, password)} className="admin-login-btn">Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
}

export default AdminLogin;