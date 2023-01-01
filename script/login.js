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
          console.log(JWT)
          if(JWT.length>=50){
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
        
  
    
})



function recargar(){
  location.reload();
  
}
function perfil(){
  $("#contenedor").load('login/perfil.html')
}

function cargarDatosCarrito(){
  let idUser = JSON.parse(sessionStorage.getItem("tokenUser")).id;
  fetch(urlUsuario + idUser + '/carrito')
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

const btnCerrar=document.getElementById("cuentaCerrar")

btnCerrar.addEventListener("click",function(){
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
})




function cargarMenuT(idUser){
    fetch(urlTiendaUsuario+idUser)
        .then(response=>response.json())
        .then(tienda=>{
          sessionStorage.setItem("idTienda",tienda.id)
           
           
                $("#menu").load('tienda/menuTienda.html')
                $("#contenedor").load('tienda/producto.html') 
            
        })
        .catch(error=>{
            $("#contenedor").load('tienda/tienda.html')
        })
  
}

function cargarMenuAdmin(){
    
        $("#contenedor").load('cuenta/index.html')
        $("#menu").load('cuenta/menuAdmin.html')
    
    

}


