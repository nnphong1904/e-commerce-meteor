import { Mongo } from 'meteor/mongo';
import ProductSchema from './schema/product';
ProductCollection = new Mongo.Collection('product');
ProductCollection.attachSchema(ProductSchema);
export default ProductCollection;

