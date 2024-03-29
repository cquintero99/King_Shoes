//Carga perfil cuando se completa un pedido
function perfilPedido() {
  $("#contenedor").load('login/perfil.html')
  Swal.fire({
    icon: 'success',
    title: 'FELICIDADES',
    text: "pedido creado con exito",
    timer: 1000,
    footer: '<p class="fw-bolder" >King Shoes CO</p>'
  })
}

//Funcion para registrar un pedido
function realizarPedido() {
  if (sessionStorage.getItem("direccion") == "si" || sessionStorage.getItem("idDir") >= 1) {


    let idUser = JSON.parse(sessionStorage.getItem("tokenUser")).id
    let idDir = sessionStorage.getItem("idDir")
    const fecha = new Date();
    let idCarrito = sessionStorage.getItem("idCarrito")
    //Creo el objecto pedido
    const pedido = {
      usuario_id: idUser,
      direccion_id: idDir,
      numero_productos: 0,
      total: 0,
      fecha: fecha.toLocaleDateString(),
      metodoPago: "Contra Entrega"
    }

    //Busco los productos del carrito  
    let token=localStorage.getItem("JWT")
    fetch('http://localhost:8080/carrito/' + idCarrito + '/productos',{
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
      .then(response => response.json())
      .then(data => {

        //Creo el pedido
        fetch('http://localhost:8080/pedidos/save', {
          method: 'POST',
          body: JSON.stringify(pedido),
          headers: {
            "Content-type": "application/json"
          }
        }).then(response => response.json())
          .then(newPedido => {

            let total = 0;
            let items = 0;
            let numProductos = 0;

            for (let i = 0; i < data.length; i++) {
              total += data[i].total
              items += data[i].cantidad
              //Creo el productoPedido
              const productoPedido = {
                pedido_id: newPedido.id,
                almacen_id: data[i].almacen.id,
                cantidad: data[i].cantidad,
                tienda_id: data[i].almacen.producto.tienda.id,
                precio: data[i].almacen.producto.precio,
                estado: "En proceso",
                fecha_pedido: fecha.toLocaleDateString()

              }
              //Registro los productos del pedido
              fetch('http://localhost:8080/pedido/almacen/save', {
                method: 'POST',
                body: JSON.stringify(productoPedido),
                headers: {
                  "Content-type": "application/json"
                }
              })
                .then(response => response.json())
                .then(newProductoPedido => {
                  //si se registra producto lo elimino del carrito del usuario
                  numProductos++;
                  let token=localStorage.getItem("JWT")
                  fetch('http://localhost:8080/carrito/productos/' + data[i].id, {
                    method: 'DELETE',
                    headers:{
                      'Authorization': 'Bearer ' + token
                    }
                  }).then(response => response.json())
                    .then(data => console.log("carrito vacio producto" + data))


                })
                .catch(err => {
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
            //si todos los productos se registran con exito 
            if (numProductos = data.length) {
              //Actualizo los datos del peiddo 
              const Currentpedido = {
                usuario_id: idUser,
                direccion_id: idDir,
                numero_productos: items,
                total: total,
                metodoPago: "Contra Entrega"
              }
              //Actualizo los datos  del pedido
              fetch('http://localhost:8080/pedidos/' + newPedido.id, {
                method: 'PUT',
                body: JSON.stringify(Currentpedido),
                headers: {
                  "Content-type": "application/json"
                }
              })
                .then(response => response.json())
                .then(actualizado => {
                  //Mensaje de pedido aceptado y actualizado
                  let timerInterval
                  Swal.fire({
                    icon: 'info',
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


                  setTimeout(perfilPedido, 2500);
                })
                .catch(err => {
                  //Eliminar el pedido  por que ocurrio un error al actualizar
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


            } else {
              //no se registraron todos los productos
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
          .catch(err => {
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
      .catch(err => {
        //error buscar productos carrito
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se cargaron los producto del carrito!',
          timer: 1500,
          footer: '<p class="fw-bolder" >King Shoes CO</p>'
        })
      })


  } else {
    //no tiene direccion 
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Primero tienes que registrar una direccion !',
      timer: 1500,
      footer: '<p class="fw-bolder" >King Shoes CO</p>'
    })

  }


}

//Carga la informacion del pedido que se va a realizar 
function cargarPedido() {
  $("#contenedor").load('pedido/pedido.html')
  cargarDatosPedido();
  verProductosPedido();
}

var idCarrito = sessionStorage.getItem("idCarrito")


function verProductosPedido() {
  let token=localStorage.getItem("JWT")
  fetch('http://localhost:8080/carrito/' + idCarrito + '/productos',{
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
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
    <div class="col-md-4" >
      <img src="" class="img-fluid rounded-start p-2" onclick="cargarProducto(${data[i].almacen.producto.id})" id="${data[i].id}img${data[i].almacen.producto.id}" height="100px" width="80px" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
      <p class="card-title fw-bold fs-6">${data[i].almacen.producto.nombre}-Talla: ${data[i].almacen.talla.numero}</p>
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

  let token=localStorage.getItem("JWT")
  var body = ''
  fetch('http://localhost:8080/carrito/' + idCarrito,{
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => response.json())
    .then(carrito => rpedido(carrito))

  const rpedido = (carrito) => {




    body += `
        <br>
        <div class="card border border-dark">
  
  <div class="card-body ">
    
    <h5 class="card-title fw-bolder">Identificacion</h5>
    <p class="card-text">Correo: ${carrito.usuario.correo}</p>
    <br>
    <p class="card-text">Nombre: ${carrito.usuario.nombre} ${carrito.usuario.apellido}</p>
    
    
  </div>
  
</div>
    
      <br>
      `



    let token=localStorage.getItem("JWT")
    fetch('http://localhost:8080/usuarios/' + carrito.usuario.id + '/direccion',{
      headers:{
        'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(direccion => verDireccion(direccion))
      .catch(err => {
        body += `<h3><a href="#" onclick="cargarPerfil()">Agregar una direccion +</a></h3>`
        document.getElementById("infoPedido").innerHTML = body;
      })

    const verDireccion = (direccion) => {
      sessionStorage.setItem("idDir", direccion[0].id)
      body +=
        `
        <div class="card border border-dark">
    
    <div class="card-body">
    <h5 class="card-title fw-bolder">Envio</h5>
    <p class="card-text">${direccion[0].direccion} ${direccion[0].complemento} ${direccion[0].barrio}  </p>
    <br>
    <p>${direccion[0].municipio.municipio} ${direccion[0].municipio.departamento.departamento}  </p>
    <br>
    <p class="card-text">Telefono / Movil : ${direccion[0].telefono}</p>
    </div>
    
    
    </div>
    

    
        <br>
    <div class="card border border-dark">
    
    <div class="card-body">
    <h5 class="card-title fw-bolder">Pago</h5>
    <p class="card-text">Medio de pago: CONTRA ENTREGA</p>
    </div>
    
    </div>
        `

      document.getElementById("infoPedido").innerHTML = body;
    }


  }


}