import { Meteor } from 'meteor/meteor';
import {updateSoldValue ,fetchAllProduct ,addProduct, fetchProduct, fetchProductById} from '../imports/api/method/product'
import {getHashedToken ,addUser, getCurrentUser, isEmailAdmin, isAdmin} from '../imports/api/method/user';
import {changeOrderStatus ,fetchAllOrders ,canceledOrder, fetchOrder, addOrder, sendEmailToSeller} from '../imports/api/method/order';
import  UsersCollection  from '../imports/api/user';



Meteor.startup(() => {
  // Roles.setUserRoles('uiEQ3Go2u3eXcmteJ', 'admin')
  
  Meteor.methods({
    fetchUser :  async (condition)=>{
      const result = await UsersCollection.find(condition).fetch();
      return result;
    },
    updateSoldValue,
    fetchAllProduct,
    getHashedToken,
    isAdmin,
    sendEmailToSeller,
    addProduct,
    fetchProduct,
    addUser,
    isEmailAdmin,
    getCurrentUser,
    fetchProductById,
    addOrder,
    fetchOrder,
    canceledOrder, 
    fetchAllOrders,
    changeOrderStatus
  })
});
 
