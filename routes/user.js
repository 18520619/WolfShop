const express=require('express')
const router = express.Router()
const userModel= require('../models/user.model')
const orderModel= require('../models/order.model')
const bcrypt = require('bcrypt')
const passport=require('passport')

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
            level=0,
            password:hashPassword
        })
        if(req.body.image !=null && req.body.image!==''){
            const imageEncode=JSON.parse(req.body.image)
            newUser.imageType=imageEncode.type
            newUser.imageData=new Buffer.from(imageEncode.data,'base64')
        }
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

router.post('/login',passport.authenticate('local',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/profile',
    failureFlash:true
}))

function check(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/user/login')
}

router.get('/profile',(req,res)=>{
    let value="No name"
    
    if (req.user){
        value="Name: " +req.user.name
    }
    res.render('users/profile', {name:value})
})

router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('login')
})

router.get('/github',passport.authenticate("github"))
router.get('/github/callback', passport.authenticate('github',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/profile',
    failureFlash:true
}))
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))
router.get('/google/callback',passport.authenticate('google',{
    successRedirect:'/user/profile',
    failureRedirect:'/user/login',
    failureFlash:true
}))

router.get('/order', check, async(req, res) => {
    try {
        const orders = await orderModel.find()
        res.render('users/order', {orders: orders})
    } catch(e) {
        console.log(e)
        res.redirect('/')
    }
})
module.exports=router