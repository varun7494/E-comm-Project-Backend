const mongoose = require('mongoose');


const CartSchema  = new mongoose.Schema({

    u_id : {
        type : String,
        required: true
    },
    p_id : { 
        type : String,
        required  : true
    },
    quantity : {
        type : Number,
        required  : true
    }



})

const Cart =mongoose.model('Cart',  CartSchema)

module.exports = Cart;