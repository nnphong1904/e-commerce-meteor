import SimpleSchema from 'simpl-schema';
const OrderSchema = new SimpleSchema({
  userEmail: {
          type: String, 
          required:[true, 'login for order']
        },
  orderDetails: {
          type: String,
          required:[true, 'no item in cart']
        },
  status: Number,
  subtotal: Number,
  orderId: String
 
})

export default OrderSchema;