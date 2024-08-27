
function deleteProductFunc(id){
 const result =confirm('Are you sure you want to delete this product')
 if(result){
    fetch("/deleteProduct/"+id,{
        method: 'POST'      
    }).then(res=>{
        if(res.ok){
            location.reload()
        }
    })
 }
}