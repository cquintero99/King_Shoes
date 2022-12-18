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
                alert("BIENVENIDO")
                fetch('http://localhost:8080/usuarios/correo/'+email)
                .then(response=>response.json())
                .then(user=>{
                    localStorage.setItem("tokenUser",JSON.stringify(user))
                   
                   location.reload()
                })
            }else{
                alert("DATOS INCORECTOS")
            }
          /*
          const tokenInfo = this.state.token;
          if (tokenInfo !== undefined) {
            alert("No sirve")
          }
        */})
        
  
    
})

if(localStorage.getItem("tokenUser")!=""){
    
var rolUser=JSON.parse(localStorage.getItem("tokenUser")).id_rol;
var idUser=JSON.parse(localStorage.getItem("tokenUser")).id;


if(rolUser!=0){
    cambiarMenu(rolUser)
    
}
}

function cambiarMenu(rol){
    if(rol==1){
       

        let body1=
        `
        <li>
        <button type="button " class="btn"><a class="dropdown-item" href="#" id="cuentaPerfil">Perfil
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
        <button type="button " class="btn"><a class="dropdown-item" href="#" id="cuentaPerfil">Perfil
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
    localStorage.setItem("tokenUser","")
    localStorage.setItem("idTienda","")
    localStorage.setItem("idCarrito","")
    localStorage.setItem("idProducto","")
    location.reload()
}
const btnCerrar=document.getElementById("cuentaCerrar")

btnCerrar.addEventListener("click",function(){
    localStorage.setItem("tokenUser","")
    localStorage.setItem("idTienda","")
    localStorage.setItem("idCarrito","")
    localStorage.setItem("idProducto","")
    location.reload()
})

function cargarMenuT(idUser){
    fetch('http://localhost:8080/tiendas/usuario/'+idUser)
        .then(response=>response.json())
        .then(tienda=>{
            localStorage.setItem("idTienda",tienda.id)
            console.log(tienda)
           
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


