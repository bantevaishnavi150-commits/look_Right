const mongoose=require('mongoose');
const schema=mongoose.schema;
const listingSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    name:String,
    age:Number,
    city:String,
    discription:String,
    image:{
        type:String,
        set: (v)=>v===" " ?"default link":v,
    },
    price:Number,
});
const listing=mongoose.model("listing",listingSchema);
module.exports=listing;
