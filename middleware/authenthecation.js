const jwt = require('jsonwebtoken')
const regModel = require('../models/regModel.js')



const authenticate = async(req,res,next)=>{
    try{
 const hasAuth = req.headers.authorization
 if(!hasAuth){
    return res.status(401).json({
        message:'Unauthorized'
    })
 }
 const hasToken = hasAuth.split(' ')[1]
 if(!hasToken){
    return res.status(404).json({
        message:'Authorization not found'
    })
 }

 const decodedToken = jwt.verify(hasToken, process.env.secret)

 const user = await regModel.findById(decodedToken.userId)

 if(!user){
    return res.status(404).json({
        error: "Authorization failed: user not found" 
    })
}
// if (user.isLoggedIn===false){
//     res.status(400).json({
//         message:'user has been logged out'
//     })
// }
// if(user.role==="Student"){
//     res.status(400).json({
//         message:'User is not allowed to perform this action '
//     })
// }
// else{
//     res.status(200).json({
//     message: ''
//     })
// }


req.user = user;


//  const token = jwt.sign({uerId:user._id,email:user.email},
//     process.env.secret,
//     {expiresIn:'15mins'})




    next()

    }catch(err){
        
        if(err instanceof jwt.JsonWebTokenError){
            return res.json({
                message: "session Timeout"
            })
        }

        res.status(500).json(err.message)
    }
}

const role = async(req,res,next)=>{
    try{
 if(req.user.role ==="Teacher"){
    
    next()
    
 }else{
    res.status(401).json({
        message:'you are not allowed to perform this action'
    })
 }
    }catch(err){
        res.status(500).json(err.message)
    }
}


module.exports = {authenticate, role}

