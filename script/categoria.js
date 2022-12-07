
/*
$("#hombre").click(function(event){
    $("#contenedor").load('categoria/categoria.html')
})
$("#hombre").click(function(event){
    $("#contenedor").load('categoria/categoria.html')
})
*/
function agregarProductoCarrito(id){
    let selectTalla = document.getElementById("tallasC"+id);
    let idTalla = selectTalla.value;
    let cantidad=document.getElementById("inputCantidad").value;


    fetch('http://localhost:8080/almacen/'+idTalla)
    .then(response=>response.json())
    .then(tallaP=>registrarCarro(tallaP))


    const registrarCarro=(tallaP)=>{

    let total=cantidad*tallaP.producto.precio; 
    const carrito={
        carrito:4,
        almacen:tallaP,
        cantidad:cantidad,
        total:total

    }
    console.log(JSON.stringify(carrito))
    
    fetch('http://localhost:8080/carrito/productos',{
        method:'POST',
        body:JSON.stringify(carrito),
        headers:{
            "Content-type":"application/json"
        }
    }).then(response=>response.json())
      .then(carritoR=>console.log("Registra Carrito"+carritoR))


    


    }

}
/*
    const buscarProductoId = (data) => {
        const newTalla = {
            producto: data,
            stock: stock,
            talla: {
                id:idTalla,
                numero:numeroTalla
            }
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
*/

function cargarMarcasFiltroSelect() {
    fetch('http://localhost:8080/marca')
        .then(response => response.json())
        .then(data => moscarMarca(data))

    const moscarMarca = (data) => {
        var selectorMarca = document.getElementById("marcaFiltro");
        for (let i = 0; i < data.length; i++) {
            var nombreData = data[i].nombre
            var index = data[i].id;
            selectorMarca.options[i] = new Option(nombreData, index);
        }
    }
}
function cargarTallasFiltro(){
    fetch('http://localhost:8080/tallas')
    .then(response=>response.json())
    .then(tallas=>tallasFiltro(tallas))

    const tallasFiltro=(tallas)=>{
        var selectTallas=document.getElementById("tallasProducto");
        for(let i=0;i<tallas.length;i++){
            let id=tallas[i].id
            let numeroData=tallas[i].numero
            selectTallas.options[i]=new Option(numeroData,id);
        }
    }
}




function cargarTallas(id) {

    fetch('http://localhost:8080/productos/' + id + '/almacen')
        .then(response => response.json())
        .then(data => mostrarTallas(data))

    const mostrarTallas = (data) => {

        if(data.length>1){

        for (let i = 0; i < data.length; i++) {
            var selectorMarca = document.getElementById("tallasC" + data[i].producto.id);
            var nombreData = data[i].talla.numero
            var index = data[i].id;
            selectorMarca.options[i] = new Option(nombreData, index);
        }

    }else{
        alert(" ! Este producto se encuentra agotado ¡")
    }


    }

}

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


function cargarProducto(id) {
    $("#contenedor").load('categoria/producto.html');

    fetch('http://localhost:8080/productos/' + id)
        .then(response => response.json())
        .then(producto => mostrarProductoId(producto))


    const mostrarProductoId = (producto) => {
        


        body =
            `
        <div class=" border border-dark">
        <div class="text-bg-dark colorBlack p-3 " >
                 <h2>
                 ${producto.nombre}</h2>
        </div>
        
        <div class="text-bg-ligth p-3">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16">
            <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
            <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/>
             </svg>
              Color: ${producto.color}
        </div>
        <div class="text-bg-ligth p-4"> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                    </svg>
                    Precio: ${producto.precio}
        </div>
       <form class="from ">   
        
        <div class="text-bg-ligth p-3"> 
        
        <label for="inputNombreP" class="col-sm-2 col-form-label">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bar-chart-steps" viewBox="0 0 16 16">
        <path d="M.5 0a.5.5 0 0 1 .5.5v15a.5.5 0 0 1-1 0V.5A.5.5 0 0 1 .5 0zM2 1.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-6a.5.5 0 0 1-.5-.5v-1zm2 4a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5v-1z"/>
        </svg> Talla:</label>
        
        
                 <select class="form-select text-center"  id="tallasC${producto.id}" >
                    <option selected>Seleccione una talla</option>
                 </select>
        
        </div>
        
        <label for="inputCantidad" class="col-sm-2 col-form-label">Cantidad 
        <input type="number" class="form-control" id="inputCantidad" style="width: 90px;" min="1"   required></label>
        
        </form>
         
           
          
      
        
       <div class="text-bg-ligth p-3">
       <a href="#" type="button" class="btn btn-outline-primary" id="btnCarrito" onclick="agregarProductoCarrito(${producto.id})">
       AGREGAR AL CARRITO</a>
       </div>
        
        <div class="text-bg-dark colorBlack p-3">
        
        Vendido y enviado por :
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop" viewBox="0 0 16 16">
        <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
        </svg> ${producto.tienda.nombre}
        </div>
        <div>
        `
        body2=
        `
        <div class=" border border-dark">
            <div class="text-bg-dark colorBlack p-3">
              
              <h2>Imagen</h2> 
            </div>
          <div class="text-bg-dark colorBlack p-3">
            <img src="https://static.dafiti.com.co/p/nike-3840-3119402-1-zoom.jpg" id="img${producto.id}" alt="" width="250p" height="350px">
          </div>
          
          <div class="text-bg-dark colorBlack p-3">
           
            Marca:  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tags"
            viewBox="0 0 16 16">
            <path
              d="M3 2v4.586l7 7L14.586 9l-7-7H3zM2 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 2 6.586V2z" />
            <path
              d="M5.5 5a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM1 7.086a1 1 0 0 0 .293.707L8.75 15.25l-.043.043a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 0 7.586V3a1 1 0 0 1 1-1v5.086z" />
          </svg><label id="labelMarca"></label>
          </div>
        </div>
        `
        cargarImg(producto.id)
        cargarTallas(producto.id)
        document.getElementById("fromProducto").innerHTML = body;
        document.getElementById("imgProducto").innerHTML=body2;
        document.getElementById("labelMarca").innerHTML = producto.marca.nombre;
        
    document.getElementById('inputCantidad').value=1;

    }



}



//Cargo los productos por categoria
function mostrarCategoria(categoria) {
    


    $("#contenedor").load('categoria/categoria.html')

    fetch('http://localhost:8080/categoria/' + categoria + '/productos')
        .then(response => response.json())
        .then(data => mostrarProductosHombre(data))

    const mostrarProductosHombre = (data) => {

        

        let body = ''
        for (let i = 0; i < data.length; i++) {
           

            body +=
                `<div class="col ">  
    <div class="abs-center" > 

        <div class="card border-dark mb-3 text-bg-light" style="width: 21rem;">

            <div class="card-body text-center">

                <h5 class="card-title">${data[i].nombre} <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-up-right" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M6.364 13.5a.5.5 0 0 0 .5.5H13.5a1.5 1.5 0 0 0 1.5-1.5v-10A1.5 1.5 0 0 0 13.5 1h-10A1.5 1.5 0 0 0 2 2.5v6.636a.5.5 0 1 0 1 0V2.5a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10a.5.5 0 0 1-.5.5H6.864a.5.5 0 0 0-.5.5z"/>
                <path fill-rule="evenodd" d="M11 5.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793l-8.147 8.146a.5.5 0 0 0 .708.708L10 6.707V10.5a.5.5 0 0 0 1 0v-5z"/>
              </svg></h5>

               <a  href="#"  >
                <img src="" height="250px"  width="225px" alt="" id="img${data[i].id}" onclick="cargarProducto(${data[i].id})"></a>
              
             <div>
                <p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8zm5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0z"/>
                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1h-.003zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195l.054.012z"/>
                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083c.058-.344.145-.678.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1H1z"/>
                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 5.982 5.982 0 0 1 3.13-1.567z"/>
                    </svg>  Precio : ${data[i].precio} 
                <p> 
            </div>
               
            <p><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-palette" viewBox="0 0 16 16">
            <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zM5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
            <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8zm-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7z"/>
          </svg>
             Color: ${data[i].color}</p>


            <div> 
                <p> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop" viewBox="0 0 16 16">
                <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zM4 15h3v-5H4v5zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3zm3 0h-2v3h2v-3z"/>
              </svg> Tienda: ${data[i].tienda.nombre}
                </p>
            </div>
            

            </div>
        </div> 
    </div>
</div>`
            /*
            <div class="d-grid gap-2  mx-auto" >
                        
                <select class="form-select text-center"  id="tallasC${data[i].id}" >
                    <option selected>Seleccione una talla</option>
                </select>

                
                
                <button type="button" class="btn btn-outline-primary" id="btnCarrito" onclick="agregarProductoCarrito(${data[i].id})">AGREGAR AL CARRITO</button>
            </div>
             cargarTallas(data[i].id)
            */


             cargarImg(data[i].id)
        }
        document.getElementById('categoriaProductos').innerHTML = body;

    }

}
