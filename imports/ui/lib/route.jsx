import React from 'react';
import {mount} from 'react-mounter';
import App from '../App';
import LoginForm from '../components/Login';
FlowRouter.route('/',{
  name:'home',
  action(){
    Accounts.createUser({
      email:'nnphong@apcs.vn',
      password:'123456789'
    });
    mount(()=><div></div>,{});
  }
})
FlowRouter.route('/login',{
  name:'login',
  action(){
    mount(()=><LoginForm />,{});
  }
})