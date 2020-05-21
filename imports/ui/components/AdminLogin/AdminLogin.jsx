import React, { useState, useEffect } from 'react';
import { Meteor } from 'meteor/meteor';
import './AdminLogin.css';
const AdminLogin = ()=>{
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errMessage, setErrMessage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      console.log('interval');
     
        setErrMessage('');
      
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const loginHandler = (email, password)=>{
    Meteor.call('isEmailAdmin', email, (err, docs)=>{
      if (docs === true){
        setIsAdmin(true);
        Meteor.loginWithPassword(email, password, (err)=>{
          if (err){
            setErrMessage('Your email/password is invalid');
          }
          else {
            console.log(Meteor.user());
            Session.set('loginAsAdmin', true);
          }
        })
      }
      else {
        setIsAdmin(false);
        setErrMessage('Your email/password is invalid')
      }
    })
  }

  const onKeyUpHandler = (e)=>{
    if (e.keyCode === 13){
      Meteor.call('isEmailAdmin', email, (err, docs)=>{
        if (docs === true){
          setIsAdmin(true);
          Meteor.loginWithPassword(email, password, (err)=>{
            if (err){
              setErrMessage('Your email/password is invalid');
            }
            else {
              console.log(Meteor.user());
              Session.set('loginAsAdmin', true);
            }
          })
        }
        else {
          setIsAdmin(false);
          setErrMessage('Your email/password is invalid')
        }
      })
    }
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
                  onKeyUp={(e)=>{onKeyUpHandler(e)}}
                  onChange={(e)=>onChangeHandler(e, setPassword)}
                  className="admin-login-input" 
                  placeholder='Enter password' 
                  type="password"/>
              </div>
              <button 
                  onClick={()=>loginHandler(email, password)} 
                  className="admin-login-btn">Log in</button>
          </div>
        </div>
      </div>
    </div>
  );
  return content;
}

export default AdminLogin;