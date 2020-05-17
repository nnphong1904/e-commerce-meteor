import { Meteor } from 'meteor/meteor';
import {addProduct, fetchProduct, fetchProductById} from '../imports/api/method/product'
import {addUser, getCurrentUser} from '../imports/api/method/user';
import {addOrder} from '../imports/api/method/order';
import  UsersCollection  from '../imports/api/user';


Meteor.startup(() => {
  Meteor.methods({
    fetchUser :  async (condition)=>{
      const result = await UsersCollection.find(condition).fetch();
      return result;
    },
    addProduct,
    fetchProduct,
    addUser,
    getCurrentUser,
    fetchProductById,
    addOrder,
  })
});
 
