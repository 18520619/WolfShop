const express = require('express')
const router = express.Router()
const cartModel = require('../models/cart.model')
const productModel = require('../models/product.model')

router.get('/',async(req,res)=>{
    try {
        // req.session.cart=null
        let cart=[]
        let total=0
        if(req.session.cart){
            cart=req.session.cart.items
            total=req.session.cart.priceTotal
        }
        res.render('carts/cart',{cart:cart,total:total})
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
   
})

router.get('/add/:id',async(req,res)=>{
    try {
        // const id=req.params.id
        const product=await productModel.findById(req.params.id)
        
        const cart= new cartModel(req.session.cart ? req.session.cart:{items:[]})
        cart.add(product,req.params.id,product.imageSrc)
        req.session.cart=cart
        res.send("Add thành công")
        // res.redirect('/cart')
    } catch (e) {
        console.log(e.message)
        res.redirect('/')
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const cart=new cartModel(req.session.cart)
        cart.delete(req.params.id)
        req.session.cart=cart
        res.send("Delete thành công")
            // res.redirect('/cart')
    } catch (e) {
        res.send("Delete thất bại")
        console.log(e.message)
        // res.redirect('/')
    }
})

router.put('/increase/:id',(req,res)=>{
        try{
            const cart = new cartModel(req.session.cart)
            cart.increase(req.params.id)
            req.session.cart=cart
            res.send("Increase thành công")
            // res.redirect('/cart')
        } catch (e) {
            res.send("Increase thất bại")
            console.log(e)
            // res.redirect('/')
        }
})

router.put('/reduce/:id',(req,res)=>{
    try {
        const cart=new cartModel(req.session.cart)
        cart.reduce(req.params.id)
        req.session.cart=cart
        res.send("Reduce thành công")
        // res.redirect('/cart')
    } catch (e) {
        res.send("Reduce thất bại")
        console.log(e)
        // res.redirect('/')
    }
    

})

module.exports=router

