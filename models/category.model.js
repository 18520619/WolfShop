const mongoose=require('mongoose')
const productModel=require('../models/product.model')
const categorySchema=new mongoose.Schema(
    {
        name:{type:String,require:true,
            default:"Dụng Cụ"},   
    },{
        timestamps:true
    }
)

categorySchema.pre('remove',async function(next){
    try {
        const products=await productModel.find({category:this.id})
        if(products.length>0){
            next(new Error("Không thể xóa !!"))
        }
    } catch (e) {
        next()
    }
})
module.exports=mongoose.model('category',categorySchema)