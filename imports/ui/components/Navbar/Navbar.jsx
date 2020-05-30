import React, {useState, useEffect, createRef, useContext} from 'react';
import './Navbar.css';
import {Meteor} from 'meteor/meteor';
import Logo from '../../assets/image/logo.svg';
import Cart from '../../assets/image/cart.svg';
import Arrow from '../../assets/image/arrow.svg';
import { withTracker } from 'meteor/react-meteor-data';
import Avatar from 'react-avatar';
import { Session } from 'meteor/session'
const Navbar = (props)=>{
  
  
  const [userProfile, setUserProfile] =useState({});
  const [whoShouldBuy, setWhoShouldBuy] = useState('');
  const [typeProduct, setTypeProduct] = useState('');
  const [didOpenTypeProductSection, setDidOpenTypeProductSection] = useState(false);
  const productTypeRef = createRef();
  const menRef = createRef();
  const ladiesRef = createRef();
  const boysRef = createRef();
  const girlsRef = createRef();

  useEffect(() => {
    
    Meteor.call('getCurrentUser', {}, (err,result)=>{
      if (result.data!==null) 
      {
        console.log()
        setUserProfile({...result.data.profile});
        
      }
    })
  }, [props.currentUser]);
  
  const goToCartPage = ()=>{
    FlowRouter.go('/cart');
  }
  const toggleTypeProductSection = ()=>{
    console.log(didOpenTypeProductSection);
    if (didOpenTypeProductSection === false){
      productTypeRef.current.style.transform = 'scaleY(1) translateX(-50%)';
    }
    else {
      productTypeRef.current.style.transform = 'scaleY(0) translateX(-50%)';
    }
    setDidOpenTypeProductSection(!didOpenTypeProductSection);
  }
  const selectWhoShouldBuy = (ref, setState)=>{
    Session.set('whoShouldBuy', ref.current.innerText);
    setState(ref.current.innerText);
  }
  const selectTypeOfProduct = (e)=>{
    setTypeProduct(e.target.innerText);
    setDidOpenTypeProductSection(false);
    productTypeRef.current.style.transform = 'scaleY(0) translateX(-50%)';
    Session.set('typeOfProduct', e.target.innerText);
    FlowRouter.go('/products');
  }
  const hideTypeProductSection = ()=>{
    if (didOpenTypeProductSection === true){
      productTypeRef.current.style.transform = 'scaleY(0) translateX(-50%)';
      setDidOpenTypeProductSection(false);
    }
  }
  const loginBtnClick = ()=>{
    props.setDisplayLoginForm(true);
  }
  
  const logoutBtnClick = ()=>{
    setTypeProduct('');
    setWhoShouldBuy('');
    Meteor.logout((err)=>{
      console.log(err);
    })
  }

  const registerBtnClick = ()=>{
    props.setDisplayRegisterForm(true);
  }
  
  const goProductsPage = ()=>{
    FlowRouter.go('/products');
  }
  const content = (
    <div onClick={hideTypeProductSection} className="navbar">
      <div className="upper-part">
        <input 
          className="search-box" 
          type="text" 
          placeholder="Search"/>
        <img onClick={goProductsPage} src={Logo} className="Logo-navbar clickable"/>
        <div className="auth">
            { props.currentUser===null &&
              <div className="auth-btn">
                <button onClick={registerBtnClick} className="register-btn">Register</button>
                  <button 
                  onClick={loginBtnClick}
                  className="login-btn">
                 Log In
                </button>
              </div>
            }
            {
              props.currentUser !== null &&
              <div className="user-avatar-holder">
                <span id="avatar"><Avatar name={userProfile.name} size={25} round={true}/></span>
              </div>
            }
            { props.currentUser !== null &&
              <button onClick={logoutBtnClick} className="logout-btn">Log Out</button>
            }
        <div onClick={goToCartPage} className="cart-btn">
          <img src={Cart}  className="Cart"/>     
          {props.cartSize>0 && <div className="show-cart-size">{props.cartSize}</div>}
        </div>
        </div>
      </div>
      {/* Lower-part of navbar */}
      <div className="lower-part">
            <ul className="gender-age-filter">
               <li>
                <button 
                  onClick={e =>{
                    selectWhoShouldBuy(menRef, setWhoShouldBuy);
                    toggleTypeProductSection(e, menRef);
                }}  
                  className="who-should-buy">
                  <span ref={menRef}>Men</span>
                  <img src={Arrow} className="Arrow"/>
                </button>
                
              </li> 
               <li>
                <button 
                  onClick={e =>{
                    selectWhoShouldBuy(ladiesRef, setWhoShouldBuy);
                    toggleTypeProductSection(e, ladiesRef);
                }}  
                  className="who-should-buy">
                  <span ref={ladiesRef}>Ladies</span>
                  <img src={Arrow} className="Arrow"/>
                </button> 
               </li> 
               <li>
                 <button 
                    onClick={e =>{
                      selectWhoShouldBuy(girlsRef, setWhoShouldBuy);
                      toggleTypeProductSection(e, girlsRef);
                  }}  
                    className="who-should-buy">
                    <span ref={girlsRef}>Girls</span>
                    <img src={Arrow} className="Arrow"/>
                  </button> 
               </li> 
               <li>
                <button 
                    onClick={e =>{
                      selectWhoShouldBuy(boysRef, setWhoShouldBuy);
                      toggleTypeProductSection(e, boysRef);
                  }}  
                    className="who-should-buy">
                    <span ref={boysRef}>Boys</span>
                    <img src={Arrow} className="Arrow"/>
                  </button>
               </li>
            </ul>
            <div ref={productTypeRef} className="item-selector">
                  <ul className="list-item-title">
                    <li>
                      <button
                      onClick={(e)=>{
                        selectTypeOfProduct(e);
                      }} 
                      className="type-of-product">Tops</button>
                    </li>
                    <li>
                      <button
                      onClick={(e)=>{
                        selectTypeOfProduct(e);
                      }} 
                      className="type-of-product">Dresses</button>
                      </li>
                    <li>
                      <button
                      onClick={(e)=>{
                        selectTypeOfProduct(e);
                      }} 
                      className="type-of-product">Bottoms</button>
                      </li>
                    <li>
                      <button
                      onClick={(e)=>{
                        selectTypeOfProduct(e);
                      }} 
                      className="type-of-product">Jackets</button>
                      </li>
                    <li>
                      <button
                      onClick={(e)=>{
                        selectTypeOfProduct(e);
                      }} 
                      className="type-of-product">Shoes</button>
                      </li>
                    <li>
                      <button
                      onClick={(e)=>{
                        selectTypeOfProduct(e);
                      }} 
                      className="type-of-product">Accessories</button>
                      </li>
                    <li>
                      <button
                      onClick={(e)=>{
                        selectTypeOfProduct(e);
                      }} 
                      className="type-of-product">Sale</button>
                      </li>
                  </ul>
            </div>
      </div>
      {/* { whoShouldBuy!=='' && typeProduct!=='' && <div className="filter-value">{`${whoShouldBuy}/${typeProduct}`}</div>} */}
      <div className="filter-value">
      {
        ((whoShouldBuy!=='' && typeProduct!=='') || (Session.get('whoShouldBuy') && Session.get('typeOfProduct')))  && `${whoShouldBuy || Session.get('whoShouldBuy')}/${typeProduct || Session.get('typeOfProduct')}`
      }
      </div>
    </div>
  );
  return content;
    
}

export default withTracker(()=>{
  let currentUser = Meteor.user();
  Meteor.call('isAdmin', currentUser, (err, result)=>{
    console.log()
    if (result === true){
      Meteor.logout();
    }
    return;
  })
  return {
    currentUser: Meteor.user(),
    cartSize: Session.get('myCart').reduce((sumQuantity, productInCart)=>sumQuantity + productInCart.quantity, 0)
  }
})(Navbar);