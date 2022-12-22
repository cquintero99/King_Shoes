

function vistaPedidos(){
    $("#contenedor").load('tienda/pedidos.html')
    cargarPedidos()
}

function cargarPedidos(){
    let idTienda=sessionStorage.getItem("idTienda")
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
                console.log(talla.id)
                body+=
                `<tr>
                
                <td>${pedido_id}-${data[i].tienda_id}</td>
                <td>${talla.producto.nombre}</td>
                <td>${talla.talla.numero}</td>
                <td>${precio}</td>
                <td>${cantidad}</td>
                <td>${total}</td>
                <td>${data[i].estado}</td>
                </tr>
                `
                document.getElementById("tablaPedidosTienda").innerHTML=body
            })
            .catch(err=>{
                alert("error buscar talla")
            })
            
           
           
        }
        
        


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



                }
}