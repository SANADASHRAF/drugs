const mongoose=require('mongoose');

const productschame=mongoose.Schema({
    productname : {
        type : String ,
        required :true,
    },

    productimg : {
        type : String ,
        required :true,
    },

    price : {
        type : Number ,
        required :true,
    },

    companyname : {
        type : String ,
        required :true,
    },

    Indications : {
        type : String ,
        required :true,
    },
    
})

module.exports=mongoose.model('product', productschame);