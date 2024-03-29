const express=require('express')
const categoryModel=require('../models/category.model')
const router=express.Router()

router.get('/',async(req,res)=>{
    try {
        const categories=await categoryModel.find()
        res.render('categories/list',{categories:categories})
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
   
})

router.get('/add',async(req,res)=>{
    const category= new categoryModel()
    res.render('categories/add',{category:category})
})

router.post('/',async(req,res)=>{
    try {
        const categoryNew = new categoryModel({
            name:req.body.name
        })
        await categoryNew.save()
        res.redirect('/category')
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
    
})

router.delete('/delete/:id',async(req,res)=>{
    try {
        const categoryDel=await categoryModel.findById(req.params.id)
        await categoryDel.remove()
        res.redirect('/category')
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})

router.get('/edit/:id',async(req,res)=>{
    try {
        const category = await categoryModel.findById(req.params.id)
        res.render('categories/edit',{category:category})
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})
router.put('/edit/:id',async(req,res)=>{
    try {
        const cate= await categoryModel.findById(req.params.id)
        cate.name=req.body.name
        await cate.save()
        res.redirect('/category')
    } catch (e) {
        console.log(e)
        res.redirect('/')
    }
})


module.exports=router