import { Mongo } from 'meteor/mongo';
import OrderSchema from '../api/schema/order';
OrderCollection = new Mongo.Collection('order');
OrderCollection.attachSchema(OrderSchema);
export default OrderCollection;