"use strict"

const { mongoose } = require('../configs/dbConnection')

const PizzaSchema=new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true,
      },
      image:String,
      price:{
        type:Number,
        required:true
      },

      //it is used as an Array because It can contain  more than one topping.- Birden fazla topping ( içereceği malzeme(sucuk,mantar gibi) array kullanıldı)
      toppingIds:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Topping"
        }
      ]


},{collection:"pizzas",timestamps:true})

module.exports=mongoose.model("Pizza",PizzaSchema)