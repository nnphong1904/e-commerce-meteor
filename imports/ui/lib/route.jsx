import React, { useContext } from 'react';
import {mount} from 'react-mounter';
import {App} from '../App';
import Homepage from '../layouts/Homepage/Homepage.jsx';
import ProductPage from '../layouts/ProductPage/ProductPage.jsx';
import ProductInfo from '../layouts/ProductInfo/ProductInfo.jsx';
import CartPage from '../layouts/CartPage/CartPage.jsx';


FlowRouter.route('/',{
  name:'home',
  action(){
    mount(({component})=><CartContextProvider><App component={component}/></CartContextProvider>,{component: <Homepage/>});
  }
})

{/* 
FlowRouter.route('/page',{
  name:'home',
  action(){
    mount(({component})=><App component={component}/>,{component: <PageSelector/>});
  }
}) */}

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
        mount(({component})=><App component={component}/>,{component: <ProductInfo  product={docs.data[0]}/>});
      }
    })
  }
})

FlowRouter.route('/cart',{
  name:'info',
  action(){
    mount(({component})=><App component={component}/>,{component: <CartPage/>});
  }
})