const mongoose = require('mongoose');


const ProductSchema  = new mongoose.Schema({

    p_name : {
        type :  String,
        required  : true
    },
    price : {
        type :  String,
        required  : true,
    },
    image : {
        type :  String,
        required  : true,
    },
    category : {
        type :  String,
        required  : true
    },
    discount :{
        type :  String,
        required  : true
    }



})

const Products =mongoose.model('Products',  ProductSchema)

module.exports = Products;