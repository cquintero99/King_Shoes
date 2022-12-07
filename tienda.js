var aux=0;
function verFormulario(){
   
    if(aux==0){
        document.getElementById("cargarFormularioP").style.visibility="visible";
    $("#cargarFormularioP").load('tienda/registrar.html')
    cargarCategorias();
    cargarMarcas();
    aux=1;
    }else{
        $("fp").empty();
        document.getElementById("fp").style.visibility="hidden";
        aux=0;
    }
    

}
function cargarInventario(){
    
$("#contenedor").load('tienda/inventario.html')

}

function registrarTienda() {

    var id_usuario = document.getElementById('inputIdUserTienda').value;
    var nombre = document.getElementById('inputNombreT').value;
    var descripcion = document.getElementById('inputDescripcionT').value;
    let fecha=new Date();
    const tienda = {
        idUsuario: id_usuario,
        nombre: nombre,
        descripcion: descripcion,
        fechaRegistro:fecha.toLocaleDateString()

    }
    console.log(tienda)
    fetch('http://localhost:8080/tiendas/save', {
        method: 'POST',
        body: JSON.stringify(tienda),
        headers: {
            "Content-type": "application/json"
        }

    }).then(res => res.json())
        .then(tienda => console.log(tienda))

}

function buscarProductoTienda() {
    var id = document.getElementById('inputBuscarTId').value;
    fetch('http://localhost:8080/tiendas/' + id + '/productos')
        .then(response => response.json())
        .then(data => mostrarProductoTienda(data))
    const mostrarProductoTienda = (data) => {

        let body = ''
        for (let i = 0; i < data.length; i++) {
            body += `
                <tr id="fila${data[i].id}">
                <th>${i + 1}</th> <td><img src=""  id="img${data[i].id}" height="50px" width="50px" alt="" /> </td>
                 <td>${data[i].id} </td> <td>${data[i].tienda.nombre} </td> <td>${data[i].nombre} </td> <td>${data[i].color} </td> <td>${data[i].marca.nombre} </td> <td>${data[i].categoria.descripcion} </td>
                <td>${data[i].precio}</td>
                <th>
                <div class="dropdown-center dropdown">
                <button class="btn btn-warning dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                 Opciones
                </button>
                <ul class="dropdown-menu">
                <li>
                <a class="dropdown-item"  href="#" >Actualizar </a>
                </li>
                <li>
                <a class="dropdown-item" href="#" data-bs-toggle="modal" data-bs-target="#staticBackdrop2" onclick="verTallasProducto(${data[i].id})">Ver Tallas</a>
                
                </li>
                <li>
                
                <a class="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop3" href="#" onclick="pasarDataProducto(${data[i].id})">Agregar Talla</a>
                </button>
                </li>
                 <li>
                 <a class="dropdown-item" href="#">Eliminar </a>
                 
                 </li>
                </ul>
                </div>
                </th>
                </tr>`
                cargarImg(data[i].id)
        }
       
        document.getElementById('tablaProductosTienda').innerHTML = body
       

    }

}
/*

function cargarImg(id){
    fetch('http://localhost:8080/files/view/archivos/'+id+'.jpg')
        .then(response=>response.blob())
        .then(img=>{
            let imagen=document.getElementById('img'+id)
            imagen.src=URL.createObjectURL(img);
            imagen.onload=function(evt){
               URL.revokeObjectURL(this.src) ;
            }
        })
        .catch(err=>console.log(err))
  
  }
  */
function registrarFotoProducto() {
    
            const formData = new FormData();
            const file = document.getElementById('inputImgP').files[0];
            let nombre=document.getElementById('inputNombreP').value;
            file.name=nombre+".jpg";
           
            if(localStorage.getItem("idProducto")!=null){
            let idProducto=localStorage.getItem("idProducto")
            
            formData.append('name',idProducto)
            formData.append( 'file',file);
            formData.append('ubicacion',"archivos")
            

            console.log(file)
            console.log(file.src)
            
            
                fetch('http://localhost:8080/api/files', {
                    method: 'POST',
                    body:  formData,
                        
                    
                    
                  })
                  .then(response => Promise.all([response.status, response.json()]))
                  .then(function([status, myJson]) {
                      if (status == 200) {

                          console.log("succeed!");
                      } else {
                          console.log("failed!");
                      }
                  })
                  .catch(error => console.log(error.message));
                }else{
                    alert("Primero debes registrar el Producto")
                }

}


function registrarProductos() {
    var id_tienda = document.getElementById('inputIdTienda').value;
    var nombreP = document.getElementById('inputNombreP').value;
    var precioP = document.getElementById('inputPrecioP').value;
    var selectCategoria = document.getElementById("categoriaP");
    var idCatego = selectCategoria.value;
    var valorCategoria = selectCategoria.options[selectCategoria.selectedIndex].text;

    var selectMarca = document.getElementById("marcaP").value;

    var selectColor = document.getElementById("colorP");
    var color = selectColor.options[selectColor.selectedIndex].text;

    fetch('http://localhost:8080/tiendas/' + id_tienda)
        .then(response => response.json())
        .then(tienda => mostrarTienda(tienda))



    const mostrarTienda = (tienda) => {
        fetch('http://localhost:8080/marca/' + selectMarca)
            .then(response => response.json())
            .then(marca => mostrarMarca(marca))

        const mostrarMarca = (marca) => {
            const newProducto = {
                tienda: tienda,
                nombre: nombreP,
                color: color,
                precio: precioP,
                categoria: {
                    id: idCatego,
                    descripcion: valorCategoria
                },
                marca: marca

            }
            console.log(JSON.stringify(newProducto))
            
            
            
             fetch('http://localhost:8080/productos/save',{
                 method:"POST",
                 body:JSON.stringify(newProducto),
                 headers:{
                     "Content-type":"application/json"
                 }
 
 
             }).then(response=>response.json())
                 .then(producto=>{
                    alert("Ya puedes registrar la imagen del producto")
                    console.log(producto)
                    let idProducto=producto.id;
                    localStorage.setItem("idProducto",idProducto)
                    console.log(producto.id)
                    document.getElementById('guardarImagen').style="display:visible";
                    
                 })
                 
                

        }
    }





}
function pasarDataProducto(data) {
    let id = document.getElementById('inputIdProducto').value = data
    cargarTallasFiltro()

}

//RegistrarTalla
function registrarTallaProducto() {
    var id = document.getElementById('inputIdProducto').value
    console.log(id)
    fetch('http://localhost:8080/productos/' + id)
        .then(response => response.json())
        .then(data => buscarProductoId(data))
        .then(error => console.log(error))

    let stock = document.getElementById('inputStockProducto').value;
    let select = document.getElementById("tallaProductoAlmacen");


    let selectTalla = document.getElementById("tallasProducto");
    let idTalla = selectTalla.value;
    let numeroTalla = selectTalla.options[selectTalla.selectedIndex].text;
    
   
    const buscarProductoId = (data) => {
        const newTalla = {
            producto: data,
            stock: stock,
            talla: {
                id:idTalla,
                numero:numeroTalla
            },
            ref:data.id+"-"+numeroTalla

        }
        console.log(JSON.stringify(newTalla))
        fetch('http://localhost:8080/almacen/save', {
            method: 'POST',
            body: JSON.stringify(newTalla),
            headers: {
                "Content-type": "application/json"
            }

        }).then(response => response.json())
            .then(talla => console.log("REGISTRADA::" + talla))


    }


}
function verTallasProducto(id) {
    fetch('http://localhost:8080/productos/' + id + '/almacen')
        .then(response => response.json())
        .then(tallas => mostrarTallasP(tallas))
        .catch(error => console.log(error))

    const mostrarTallasP = (tallas) => {
        console.log(tallas)
        let body = ``
        for (let i = 0; i < tallas.length; i++) {
            body += `<tr>
        <th>${i + 1}</th>
        <td>${tallas[i].id}</td> <td>${tallas[i].producto.nombre}</td><td>${tallas[i].producto.categoria.descripcion}</td>
        <td>${tallas[i].producto.precio}</td> <td>${tallas[i].talla.numero}</td> <td>${tallas[i].stock}</td>
        <th>
        <div class="dropdown-center dropdown">
        <button class="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
         Acciones
        </button>
        <ul class="dropdown-menu">
        <li><a class="dropdown-item" href="#">Actualizar</a></li>
        
         <li><a class="dropdown-item" href="#">Eliminar </a></li>
        </ul>
        </div>
        </th> 
            </tr>
        `
        }
        document.getElementById('dataTallasP').innerHTML = body;
    }



}




function listarProductos() {
    $("#contenedor").load('cuenta/productos.html')
    fetch('http://localhost:8080/productos')
        .then(response => response.json())
        .then(data => mostrarProductos(data))


    const mostrarProductos = (data) => {
        console.log(data)
        let body = ''
        for (let i = 0; i < data.length; i++) {
            body += `
            <tr id="fila${data[i].id}">
             <th>${i + 1}</th>
             
             <td><img src=""  id="img${data[i].id}" height="50px" width="50px" alt="" />  </td>
             <td>${data[i].id} </td> <td>${data[i].tienda.nombre} </td> <td>${data[i].nombre} </td> <td>${data[i].color} </td> <td>${data[i].marca.nombre} </td> <td>${data[i].categoria.descripcion} </td>
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
                 <li><a class="dropdown-item" href="#" onclick="eliminarProducto(${data[i].id})">Eliminar </a></li>
                </ul>
                </div>
            </td>
            </tr>`
            cargarImg(data[i].id)
        }
        document.getElementById('dataProductos').innerHTML = body
    }

}

function eliminarProducto(id){
    fetch('http://localhost:8080/productos/'+id,{
        method:'DELETE'
    }).then(response=>response.json())
        .then(user=>console.log(user))
}





//Cargo html Producto
$("#productoTienda").click(function (event) {
    $("#contenedor").load('tienda/producto.html')
   

})


function cargarMarcas() {
    fetch('http://localhost:8080/marca')
        .then(response => response.json())
        .then(data => moscarMarca(data))

    const moscarMarca = (data) => {
        var selectorMarca = document.getElementById("marcaP");
        for (let i = 0; i < data.length; i++) {
            var nombreData = data[i].nombre
            var index = data[i].id;
            selectorMarca.options[i] = new Option(nombreData, index);
        }
    }
}
function cargarCategorias() {
    fetch('http://localhost:8080/categoria')
        .then(response => response.json())
        .then(data => mostrarCategoria(data))
    //Lleno select Categoria
    const mostrarCategoria = (data) => {

        var selectorCategoria = document.getElementById("categoriaP");
        for (let i = 0; i < data.length; i++) {
            var descripciondata = data[i].descripcion
            var indexC = data[i].id;
            selectorCategoria.options[i] = new Option(descripciondata, indexC);



        }

    }

}
function registrarMarca() {
    var id = document.getElementById('inputIdTiendaM').value;
    var nombreMarca = document.getElementById('inputNombreMarca').value;
    var descripcionMarca = document.getElementById('inputDescripcionMarca').value;

    const marca = {
        idTienda: id,
        nombre: nombreMarca,
        descripcion: descripcionMarca

    }
    console.log(marca)
    fetch('http://localhost:8080/marca/save', {
        method: 'POST',
        body: JSON.stringify(marca),
        headers: {
            "Content-type": "application/json"
        }
    }).then(response => response.json())


}



$("#listaTiendas").click(function (event) {
    $("#contenedor").load('cuenta/tiendas.html')
    fetch('http://localhost:8080/tiendas')
        .then(response => response.json())
        .then(data => mostrarTiendas(data))
        .catch(error => console.log(error))

    const mostrarTiendas = (data) => {
        console.log(data)
        let body = ''
        for (let i = 0; i < data.length; i++) {
            body += `<tr>
         <th>${i + 1}</th> <td>${data[i].id}</td> <td>${data[i].idUsuario}</td><td>${data[i].nombre}</td><td>${data[i].descripcion}</td>
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
        document.getElementById('dataTiendas').innerHTML = body
    }
})


/*
$("#listaTiendas").click(function(event){
    $("#contenedor").load('cuenta/tiendas.html')
    fetch('http://localhost:8080/tiendas')
    .then(response => response.json())
    .then(data => mostrarTiendas(data))
    .catch(error => console.log(error))
    
    const mostrarTiendas=(data)=>{
        console.log(data)
        let body=''
        for(let i=0;i<data.length;i++){
         body+=`<tr> <td>${data[i].id}</td> <td>${data[i].id_usuario}</td><td>${data[i].nombre}</td><td>${data[i].descripcion}</td> </tr>`
         
        }
        document.getElementById('dataTiendas').innerHTML=body
    }
});
*/
