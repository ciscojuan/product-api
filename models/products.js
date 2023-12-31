'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = Schema({
    name : {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : true
    },
    richDescription : {
        type : String,
        default : ''
    },
    image : {
        type : String,
        default : ''
    },
    images : [{
        type : String
    }],
    brand : {
        type : String,
        default : ''
    },
    price : {
        type : Number,
        default : 0
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    countInStock : {
        type : Number,
        required : true,
        min : 0,
        max : 500,
    },
    rating : {
        type : Number,
        default: 0
    },
    numReviews : {
        type : Number,
    },
    ifFeature : Boolean,
    dateCreated : {
        type : Date,
        default : Date.now()
    }

})

exports.Product = mongoose.model('Product', ProductSchema);
