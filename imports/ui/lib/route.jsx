import React from 'react';
import {mount} from 'react-mounter';
import {App} from '../App';
import Homepage from '../components/Thumbnail/Homepage.jsx';
FlowRouter.route('/',{
  name:'home',
  action(){
    mount(({component})=><App component={component}/>,{component: <Homepage/>});
  }
})
FlowRouter.route('/products',{
  name:'products',
  action(){
    mount(({component})=><App component={component}/>,{component: <div>Developing</div>});
  }
})

