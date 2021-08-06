function cart(items_old){
    this.items= items_old || []
    this.add=function(product,id,imageSrc){
        if(this.items.findIndex(s => s.id === id)<0){
            this.items.push({id:id,item:product,imageSrc})
        }
    }

    this.delete=function(id){
        const index= this.items.findIndex(s => s.id === id)
        this.items.splice(index,1)
    }
}


module.exports=cart