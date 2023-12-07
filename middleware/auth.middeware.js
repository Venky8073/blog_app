const jwt=require('jsonwebtoken')

const auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(' ')[1]
    if(token){
        jwt.verify(token,'blog',(err,decoded)=>{
            if(decoded){
                req.body.username=decoded.userName
                // console.log(decoded)
                next()
            }
            else{
                res.status(400).send({"msg":"token not verified"})
            }
        })
    }else{
        res.status(400).send({"msg":"Please login"})
    }
}

module.exports={auth}