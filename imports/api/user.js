import { Mongo } from 'meteor/mongo';
import UserSchema from './schema/user';
UsersCollection = new Mongo.Collection('user');
UsersCollection.attachSchema(UserSchema)
export default UsersCollection;

