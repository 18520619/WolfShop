// document.addEventListener('DOMContentLoaded', function(){
//     document.getElementById('year').innerHTML=new Date().getFullYear();
// })

document.getElementById('year').innerHTML = new Date().getFullYear()

const root=location.protocol+"//"+location.host
console.log(root)
$('.addCart').click(function(event){
    event.preventDefault()
    const href=this.href
    console.log(href)
    $.ajax({
        url:href,
        type:'GET',
        data:{},
        success:function(){
            swal ("Good job!", "You have successfully added ", "success");
            $("#numCart1").load(root+" #numCart2");
        }
      })
})

$('.reduceCart').click(function(event){
    event.preventDefault()
    const href=this.href
    const id=this.id
    const qty2="#qty2"+id
    // console.log(href) 
    $.ajax({
        url:href,
        type:'GET',
        data:{},
        success:function(){
            swal ("Good job!", "You have successfully reduced ", "success");
            $("#total1").load(root+"/cart #total2");
            $("#qty"+id).load(root+"/cart "+qty2);
        }
    })

})

$('.increaseCart').click(function(event){
    event.preventDefault()
    const href=this.href
    const id=this.id
    const qty2="#qty2"+id
    // console.log(href) 
    $.ajax({
        url:href,
        type:'GET',
        data:{},
        success:function(){
            swal ("Good job!", "You have successfully increased ", "success");
            $("#total1").load(root+"/cart #total2");
            $("#qty"+id).load(root+"/cart "+qty2);
        }
    })

})

$('.deleteCart').click(function(event){
    event.preventDefault()
    const action = $(this).attr('action')
    const href=root+action
    const tr_cart_id= "#tr_cart_"+ $(this).data("id")
    console.log(tr_cart_id)
    
    $.ajax({
        url:href,
        type:'post',
        data:{},
        success:function(){
            console.log("delete ok")
            $(tr_cart_id).empty();
            swal("Delete successful!", "continute!", "success");
            $("#total1").load(root+"/cart #total2");
            
        }
      })
})