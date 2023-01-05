function verPedidos(){
    let token=localStorage.getItem("JWT")
    let id=JSON.parse(sessionStorage.getItem("tokenUser")).id
    fetch('http://localhost:8080/usuarios/'+id+'/pedidos',{
        headers:{
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response=>response.json())
    .then(data=>{
        
       pedido(data)
        
    })
    .catch(err=>{
        alert("Error pedidos")
    })
}
function pedido(data){
    if(data.length>=1){
        let body=``
    for (let i = 0; i < data.length; i++){
      body+=
      `<div class="col ">
     <div class="card border-light mb-3 " style="width: 21rem;">
    
     <div class="card-body text-center">
      <h5 class="card-title fw-bolder">PEDIDO #${data[i].id}-${data[i].usuario_id}</h5>
     <a href="#" type="button" data-bs-toggle="modal" data-bs-target="#exampleModal3" onclick="detallePedido(${data[i].id})">Ver detalles</a>
     <br>
      <p class="card-text">Metodo de pago: ${data[i].metodoPago}</p>
      <br>
      <p class="card-text">Numero de productos: ${data[i].numero_productos}</p>
      <br>
      <p class="card-text">Total: ${data[i].total.toLocaleString('en')} </p>
      <br>
      <p class="card-text fw-bolder">${data[i].fecha} </p>
     </div>
    
</div>
</div>

<br>
      `

    }
    document.getElementById('contenedorPedidos').innerHTML=body
}else{
    body=`<h3>Vacio....</h3>`
    document.getElementById('contenedorPedidos').innerHTML=body
   // alert("no tienes pedidos ")
}
}

function detallePedido(id){
    var body=
    `
    `
    fetch('http://localhost:8080/pedidos/'+id+'/productos')
    .then(response=>response.json())
    .then(data=>{
       
       
        for( let i=0;i<data.length;i++){
            let precio=data[i].precio
            let cantidad=data[i].cantidad
            let total=precio*cantidad
            let estado=data[i].estado
            let idTalla=data[i].almacen_id

           
            fetch('http://localhost:8080/almacen/'+idTalla)
            .then(res=>res.json())
            .then(talla=>{
                body+=
                `<tr>
                <td >   <img src="https://static.dafiti.com.co/p/nike-3840-3119402-1-zoom.jpg" onclick="cargarProducto(${talla.producto.id})" id="${talla.id}img${talla.producto.id}"  data-bs-dismiss="modal"  alt="" width="50px" height="50px">
                </td>
                <td >${talla.producto.nombre}</td>
                <td>${talla.talla.numero}</td>
                <td>${precio.toLocaleString('en')}</td>
                <td>${cantidad}</td>
                <td>${total}</td>
                <td>${estado}</td>
                 </tr>   
                `
                cargarImgCarrito(talla.id,talla.producto.id)
                
                document.getElementById("detallePedido").innerHTML=body
            })
            .catch(err=>{
                alert("error buscar  talla")
            })
             
            
             
           
             
            
        }
        

    })
    .catch(err=>{
        alert("Error pedidos")
    })
    
}

