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
    fetch('http://localhost:8080/login', {
        
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
        .then(response => response)
        
        .then(responseJson => {
            if(responseJson.status==200){
              console.log(responseJson)
                localStorage.setItem("aux","1")

                sessionStorage.setItem("idDir","")
                sessionStorage.setItem("direccion","")
                fetch('http://localhost:8080/usuarios/correo/'+email)
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
                
                  setTimeout(recargar, 1050);
                  setTimeout(perfil,1080);
                  
                 
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

const toastTrigger = document.getElementById('liveToastBtn')
const toastLiveExample = document.getElementById('liveToast')
if (toastTrigger) {
  toastTrigger.addEventListener('click', () => {
    const toast = new bootstrap.Toast(toastLiveExample)

    toast.show()
  })
}
function recargar(){
  location.reload();
  
}
function perfil(){
  $("#contenedor").load('login/perfil.html')
}

function cargarDatosCarrito(){
  let idUser = JSON.parse(sessionStorage.getItem("tokenUser")).id;
  fetch('http://localhost:8080/usuarios/' + idUser + '/carrito')
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
  localStorage.setItem("aux","0")
  sessionStorage.clear()
  sessionStorage.setItem("idDir","")
  sessionStorage.setItem("direccion","")
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
setTimeout(recargar, 550);
}

const btnCerrar=document.getElementById("cuentaCerrar")

btnCerrar.addEventListener("click",function(){
  sessionStorage.setItem("tokenUser","")
  sessionStorage.setItem("idTienda","")
  sessionStorage.setItem("idCarrito","")
  sessionStorage.setItem("idProducto","")
  sessionStorage.setItem("cedulaUser","")
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
setTimeout(recargar, 1500);
})




function cargarMenuT(idUser){
    fetch('http://localhost:8080/tiendas/usuario/'+idUser)
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


