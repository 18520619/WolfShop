const express=require('express')
const router = express.Router()
const userModel= require('../models/user.model')
const bcrypt = require('bcrypt')

router.get('/',async(req,res)=>{
    try {
        const users= await userModel.find()
        res.render('users/listUser',{users:users})
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})

router.get('/login',(req,res)=>{
    res.render('users/login')
})

router.get('/register',(req,res)=>{
    res.render('users/register')
})

router.post('/',async(req,res)=>{
    try {
        const hashPassword= await bcrypt.hash(req.body.password,10)
        const newUser = new userModel({
            name:req.body.name,
            email:req.body.email,
            password:hashPassword
        })
        await newUser.save()
        req.flash("success","Insert Successfully")
        res.redirect('/user')
    } catch (e) {
        req.flash("error","Insert Failed")
        console.log(e)
        res.redirect('/')
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const delUser= await userModel.findById(req.params.id)
        await delUser.remove()
        req.flash("success","Delete Successfully")
        res.redirect('/user')
        
    } catch (e) {
        req.flash("error","Delete Failed")
        console.log(e)
        res.redirect('/')
    }

})


module.exports=router