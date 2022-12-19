



function registrarUsuarioLogin() {

  //datos del usuario
  const fecha = new Date();
  var select = document.getElementById("selectGenero");
  var value = select.value;
  var sexo = select.options[select.selectedIndex].text;
  var cedula = document.getElementById("inputCedula").value;
  var nombre = document.getElementById("inputNombre").value;
  var apellido = document.getElementById('inputApellidos').value;
  var correo = document.getElementById('inputEmail').value;
  var contraseña = document.getElementById('inputPassword').value;
  var fechaNacimiento = document.getElementById('inputFecha').value;
  const newUser = {
    cedula: cedula,
    nombre: nombre,
    apellido: apellido,
    fecha_nacimiento: fechaNacimiento,
    correo: correo,
    contraseña: contraseña,
    sexo: sexo,
    id_estado: '1',
    id_rol: '2',
    fechaRegistro: fecha.toLocaleDateString()
  }
  //registro el usuario

  fetch('http://localhost:8080/usuarios/save', {
    method: 'POST',
    body: JSON.stringify(newUser),
    headers: {
      "Content-type": "application/json"
    }

  }).then(res => res.json())
    .then(user => {
      sessionStorage.setItem("cedulaUser", cedula)
      
      sessionStorage.setItem("tokenUser", JSON.stringify(user))
      registrarCarro()

    })

   



}
/*
  
 
  //registro el carrito
  
*/
function registrarCarro() {
  let cedula = sessionStorage.getItem("cedulaUser")

  fetch('http://localhost:8080/usuarios/' + cedula + '/cedula')
    .then(response => response.json())
    .then(u => rcarrito(u))
    .catch(error => console.log(error))
  let total = 0;
  let cantidad = 0;


  const rcarrito = (u) => {
    const carrito = {
      usuario: u,
      total,
      cantidad
    }
    console.log()
    fetch('http://localhost:8080/carrito/save', {
      method: 'POST',
      body: JSON.stringify(carrito),
      headers: {
        "Content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(carrito => {
        Swal.fire({
          icon: 'success',
          title: 'Kinshoes',
          text: '! Usuarios Registrado!',
          timer: 1500,
          footer: '<a href="../index.html">Why do I have this issue?</a>'
        })
      
        setTimeout(recargar, 1500);
        cargarDatosCarrito()
        
      })

  }
}
function verProductosCarro(){
  $("#contenedor").load('usuario/carrito.html')
    let id=sessionStorage.getItem("idCarrito");
    verProductosCarrito(id)
}
$("#btnCarrito").click(function (event) {
  $("#contenedor").load('usuario/carrito.html')
    let id=sessionStorage.getItem("idCarrito");
    verProductosCarrito(id)


})

function cargarImgCarrito(aux, id) {
  fetch('http://localhost:8080/files/view/archivos/' + id + '.jpg')
    .then(response => response.blob())
    .then(img => {

      let imagen = document.getElementById(aux + 'img' + id)
      imagen.src = URL.createObjectURL(img);
      imagen.onload = function (evt) {
        URL.revokeObjectURL(this.src);
      }
    })
    .catch(err => console.log(err))

}



function verProductosCarrito(id) {
  fetch('http://localhost:8080/carrito/' + id + '/productos')
    .then(response => response.json())
    .then(productos => mostrarCarrito(productos))

  const mostrarCarrito = (productos) => {
    let body = ``
    let body2 = ``
    let totalPagar = 0;
    let nProductos = 0;
    for (let i = 0; i < productos.length; i++) {
      body +=
        `
              <div class="card mb-3 border border-dark  " style="max-width: 650px;" id="cardCarrito${productos[i].id}">
                <div class="row g-0">
                          <div class="col-md-4 p-3" >
                          <img src="https://static.dafiti.com.co/p/nike-3840-3119402-1-zoom.jpg" height="180px"  id="${productos[i].id}img${productos[i].almacen.producto.id}" alt="" width="150px" alt="" />
                          
                          </div>
                  <div class="col-md-8">

                    <div class="card-body">
                    <div class="text-end">
                    <button class="btn btn-close text-bg-light" type="button" onclick="eliminarProductoCarrito(${productos[i].id})"></button>
                    </div>
                        <div class="row">
                        
                        <p class="card-title fw-bold fs-6">${productos[i].almacen.producto.nombre} Talla: ${productos[i].almacen.talla.numero}</p>
                        <div class="col">
                        <p class="card-text">Color: ${productos[i].almacen.producto.color}  -  Categoria: ${productos[i].almacen.producto.categoria.descripcion}</p>    
                        </div>
                        <div class="row justify-content-between">
                        
                        <div class="col-4">
                          <p class="card-text" >Items : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-seam" viewBox="0 0 16 16">
                          <path d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
                          </svg> ${productos[i].cantidad}</p>
                        </div>
                        <div class="col-8 text-end">
                          <p class="card-text ">Precio $ ${productos[i].almacen.producto.precio.toLocaleString('en')}</p>
                          </div>
                        </div>
                        <div class="row justify-content-between">
                      <div class="col-4">
                  <p class="card-text" > </p>
                </div>
                <div class="col-8 text-end">
                  <p class="card-text" >SubTotal $ ${productos[i].total.toLocaleString('en')}</p>
                </div>
              </div>
                  
                      </div>
                      </div>
                      </div>
                      <div class="card-footer text-center">
                      <p class="card-text"><small class="text-muted">Vendido y Envido por: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop" viewBox="0 0 16 16">
                      <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
                      </svg>  ${productos[i].almacen.producto.tienda.nombre}</small></p>
                      </div>
                    
                  </div>
                </div>
              </div>

                  `




      nProductos += productos[i].cantidad;
      totalPagar += productos[i].almacen.producto.precio * productos[i].cantidad;
      cargarImgCarrito(productos[i].id, productos[i].almacen.producto.id)

    }
    body2 +=
      `
                  <div class="col-md-10 offset-md-2 text-center   ">
                  <div class="text-bg-success p-2">
                  <button class="btn btn-success" onclick="cargarPedido()" ><h4>Realizar Pedido</h4></button>
                    </div>
                  
                  </div>
                  <br>

                  <div class="col-md-10 offset-md-2 text-center border border-dark ">
                  
                  
                  <div class="text-bg-dark colorBlack p-3">
                    
                    </div>
                

                <div class="text-center p-3">
                  <h3>Resumen Del Pedido</h3> 
                  <form id="fromResgistrarPedido">

                    <div class="row mb-3">
                      <p> N° de Productos : ${nProductos} </p>
                      <p>Costo de envio $ GRATIS</p>
                      <br>
                      <p>Total a pagar $ ${totalPagar.toLocaleString('en')} </p>
                      <p>Metodo de pago: CONTRA ENTREGA</p>
                      
                    </div>
                  
                    
                  </form>
                </div>
                <div class="text-bg-dark colorBlack p-3">
                  
                </div>
              </div>
                  
                  `
    document.getElementById("carritoP").innerHTML = body;
    document.getElementById("carritoI").innerHTML = body2;
  }
}
/*
<p class="card-text ">Categoria: ${productos[i].almacen.producto.categoria.descripcion}</p> 
*/


function eliminarProductoCarrito(id) {
  fetch('http://localhost:8080/carrito/productos/' + id, {
    method: 'DELETE'
  }).then(response => response.json())
    .then(data => console.log(data))
  document.getElementById('cardCarrito' + id).innerHTML = null;

  
  let etiquetaAudio = document.createElement("audio")
  etiquetaAudio.setAttribute("src", "/tono/tono.mp3")
  etiquetaAudio.play() 
  setTimeout(verProductosCarro,50)


}



function cargarListaUsuarios() {
  $("#contenedor").load('cuenta/admin.html')
  fetch('http://localhost:8080/usuarios')
    .then(response => response.json())
    .then(data => mostrarUsuarios(data))
    .catch(error => console.log(error))

  const mostrarUsuarios = (data) => {
    
    let body = ''
    for (let i = 0; i < data.length; i++) {
      body += `<tr> <th>${(i + 1)}</th><td>${data[i].id}</td> <td>${data[i].cedula}</td><td>${data[i].nombre}</td><td>${data[i].apellido}</td> <td>${data[i].correo}</td> <td>${data[i].sexo}</td> <td>${data[i].id_estado}</td>
                    <td>${data[i].fechaRegistro}</td>
                    <td>
                              <div class="dropup-center dropup">
                              <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Acciones
                              </button>
                              <ul class="dropdown-menu">
                              <li><a class="dropdown-item" href="#">Actualizar</a></li>
                              <li>
                              <a class="dropdown-item" href="#" >Cambiar Estado</a>
                              
                              </li>
                              <li><a class="dropdown-item" href="#">Eliminar </a></li>
                              </ul>
                              </div>
                              </td>
                    </tr>`

    }
    document.getElementById('dataUsuarios').innerHTML = body
  }
}







