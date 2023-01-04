function verPedidosTienda(){
    
    let idTienda=sessionStorage.getItem("idTienda")
    fetch('http://localhost:8080/tiendas/'+idTienda+'/lista/pedidos')
    .then(response=>response.json())
    .then(data=>{
        let contenedor=""
        for(let i=0;i<data.length;i++){
        let idPedido=data[i].id
        contenedor+=
        `
        <div class="accordion accordion-flush" id="accordionFlushExample${idPedido}">
<div class="accordion-item">
<h2 class="accordion-header" id="flush-headingOne"${idPedido}>
<button class="accordion-button collapsed" onclick="mostrarProductosPedido(${idPedido})" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne${idPedido}" aria-expanded="false" aria-controls="flush-collapseOne${idPedido}">
PEDIDO # 00-${data[i].id}  FECHA: ${data[i].fecha}  
</button>
</h2>
<div id="flush-collapseOne${idPedido}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne${idPedido}" data-bs-parent="#accordionFlushExample${idPedido}">
<div class="accordion-body">
<div class="overflow-scroll">



            <table class="table">
                <thead class="table-dark">
                    <tr>
                        <th>#Pedido</th>
                        <th>Nombre</th>
                        <th>Talla</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="tablaPedidosTienda${data[i].id}">
    
                </tbody>
            </table>
        </div>
</div>
</div>
</div>
</div>
        `

        }
        document.getElementById("newPedidos").innerHTML=contenedor
        
    })
    .catch(err=>{
        console.log(err)
    })
}
function mostrarProductosPedido(idPedido){
    let idTienda=sessionStorage.getItem("idTienda")
    fetch('http://localhost:8080/tiendas/'+idTienda+'/pedido/'+idPedido+'/productos')
    .then(response=>response.json())
    .then(data=>{
        let body=``
        for(let i=0;i<data.length;i++){
            let precio=data[i].precio
            let cantidad=data[i].cantidad
            let total=precio*cantidad
            let pedido_id=data[i].pedido_id
            let idTalla=data[i].almacen_id
            fetch('http://localhost:8080/almacen/'+idTalla)
            .then(res=>res.json())
            .then(talla=>{
                body+=
                `<tr>
                
                <td>00-${pedido_id}-${data[i].tienda_id}-${idTalla}</td>
                <td>${talla.producto.nombre}</td>
                <td>${talla.talla.numero}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>${total}</td>
                <td>${data[i].estado}</td>
                <td> <button class="btn btn-warning">Actualizar Estado</button></td> 
                </tr>
                `

                
               
                    document.getElementById("tablaPedidosTienda"+idPedido).innerHTML=body
                    

            })
            .catch(err=>{
                console.log(err)
            })
            
           
           
        }
        
    })
    .catch(err=>{
        console.log(err)
    })

}

function vistaPedidos(){
    let idTienda=sessionStorage.getItem("idTienda")
    $("#contenedor").load('tienda/pedidos.html')
   // cargarPedidos(idTienda,1)
   verPedidosTienda()
}

function cargarPedidos(idTienda,indicador){
   
    if(idTienda>=1){
    fetch('http://localhost:8080/tiendas/'+idTienda+'/pedidos')
    .then(response=>response.json())
    .then(data=>{
        let body=``
        for(let i=0;i<data.length;i++){
            let precio=data[i].precio
            let cantidad=data[i].cantidad
            let total=precio*cantidad
            let pedido_id=data[i].pedido_id
            let idTalla=data[i].almacen_id
            fetch('http://localhost:8080/almacen/'+idTalla)
            .then(res=>res.json())
            .then(talla=>{
                body=
                `<tr>
                
                <td>00-${pedido_id}-${data[i].tienda_id}</td>
                <td>${talla.producto.nombre}</td>
                <td>${talla.talla.numero}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>${total}</td>
                <td>${data[i].estado}</td>
                <td> <button class="btn btn-warning">Actualizar Estado</button></td> 
                </tr>
                `

                
               
                if(indicador==1){
                    document.getElementById("tablaPedidosTienda").innerHTML+=body
                  
                }else{
                    document.getElementById("tablaPedidosTienda"+idTienda).innerHTML+=body
                    }

            })
            .catch(err=>{
                console.log(err)
            })
            
           
           
        }
        //verPedidosTienda()
        
       
        
        


    })
    .catch(err=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al cargar pedidos!',
            timer: 1500,
            footer: '<p class="fw-bolder" >King Shoes CO</p>'
          })
    })



                }else{
                    alert("no sirve")
                }
}