const mongoose = require('mongoose')
const Schema   = mongoose.Schema

const ProductSchema = new Schema({
  productUrl: {
    type: String,
    required: true
  },
  productName: {
    type: String,
    required: true
  },
  productImageUrl: {
    type: String,
    required: true
  },
  productPrice: [{
    currentPrice: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      required: true
    }
  }],
  productDescription: {
    type: String,
    required: true
  },
  productComments: [{
    commentText: {
      type: String
    },
    commentUpVote: {
      type: Number
    },
    commentDownVote: {
      type: Number
    }
  }]
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

const ProductModel = mongoose.model('Product', ProductSchema)

module.exports = ProductModel