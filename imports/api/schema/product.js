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
  
  availableSize: {
          type: Array,
          required: [true,'what size?']
        },
  'availableSize.$':{
    type:Object
  },
  'availableSize.$.size':{
    type: String
  },
  'availableSize.$.noItems':{
    type: String
  }
 
})

export default ProductSchema;