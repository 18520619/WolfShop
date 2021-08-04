const express=require('express')
const expressLayouts= require('express-ejs-layouts')
const indexRouter=require('./routes/index')
const categoryRouter=require('./routes/category')
const productRouter=require('./routes/product')
const methodOverride = require('method-override')
const mongoose=require('mongoose')
const app=express()

const { connect }=require('mongodb')

const connectFunction=async()=>{
    try {
        await mongoose.connect("mongodb://localhost/sports",{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        console.log('Connect Successfully')
    } catch (e) {
        console.log(e)
        console.log('Connect Failed')
    }
}
connectFunction()
console.log('hi')
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false, limit:'10mb'}))
app.set('view engine', 'ejs');

app.use(expressLayouts);

app.set('layout','layouts/layout')
app.use(express.static('public'))
app.use('/category',categoryRouter)
app.use('/product',productRouter)
app.use('/',indexRouter)
app.listen(3000)