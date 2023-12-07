const express=require('express')
const { connection } = require('./db')
const cors=require('cors')
const { userRouter } = require('./routers/user.router')
const { blogRouter } = require('./routers/blog.router')

const app=express()

app.use(cors())

app.use(express.json())

app.use('/user',userRouter)

app.use('/blog',blogRouter)

app.get('/',(req,res)=>{
    res.send({"msg":"welcome to blog app"})
})

app.listen(4500,async()=>{
    try{
        await connection
        console.log("connected to DB")
    }catch(err){
        console.log(err)
    }
})