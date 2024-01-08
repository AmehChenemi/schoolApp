const regModel =require('../models/regModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



exports.register = async (req,res)=>{
    try{
        const{name, email, password, role}=req.body
        const lowerCase =email.toLowerCase()
        const salt = bcrypt.genSaltSync(10)
        const hashedPassword = bcrypt.hashSync(password, salt)
        const user =new regModel({
            name,
            email:lowerCase,
            password:hashedPassword,
            role
        })
        const token = jwt.sign(
            {email:user.email,
            userId:user._id},
            process.env.secret,
            {expiresIn:'15mins'})
        
        const savedUser = await user.save()
        res.status(200).json({
            message:'registeration successful',
            data:savedUser,
            token
        })
        

    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}


exports.logIn = async (req,res)=>{
try{

const {email,password} =req.body
const user = await regModel.findOne({email})
if(!user){
    res.status(404).json({
        message:'User not found'
    })
}

user.isLoggedIn =true

await user.save()

const isAdmin = user.role ==="Teacher"
if(isAdmin){
    user.isAdmin = true
}
await user.save()



const checkPassword = bcrypt.compareSync(password, user.password)
if(!checkPassword){
    res.status(404).json({
        message:'Invalid Password'
    })
}

const token = jwt.sign({
    userId:user._id,
    email: user.email,},
    process.env.secret,
{expiresIn:"1d"})

const savedToken = await user.save()
res.status(200).json({
    message:'Login Successfully',
    data:savedToken,
    token
})

}catch(err){
  res.status(500).json({
    error: err.message
  })
}
}

exports.getAll = async(req,res)=>{
    try{
        const allusers = await regModel.find()
        const totalUsers = allusers.length
        if(totalUsers ===0){
        res.status(400).json({
            message:'No user found'
        })
        }else{
        return res.status(200).json({
            message: `There are ${totalUsers} number of student in the database `,
            allusers,
            totalUsers
        })
    }
    }catch(err){
        res.status(500).json(err.message)
    }
}


exports.getUser = async(req,res)=>{
    try{
   const id = req.params.id
   const getOne = await regModel.findById(id)
   res.status(200).json({
    message:'user found',
    getOne
   })
    }catch(err){
        res.status(500).json({
            err:err.message
           })
    }
}

exports.updateUser = async(req,res)=>{
    try{
const id = req.params.id
const data = {
    name:req.body.name,
    email:req.body.email
}
const update = await regModel.findByIdAndUpdate(id,data,{new:true}) 
if(!update){
  res.status(400).json({
    message:'cannot update user'
  })  

}else{
    res.status(200).json({
        message:'user updated successfully',
        update
    })
}
    }catch(err){
       res.status(500).json(err.message)
    }
}

exports.deleteUser = async(req,res)=>{
    try{
       const id =req.params.id
       const delUser = await regModel.findByIdAndDelete(id)
       res.status(200).json({
        message: 'User Deleted sucessfully from Database',
        delUser
       })
    }catch(err){
        res.status(500).json({
            error: err.message
        })
    }
}




