const express = require('express')
const app = express()
const router = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
require('dotenv').config()
const SECRET = process.env.JWT_SECRET
app.use(express.json())

const users=[]
app.post('/register',async(req,res)=>{
    try{
    const{name,email,password}=req.body
    const exitinguser = await prisma.user.findUnique({
        where:{email:email}
    })
    if (exitinguser){
        return res.status(400).json({message:"User already exists"})
    }
    const hashedPAssword = await bcrypt.hash(password,10)
    const user = await prisma.user.create({
        data:{
            name,
            email,
            password:hashedPAssword
        }
    })
    const token = jwt.sign({id:user.id,email:user.email},SECRET,{expiresIn:'1d'})
    res.json({ message: 'Signup successful', token })}
    catch(error){
        console.log(err)
        res.status(500).json({ message: 'Server error' })
    }
    
    
})
app.listen(300,()=>{
    console.log("Server is runnning on port 3000")
})