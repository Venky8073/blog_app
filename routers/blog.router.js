const express=require('express')
const { auth } = require('../middleware/auth.middeware')
const { blogModel } = require('../models/blogs.model')

const blogRouter=express.Router()
blogRouter.use(auth)

// add blog
blogRouter.post('/add',async(req,res)=>{
    try{
        let blog=new blogModel(req.body)
        await blog.save()
        res.status(200).send({"msg":`${blog} added`})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

// get data
blogRouter.get('/',async(req,res)=>{
    try{
        const data=await blogModel.find()
        res.status(200).send({"data":data})
    }catch(err){
        res.status(400).send({"msg":err})
    }
})

module.exports={blogRouter}