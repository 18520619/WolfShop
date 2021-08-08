function cart(items_old){
    this.items= items_old || []
    this.priceTotal= 0
    this.add=function(product,id,imageSrc){
        if(this.items.findIndex(s => s.id === id)<0){
            this.items.push({id:id,qty:1,item:product,imageSrc})
        }else{
            this.items[index].qty++
        }
        this.price()
    }

    this.delete=function(id){
        const index= this.items.findIndex(s => s.id === id)
        this.items.splice(index,1)
    }
    
    this.increase = function(id){
        const index= this.items.findIndex(s=> s.id === id)
        this.items[index].qty++ 
    }

    this.reduce = function(id){
        const index= this.items.findIndex(s=> s.id === id)
        this.items[index].qty--
        if(this.items[index].qty<=0){
            this.items.splice(index,1)
        }
    }

    this.price = function(){
        const index= this.items.findIndex(s=> s.id === id)
        let temp = 0
        if(this.items[index].price){
            temp += this.items.price *  this.items[index].qty
        }
        this.priceTotal=temp
        
    } 


}


module.exports=cart