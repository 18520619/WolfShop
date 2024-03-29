const express=require('express')
const expressLayouts= require('express-ejs-layouts')
const indexRouter=require('./routes/index')
const categoryRouter=require('./routes/category')
const productRouter=require('./routes/product')
const cartRouter=require('./routes/cart')
const userRouter=require('./routes/user')
const methodOverride = require('method-override')
const session = require('express-session')
const mongoose=require('mongoose')
const flash = require('express-flash')
const passport = require('passport')
require("./models/passport.model")(passport)
require('dotenv').config()
const app=express()

const { connect }=require('mongodb')

const connectFunction=async()=>{
    try {
        // "mongodb://localhost/sports"
        await mongoose.connect(process.env.STR_CONNECT,{
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

app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: false, limit:'10mb'}))
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(flash());
app.set('layout','layouts/layout')
app.use(express.static('public'))


app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:  { maxAge: 60*60*1000}
  }))  //nên để trên
 
  app.use((req,res,next)=>{
     res.locals.session = req.session;
     next();
  })

app.use(passport.initialize())
app.use(passport.session())




console.log('hi')
app.use('/',indexRouter)
app.use('/category',categoryRouter)
app.use('/product',productRouter)
app.use('/cart',cartRouter)
app.use('/user',userRouter)
app.listen(process.env.PORT||3000)