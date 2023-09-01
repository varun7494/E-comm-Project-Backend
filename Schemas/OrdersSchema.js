const mongoose = require('mongoose');

const OrdersSchema  = new mongoose.Schema({

    o_data : {
        type :  Array,
        required  : true
    },
    date : {
        type :  new Data(Date.now()),
        required  : true,
    },
    ord_number : {
        type :  Math.floor(Math.randam() *2653673517).toString().padStart(6, 0),
        required  : true,
    },
    status : {
        type :  String,
        required  : true,
        default : "Pending"
    }


})

const Orders =mongoose.model('Orders',  OrdersSchema)

module.exports = Orders;