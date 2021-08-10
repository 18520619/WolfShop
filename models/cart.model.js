function cart(carts_old){
    this.items= carts_old.items || []
    this.priceTotal= carts_old.priceTotal||0
    this.add=function(product,id,imageSrc){
        const index= this.items.findIndex(s => s.id === id)
        if(index<0){
            this.items.push({id:id,qty:1,item:product,imageSrc})
        }else{
            this.items[index].qty++
        }
        this.priceTotal+= product.price
    }

    this.delete=function(id){
        const index=this.items.findIndex(s => s.id === id)
        this.priceTotal-=this.items[index].item.price*this.items[index].qty
        this.items.splice(index,1);
        console.log("delete model")
        
    }
    
    this.increase=(id)=>{
        const index=this.items.findIndex(s => s.id === id)
        this.priceTotal+=this.items[index].item.price
        this.items[index].qty++
    }

    this.reduce=(id)=>{
        const index=this.items.findIndex(x => x.id === id)
        this.priceTotal-=this.items[index].item.price
        this.items[index].qty--
        if(this.items[index].qty<=0){
            this.items.splice(index,1)
        }
    }

    // this.price = function(){
    //     const index= this.items.findIndex(s=> s.id === id)
    //     let temp = 0
    //     if(this.items[index].price){
    //         temp += this.items.price *  this.items[index].qty
    //     }
    //     this.priceTotal=temp
        
    // } 


}


module.exports=cart