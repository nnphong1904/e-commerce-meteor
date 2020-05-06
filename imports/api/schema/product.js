import SimpleSchema from 'simpl-schema';
const ProductSchema = new SimpleSchema({
  name: {
          type: String, 
          required:[true, 'no product name']
        },
  price: {
          type: Number,
          required:[true, 'no price']
        },
  rating: Number,
  retail: {
          type: Number, 
          required: [true, 'no retail']
        },
  availableSize: {
          type: Array,
          required: [false]
        },
  'availableSize.$':String,
  color:{
          type: Array,
  },
  'color.$': String
  // sellerId: {
  //         type: String,
  //         required: [false]
  //       }
})

export default ProductSchema;