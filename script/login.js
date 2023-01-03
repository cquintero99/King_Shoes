var urlLogin='http://localhost:8080/login';
var urlUsuarioCorreo='http://localhost:8080/usuarios/correo/';
var urlUsuario='http://localhost:8080/usuarios/';
var urlTiendaUsuario='http://localhost:8080/tiendas/usuario/';

const btnEntrar=document.getElementById("btnInicioSecion");
localStorage.setItem("aux","0")
btnEntrar.addEventListener("click",function(){
    let email=document.getElementById('inputEmailInicio').value
    let password=document.getElementById('inputPasswordInicio').value
   
    const data={
        email:email,
        password:password
    }

    //console.log(JSON.stringify(data))
    fetch(urlLogin, {
        
        crossDomain:true,
        method: 'POST',
        
        headers: {
        'Content-type':'application/json Access-Control-Request-Method',
        'Access-Control-Allow-Headers':'Authorization',
        'Access-Control-Request-Method': 'POST'
    },
    
        body: JSON.stringify(data),
        cache:'no-cache'
      })
        .then(response => response.text())
        
        .then(JWT => {
          if(JWT!=null){
            let token=localStorage.getItem("JWT")
              localStorage.setItem("aux","1")
              localStorage.setItem("JWT",JWT)
              sessionStorage.setItem("idDir","")
              sessionStorage.setItem("direccion","")
              fetch(urlUsuarioCorreo+email)
              .then(response=>response.json())
              .then(user=>{
                  sessionStorage.setItem("tokenUser",JSON.stringify(user))
                 cargarDatosCarrito()
             
                 Swal.fire({
                  icon: 'success',
                  title: 'Bienvenido',
                  text: user.nombre+" "+user.apellido,
                  timer: 1000,
                  footer: '<p class="fw-bolder" >King Shoes CO</p>'
                })
              
                setTimeout(recargar, 1000);
                setTimeout(perfil,1200);
                
               
              })
              
          }else{
             
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Datos Incorrectos!',
                timer: 1500,
                footer: '<p class="fw-bolder" >King Shoes CO</p>'
              })
          }
        

          /*
           
          
          const tokenInfo = this.state.token;
          if (tokenInfo !== undefined) {
            alert("No sirve")
          }
        */})
        .catch(err=>{
          console.log(err)
        })
        
  
    
})



function recargar(){
  location.reload();
  
}
function perfil(){
  $("#contenedor").load('login/perfil.html')
}

function cargarDatosCarrito(){
  let token=localStorage.getItem("JWT")
  let idUser = JSON.parse(sessionStorage.getItem("tokenUser")).id;
  fetch(urlUsuario + idUser + '/carrito',{
    headers:{
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => response.json())
    .then(carrito => {
      
      sessionStorage.setItem("idCarrito", carrito[0].id)
     // verProductosCarrito(carrito[0].id);
    })
    .catch(err=>{
      alert("inicie sesion")
    })
}

if(sessionStorage.getItem("tokenUser")!=""){
   
var rolUser=JSON.parse(sessionStorage.getItem("tokenUser")).id_rol;
var idUser=JSON.parse(sessionStorage.getItem("tokenUser")).id;
 


if(rolUser!=0){
    cambiarMenu(rolUser)
    
}
}

function cambiarMenu(rol){
    if(rol==1){
       

        let body1=
        `
        <li>
        <button type="button " class="btn"><a class="dropdown-item" href="#" id="cuentaPerfil" onclick="cargarPerfil()">Perfil
          </a>
        </button>

      </li>
        <li>
        <button type="button " class="btn"><a class="dropdown-item" href="#" id="cuentaTienda" onclick="cargarMenuT(${idUser})">Tienda
          </a>
        </button>

      </li>
      <li>
        <button type="button " class="btn"><a class="dropdown-item" href="#" id="cuentaAdmin" onclick="cargarMenuAdmin()">Admin
          </a>
        </button>

      </li>
      <li>
      <button type="button " class="btn"><a class="dropdown-item" href="#" id="cuentaCerrar">Cerrar Sesion
        </a>
      </button>

    </li>
        `
     document.getElementById('btnMenuCambio').innerHTML=body1;
    }else{
        
        let body2=
        `
        <li>
        <button type="button " class="btn"><a class="dropdown-item" href="#" id="cuentaPerfil" onclick="cargarPerfil()">Perfil
          </a>
        </button>

      </li>
        <li>
        <button type="button " class="btn"><a class="dropdown-item" href="#" id="cuentaTienda" onclick="cargarMenuT(${idUser})">Tienda
          </a>
        </button>

      </li>
    
      <li>
      <button type="button " class="btn"><a class="dropdown-item" href="#" id="cuentaCerrar" onclick="cerrarSesion()">Cerrar Sesion
        </a>
      </button>

    </li>
        `
     document.getElementById('btnMenuCambio').innerHTML=body2;

    }
    
}

function cerrarSesion(){
  eventoCerrar();
}

const btnCerrar=document.getElementById("cuentaCerrar")

btnCerrar.addEventListener("click",function(){
  eventoCerrar();
})
function eventoCerrar(){
  localStorage.clear()
  sessionStorage.clear()
  let timerInterval
Swal.fire({
  icon:'info',
  title: 'Cerrando Cession!',
  html: 'Saliendo en : <b></b> milliseconds.',
  timer: 500,
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
setTimeout(recargar, 500);
}




function cargarMenuT(idUser){
    fetch(urlTiendaUsuario+idUser)
        .then(response=>response.json())
        .then(tienda=>{
          sessionStorage.setItem("idTienda",tienda.id)
           
           
                $("#menu").load('tienda/menuTienda.html')
                $("#contenedor").load('tienda/producto.html') 
               
                setTimeout(verFormularioProducto,50)

            
        })
        .catch(error=>{
            $("#contenedor").load('tienda/tienda.html')
        })
  
}

function cargarMenuAdmin(){
    
        $("#contenedor").load('cuenta/index.html')
        $("#menu").load('cuenta/menuAdmin.html')
    
    

}
function verFormularioProducto(){
  cargarCategorias();
  cargarMarcas();
}
function formularioProducto(){
  let body=`<div class="container p-2" id="fp">
  <div class="row   " >

      <div class="col text-center  ">
          <div class="border border-dark" >
          <div class="text-bg-dark colorBlack p-3"> Formulario Producto</div>
          <div class="text-bg-light p-3">
            

              <form class="form" enctype="multipart/form-data" >
                  <div class="row mb-3">
                      <label for="inputCategoria" class="col-sm-2 col-form-label">Categoria</label>
                      <div class="col-sm-10">
                          <select class="form-select" aria-label="Default select example" id="categoriaP">
                              <option selected>Seleciona una Categoria</option>
                              <option value="1">Otra</option>


                          </select>
                      </div>
                  </div>
                  <div class="row mb-3">
                      <label for="inputNombreP" class="col-sm-2 col-form-label">Nombre</label>
                      <div class="col-sm-10">
                          <input type="text" class="form-control" id="inputNombreP" required>
                      </div>
                  </div>
                  <div class="row mb-3">
                      <label for="inputColor" class="col-sm-2 col-form-label"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16">
                          <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
                          <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/>
                        </svg>
                        Color</label>
                      <div class="col-sm-10">
                          <select class="form-select" id="colorP">
                              <option selected>Seleciona un color</option>
                              <option value="1">Negro</option>
                              <option value="2">Blanco</option>
                              <option value="3">Azul</option>
                              <option value="4">Rojo</option>
                              <option value="5">Verde</option>
                              <option value="6">Gris</option>
                          </select>
                      </div>
                  </div>
                  <div class="row mb-3">
                      <label for="inputMarca" class="col-sm-2 col-form-label">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags" viewBox="0 0 16 16">
                              <path d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z"/>
                              <path d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z"/>
                            </svg>
                             Marca:</label>
                      <div class="col-sm-10">
                          <select class="form-select" aria-label="Default select example" id="marcaP">


                          </select>
                      </div>
                  </div>
                  <div class="row mb-3">
                      <label for="inputPrecioP" class="col-sm-2 col-form-label">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                              <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                              <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                              <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                              <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                              </svg>
                              Precio</label>
                      <div class="col-sm-10">
                          <input type="number" class="form-control" id="inputPrecioP" required>
                      </div>
                  </div>
                  <div class="row mb-3">
                      <label for="inputImgP" class="col-sm-2 col-form-label">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-image" viewBox="0 0 16 16">
                              <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                              <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z"/>
                            </svg>
                             Imagen:</label>
                      <div class="col-sm-6">
                          <input type="file" class="form-control" id="inputImgP" required>
                          
                      </div>
                      <div class="col-sm-4">
                          <button class="btn btn-primary" style="display:none" id="guardarImagen" onclick="registrarFotoProducto()">
                              Guardar Imagen
                      </button>
                      </div>
                  </div>



              </form>



          </div>
          <div class="text-bg-dark colorBlack p-3">

              <button type="button" class="btn btn-primary" id="btnRegistrarProducto"
                  onclick="registrarProductos()">Registrar Producto</button>

          </div>
      </div>
      </div>
      
     

  </div>
</div>`


document.getElementById("cargarFormularioP").innerHTML=body;
}


