import React, {useState} from 'react';
import {Meteor} from 'meteor/meteor';
import '../Login/Login.css';
import './Register.css';

const RegisterForm = (props)=>{ 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [name, setName] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const onChangeHandler = (e, setState)=>{
      setState(e.target.value);
  }

  const goHomePage = (e)=>{
    if (e.target.id === `overlay`) props.setDisplayRegisterForm(false);
  }

  const goLoginForm = ()=>{
    props.setDisplayLoginForm(true);
    props.setDisplayRegisterForm(false)
  }
  const onSubmit = (e)=>{
    e.preventDefault();
    if (errorName===''){
      setErrorName('Please fill in your name');
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
      setErrorEmail('Your email is invalid');
    }
    if (password.length <6){
      setErrorPassword('Your password must be more than 6 characters');
    }
    const newUser = {name,email,password, role:0};
    try{
      Meteor.call('addUser',newUser,(err,result)=>{
       if (!err){
         Meteor.loginWithPassword(email, password,(err)=>{
            FlowRouter.go('/');
         })
       }
       else {
         console.log(err);
       }
      });
    }
    catch(err){
      console.log(err);
    }
    setEmail('');
    setPassword('')
    setName('');
  }

  const content = (
    <div onClick={e=>goHomePage(e)}  id="overlay"  className="overlay">
     <div className="login-container">
        <form onSubmit={(e)=>onSubmit(e)} className="form register-form">
          <div>Register</div>

          <label className="label name">           
            <div>Name</div>
            <input 
            value={name}
            onChange={(e)=>onChangeHandler(e,setName)}
            className="name" 
            type="text" 
            name="name" 
            placeholder="Enter your name..."/>
            <div className="err-msg">{errorName}</div>
          </label>

          <label className="label email" >
            <div>Email</div>
            <input 
              value={email} 
              onChange={(e)=>onChangeHandler(e,setEmail)} 
              className="email" 
              type="text" 
              name="email" 
              placeholder="Enter your email..."/>
            <div className="err-msg">{errorEmail}</div>
          </label>
          
          <label className="label password">
            <div>Password</div>
            <input 
            value={password}
            onChange={(e)=>onChangeHandler(e,setPassword)}
            className="password" 
            type="password" 
            name="password" 
            placeholder="Enter your password..."/>
            <div className="err-msg">{errorPassword}</div>
          </label>
          <div className="policy">By creating an account your agree to the <a>Terms of service</a> and <a>Privacy Policy</a></div>
          <button className="submit-register-form">Register</button>
          <div className="have-account">Do you have account? <a onClick={goLoginForm}>Log in</a></div>
        </form>
     </div>
    </div>
  )
  return content;
}

export default RegisterForm;