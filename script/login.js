const btnEntrar=document.getElementById("btnInicioSecion");

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
                
                fetch('http://localhost:8080/usuarios/correo/'+email)
                .then(response=>response.json())
                .then(user=>{
                    sessionStorage.setItem("tokenUser",JSON.stringify(user))
                   cargarDatosCarrito()
               
                   Swal.fire({
                    icon: 'success',
                    title: 'Kinshoes',
                    text: '! Bienvenido!',
                    timer: 1500,
                    footer: '<a href="../index.html">Why do I have this issue?</a>'
                  })
                
                  setTimeout(recargar, 1500);
                  setTimeout(perfil,2100);
                  
                 // location.reload()
                
                  
                  
                  // cambiarMenu(user.id_rol)
                })
            }else{
                //alert("DATOS INCORECTOS")
                Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: 'Datos Incorrectos!',
                  timer: 1500,
                  footer: '<a href="">Why do I have this issue?</a>'
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
  var idUser = JSON.parse(sessionStorage.getItem("tokenUser")).id;
  fetch('http://localhost:8080/usuarios/' + idUser + '/carrito')
    .then(response => response.json())
    .then(carrito => {
      
      sessionStorage.setItem("idCarrito", carrito[0].id)
     // verProductosCarrito(carrito[0].id);
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
  sessionStorage.setItem("tokenUser","")
  sessionStorage.setItem("idTienda","")
  sessionStorage.setItem("idCarrito","")
    sessionStorage.setItem("idProducto","")
    location.reload()
}
const btnCerrar=document.getElementById("cuentaCerrar")

btnCerrar.addEventListener("click",function(){
  sessionStorage.setItem("tokenUser","")
  sessionStorage.setItem("idTienda","")
  sessionStorage.setItem("idCarrito","")
  sessionStorage.setItem("idProducto","")
  sessionStorage.setItem("cedulaUser","")
    location.reload()
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


