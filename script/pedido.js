function cargarPedido(){
    $("#contenedor").load('pedido/pedido.html')
    cargarDatosPedido();
    verProductosPedido();
}

function verProductosPedido(){
    fetch('http://localhost:8080/carrito/4/productos')
    .then(response=>response.json())
    .then(data=>cargarP(data))
    let body=''
    let total=0;
    const cargarP=(data)=>{
        for (let i = 0; i < data.length; i++) {
           
        body+=
        `
        <div class="card-mb-3 text-center" ">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="" class="img-fluid rounded-start p-2" id="${data[i].id}img${data[i].almacen.producto.id}" height="100px" width="80px" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">${data[i].almacen.producto.nombre}/Talla: ${data[i].almacen.talla.numero}</h5>
        <div class=" border-bottom border-dark"> 
         <p class="card-text"><small class="text-muted">Items: ${data[i].cantidad} Precio $ ${data[i].almacen.producto.precio} </small></p>
         <div class="text-end">
         <p class="card-text"><small class="text-muted">SubTotal $ ${data[i].total} </small></p>
         <div>
         </div>
      </div>
    </div>
  </div>
</div>
        `
        total+=data[i].almacen.producto.precio*data[i].cantidad
        cargarImgCarrito(data[i].id,data[i].almacen.producto.id)
        }
        body+=`
        <br>
        <div class="text-end  ">
        <br>
        <h3> Total $ ${total}</h3>
        <div>
        `
        document.getElementById("resumen").innerHTML=body;
    }
}
function cargarDatosPedido() {

    
    var body=''
    fetch('http://localhost:8080/carrito/4')
        .then(response => response.json())
        .then(carrito => rpedido(carrito))

    const rpedido = (carrito) => {
        console.log(carrito)
       
       

        body+= `
        <br>
        <div class="card">
  <h5 class="card-header text-end">
   <a href="#" type="button" class="btn text-end"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
   <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
   <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
 </svg></a>
  </h5>
  <div class="card-body">
    
    <h5 class="card-title">Identificacion</h5>
    <p class="card-text">Correo: ${carrito.usuario.correo}</p>
    <br>
    <p class="card-text">Nombre: ${carrito.usuario.nombre} ${carrito.usuario.apellido}</p>
    
    
  </div>
  <div class="card-footer text-muted">
    
    </div>
</div>
    
      <br>
      `




        fetch('http://localhost:8080/usuarios/'+carrito.usuario.id+'/direccion')
        .then(res=>res.json())
        .then(direccion=>verDireccion(direccion))
        
       const verDireccion=(direccion)=>{
        console.log(direccion)
        body+=
        `
        <div class="card ">
    <div class="card-header text-end">
    <a href="#" type="button" class="btn text-end"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
   <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
   <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
 </svg></a>
    </div>
    <div class="card-body">
    <h5 class="card-title">Envio</h5>
    <p class="card-text">${direccion[0].direccion} ${direccion[0].complemento} ${direccion[0].barrio}  </p>
    <br>
    <p>${direccion[0].municipio.municipio} ${direccion[0].municipio.departamento.departamento}  </p>
    <br>
    <p class="card-text">Telefono / Movil : ${direccion[0].telefono}</p>
    </div>
    
    <div class="card-footer text-muted">
    
    </div>
    </div>
    

    
        <br>
    <div class="card ">
    <div class="card-header">
    
    </div>
    <div class="card-body">
    <h5 class="card-title">Pago</h5>
    <p class="card-text">Medio de pago: CONTRA ENTREGA</p>
    </div>
    <div class="card-footer text-muted">
    
    </div>
    </div>
        `
        
       document.getElementById("infoPedido").innerHTML = body;
       }
       
    
    }


}