function perfilPedido(){
  $("#contenedor").load('login/perfil.html')
  Swal.fire({
    icon: 'success',
    title: 'FELICIDADES',
    text: "pedido creado con exito",
    timer: 1000,
    footer: '<p class="fw-bolder" >King Shoes CO</p>'
  })
}
function realizarPedido(){
  if(sessionStorage.getItem("direccion")=="si" || sessionStorage.getItem("idDir")>=1){

  
  let idUser=JSON.parse(sessionStorage.getItem("tokenUser")).id
  let idDir=sessionStorage.getItem("idDir")
  const fecha = new Date();
  let idCarrito=sessionStorage.getItem("idCarrito")
  const pedido={
    usuario_id:idUser,
    direccion_id:idDir,
    numero_productos:0,
    total:0,
    fecha:fecha.toLocaleDateString(),
    metodoPago:"Contra Entrega"
  }
  
    //Busco los productos del carrito  
    fetch('http://localhost:8080/carrito/'+idCarrito+'/productos')
    .then(response=>response.json())
    .then(data=>{
      
      //Creo el pedido
      fetch('http://localhost:8080/pedidos/save',{
       method:'POST',
      body:JSON.stringify(pedido),
       headers:{
      "Content-type": "application/json"
       }
      }).then(response=>response.json())
      .then(newPedido=>{
    
    let total=0;
    let items=0;
    let numProductos=0;

    for(let i=0;i<data.length;i++){
      total+=data[i].total
      items+=data[i].cantidad
      const productoPedido={
        pedido_id:newPedido.id,
        almacen_id:data[i].almacen.id,
        cantidad:data[i].cantidad,
        tienda_id:data[i].almacen.producto.tienda.id,
        precio:data[i].almacen.producto.precio,
        estado:"En proceso",
        fecha_pedido:fecha.toLocaleDateString()

      }
      //Registro los productos del pedido
      fetch('http://localhost:8080/pedido/almacen/save',{
        method:'POST',
        body:JSON.stringify(productoPedido),
        headers:{
          "Content-type":"application/json"
        }
      })
      .then(response=>response.json())
      .then(newProductoPedido=>{
        //si se registra producto
        numProductos++;
        fetch('http://localhost:8080/carrito/productos/' + data[i].id, {
         method: 'DELETE'
         }).then(response => response.json())
         .then(data => console.log("carrito vacio producto"+data))
        
          
      })
      .catch(err=>{
        //error al registrar un pruducto
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se puedo registrar un producto!',
          timer: 1500,
          footer: '<p class="fw-bolder" >King Shoes CO</p>'
        })
        console.log("no se pudo registrar verificar ")
      })

    }
    if(numProductos=data.length){
      const Currentpedido={
        usuario_id:idUser,
        direccion_id:idDir,
        numero_productos:items,
        total:total,
        metodoPago:"Contra Entrega"
      }
      //Actualizo el precio del pedido
      fetch('http://localhost:8080/pedidos/'+newPedido.id,{
        method:'PUT',
        body:JSON.stringify(Currentpedido),
        headers:{
          "Content-type":"application/json"
        }
      })
      .then(response=>response.json())
      .then(actualizado=>{
        let timerInterval
        Swal.fire({
          icon:'info',
          title: 'Creando Pedido!',
          html: 'Esto tarda : <b></b> milliseconds.',
          timer: 2500,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
          }
        })
        
        
        setTimeout(perfilPedido,2500);
      })
      .catch(err=>{
        console.log("Eliminar pedido si sucede este error ")
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Error en el ultimo paso!',
          timer: 1500,
          footer: '<p class="fw-bolder" >King Shoes CO</p>'
        })
        console.log("error actualizar pedido precio")
      })

      
    }else{
      console.log("falta agregar funcionalidad eliminar pedido y volver a llenar el carrito ")
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Datos Incorrectos!',
        timer: 1500,
        footer: '<p class="fw-bolder" >King Shoes CO</p>'
      })
    }
    


  })
  .catch(err=>{
    //no se registra el pedido
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'No se puedo registrar el pedido !',
      timer: 1500,
      footer: '<p class="fw-bolder" >King Shoes CO</p>'
    })
  })
  




      
    })
    .catch(err=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No se cargaron los producto del carrito!',
        timer: 1500,
        footer: '<p class="fw-bolder" >King Shoes CO</p>'
      })
    })

  
  }else{
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Primero tienes que registrar una direccion !',
      timer: 1500,
      footer: '<p class="fw-bolder" >King Shoes CO</p>'
    })

  }
  
  
}

function cargarPedido() {
  $("#contenedor").load('pedido/pedido.html')
  cargarDatosPedido();
  verProductosPedido();
}

var idCarrito=sessionStorage.getItem("idCarrito")
function verProductosPedido() {
  
  fetch('http://localhost:8080/carrito/'+idCarrito+'/productos')
    .then(response => response.json())
    .then(data => cargarP(data))
  let body = ''
  let total = 0;
  const cargarP = (data) => {
    for (let i = 0; i < data.length; i++) {

      body +=
        `
        <div class="card-mb-3 text-center" ">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="" class="img-fluid rounded-start p-2" id="${data[i].id}img${data[i].almacen.producto.id}" height="100px" width="80px" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <p class="card-title fw-bold fs-6">${data[i].almacen.producto.nombre}/Talla: ${data[i].almacen.talla.numero}</p>
        <div class=" border-bottom border-dark"> 
         <p class="card-text"><small class="text-muted">Items: ${data[i].cantidad} Precio $ ${data[i].almacen.producto.precio.toLocaleString('en')} </small></p>
         <div class="text-end">
         <p class="card-text"><small class="text-muted">SubTotal $ ${data[i].total.toLocaleString('en')} </small></p>
         <div>
         </div>
      </div>
    </div>
  </div>
</div>
        `
      total += data[i].almacen.producto.precio * data[i].cantidad
      cargarImgCarrito(data[i].id, data[i].almacen.producto.id)
    }
    body += `
        <br>
        <div class="text-end  ">
        <br>
        <h3> Total $ ${total.toLocaleString('en')}</h3>
        <div>
        `
    document.getElementById("resumen").innerHTML = body;
  }
}
function cargarDatosPedido() {


  var body = ''
  fetch('http://localhost:8080/carrito/'+idCarrito)
    .then(response => response.json())
    .then(carrito => rpedido(carrito))

  const rpedido = (carrito) => {
    



    body += `
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




    fetch('http://localhost:8080/usuarios/' + carrito.usuario.id + '/direccion')
      .then(res => res.json())
      .then(direccion => verDireccion(direccion))
      .catch(err=>{
        body+=`<h3><a href="#" onclick="cargarPerfil()">Agregar una direccion +</a></h3>`
        document.getElementById("infoPedido").innerHTML = body;
      })

    const verDireccion = (direccion) => {
      sessionStorage.setItem("idDir",direccion[0].id)
      body +=
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