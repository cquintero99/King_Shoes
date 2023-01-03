
function filtroColor(){
    //http://localhost:8080/categoria/hombre/productos/Negro/color
    let categoria=sessionStorage.getItem("categoria")
    let select=document.getElementById("selectColor")
    let color=select.options[select.selectedIndex].text;

    fetch('http://localhost:8080/categoria/'+categoria+'/productos/'+color+'/color')
    .then(response=>response.json())
    .then(data=>{
        verProductosTipo(data)
    })
    .catch(err=>{
        console.log("Error Filtro Tallas"+err)
    })
}

function filtroMarcas(){
     
    let categoria=sessionStorage.getItem("categoria")
    let select=document.getElementById("marcaFiltro")
    let marca=select.options[select.selectedIndex].text;

    console.log(categoria+" Marca"+marca)
    fetch('http://localhost:8080/categoria/'+categoria+'/productos/'+marca+'/marca')
    .then(response=>response.json())
    .then(data=>{
        verProductosTipo(data)
    })
    .catch(err=>{
        console.log("Error Filtro Tallas"+err)
    })
    
    
/*
    fetch('http://localhost:8080/categoria/hombre/productos/Supreme/marca')
    */
}
function filtroTallas(){
    let categoria=sessionStorage.getItem("categoria")
    let select=document.getElementById("tallasProducto")
    let talla=select.options[select.selectedIndex].text;
    fetch('http://localhost:8080/categoria/'+categoria+'/productos/'+talla+'/talla')
    .then(response=>response.json())
    .then(data=>verProductosTipo(data))
    .catch(err=>{
        console.log("Error Filtro Tallas"+err)
    })
    
    
}
function ordenarPrecio(){
    let categoria=sessionStorage.getItem("categoria")
    let select=document.getElementById("selectPrecio").value
    let precio="";
    if(select==1){
        precio="menor"
    }else
    if(select==2){
        precio="mayor"
    }
    //http://localhost:8080/categoria/hombre/productos/mayor/precio
    fetch('http://localhost:8080/categoria/'+categoria+'/productos/'+precio+'/precio')
    .then(res=>res.json())
    .then(data=>verProductosTipo(data))
    .catch(err=>{
        console.log("Error Ordenar precio"+err)
    })

}