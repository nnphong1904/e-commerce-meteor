import React, { useContext } from 'react';
import {mount} from 'react-mounter';
import {App} from '../App';
import {Meteor} from 'meteor/meteor';
import Homepage from '../layouts/Homepage/Homepage.jsx';
import ProductPage from '../layouts/ProductPage/ProductPage.jsx';
import ProductInfo from '../layouts/ProductInfo/ProductInfo.jsx';
import CartPage from '../layouts/CartPage/CartPage.jsx';
import AdminPage from '../layouts/AdminPage/AdminPage.jsx';
import OrderAdminContent from '../layouts/OrdersAdminContent/OrdersAdminContent.jsx';
import ProductAdminContent from '../layouts/ProductAdminContent/ProductAdminContent.jsx';
FlowRouter.route('/',{
  name:'home',
  action(){
    mount(({component})=><App component={component}/>,{component: <Homepage/>});
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

FlowRouter.route('/admin',{
  name:'admin',
  action(){
    mount(()=><AdminPage/>);
  }
})

FlowRouter.route('/admin/orders', {
  name:'admin orders',
  action(){
    mount(({component})=><AdminPage component={component} />, {component: <OrderAdminContent/>})
  }
})

FlowRouter.route('/admin/products', {
  name:'admin product',
  action(){
    mount(({component})=><AdminPage component={component} />, {component: <ProductAdminContent/>})
  }
})