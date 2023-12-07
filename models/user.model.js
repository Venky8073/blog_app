const mongoose=require('mongoose')

const userShema=mongoose.Schema({
    name:String,
    email:String,
    image:String,
    password:String
},{
    versionKey:false
})

const userModel=mongoose.model("user",userShema)

module.exports={userModel}

