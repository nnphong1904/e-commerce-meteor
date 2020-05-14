import React from 'react';
import {mount} from 'react-mounter';
import {App} from '../App';
import Homepage from '../components/Homepage/Homepage.jsx';
import ProductPage from '../components/ProductPage/ProductPage.jsx';
import ProductInfo from '../components/ProductInfo/ProductInfo.jsx';


FlowRouter.route('/',{
  name:'home',
  action(){
    mount(({component})=><App component={component}/>,{component: <Homepage/>});
  }
})


FlowRouter.route('/page',{
  name:'home',
  action(){
    mount(({component})=><App component={component}/>,{component: <PageSelector/>});
  }
})

FlowRouter.route('/products',{
  name:'products',
  action(){
    mount(({component})=><App component={component}/>,{component: <ProductPage/>});
  }
})

FlowRouter.route('/products/:productId',{
  name:'products info',
  action(params, queryParam){

    const productId = params.productId;
    
    Meteor.call('fetchProductById',productId, (err, docs)=>{
      if (docs){
        mount(({component})=><App component={component}/>,{component: <ProductInfo product={docs.data[0]}/>});
      }
    })
  }
})