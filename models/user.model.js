const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    name:String,
    email:String,
    level:{type:String , default:"0"} ,
    password:String,
    imageType:{type:String},
    imageData:{type:Buffer}
},{timestamps:true})

userSchema.virtual('imageSrc').get(function(){
    if(this.imageType !=null && this.imageData !=null)
       return `data:${this.imageType};charset=utf-8;base64,${this.imageData.toString('base64')}`
   })
module.exports=mongoose.model('user',userSchema)