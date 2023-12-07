const express=require("express")
const bcrypt=require("bcrypt")
const { userModel } = require("../models/user.model")
const jwt=require('jsonwebtoken')

const userRouter=express.Router()

// user register
userRouter.post('/register',(req,res)=>{
    const {name,email,password,image}=req.body
    try{
        bcrypt.hash(password,3,async(err,hash)=>{
            if(err){
                res.status(400).res({"msg":err})
            }else{
                const user=new userModel({name,email,image,password:hash})
                await user.save()
                res.status(200).send({"msg":"registered successfully"})
            }
        })
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

// user login
userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await userModel.findOne({email:email})
        bcrypt.compare(password,user.password,(err,result)=>{
            if(result){
                const token=jwt.sign({userName:user.name},'blog')
                // console.log(user)
                res.status(200).send({"msg":"logged in successfully","token":token,"username":user.name})
            }else{
                res.status(400).send({"msg":err})
            }
        })
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

module.exports={userRouter}