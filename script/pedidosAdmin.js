
function verPedidosAdmin(){

    $("#contenedor").load("/cuenta/pedidos.html")
    fetch('http://localhost:8080/pedidos')
        .then(response => response.json())
        .then(data => pedido(data))
        .catch(error => console.log(error))

}


function pedidosTienda(idTienda){
  
  $("#verPedidosTiendaAdmin").load('tienda/pedidos.html')
  verPedidosTienda(idTienda)
}
function tablaPedidosAdmin(idPedido){
  fetch('http://localhost:8080/pedidos/'+idPedido+'/productos')
  .then(response=>response.json())
  .then(productos=>{
    console.log(productos)
    let body=""

    for(let i=0;i<productos.length;i++){
      body+=
      `
      <p>${productos[i].id}</p>
      `
    }
    document.getElementById("pedido"+idPedido).innerHTML=body;

  })
 



}
/*
function mostrarPedidos(data){
    let body=``;
    for (let i = 0; i < data.length; i++) {
        console.log(data[i].id)
        body+=
        `
        <div class="accordion accordion-flush" id="accordionFlush${data[i].id}">
        <div class="accordion-item">

          <h2 class="accordion-header" id="flush-headingOne${data[i].id}">
            <button class="accordion-button collapsed" onclick="tablaPedidosAdmin(${data[i].id})" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne${data[i].id}" aria-expanded="false" aria-controls="flush-collapseOne${data[i].id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-shop" viewBox="0 0 16 16">
      <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
    </svg> : <h3> ${data[i].id}-${data[i].usuario_id} </h3>  
            </button>
          </h2>

          <div id="flush-collapseOne${data[i].id}" class="accordion-collapse collapse" aria-labelledby="flush-headingOne${data[i].id}" data-bs-parent="#accordionFlush${data[i].id}">
            <div class="accordion-body" id="pedido${data[i].id}" >
            
            
     
            </div>
          </div>
        
        </div>
      </div>
     
      
 

        `
       
    }
    document.getElementById("listaPedidosAdmin").innerHTML=body;
}
function cargarPedidos(idTienda){
   
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
                body+=
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

                
               
                
                    document.getElementById("tablaPedidosTienda"+idTienda).innerHTML=body
                    

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
*/