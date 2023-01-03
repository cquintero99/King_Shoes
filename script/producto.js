function actualizarProducto(id){
    let token=localStorage.getItem("JWT")
    document.getElementById("modalActualizarP")
    $("#modalActualizarP").load('tienda/registrar.html')
    cargarMarcas();
    cargarCategorias();
    fetch('http://localhost:8080/productos/'+id,{
        headers:{
            "Authorization":"Bearer "+token,
            
        }
    })
    .then(response=>response.json())
    .then(producto=>{
        console.log(producto)
        document.getElementById("inputNombreP").value=producto.nombre
        let precio=producto.precio
        document.getElementById("inputPrecioP").value=precio
        //select categoria
        $("#categoriaP").val(producto.categoria.id);
        //select color
        let color=producto.color
        $("#colorP option:contains("+color+")").attr('selected', true);
        //select marca
        let marca=producto.marca.id
        $("#marcaP").val(marca)

        let id=producto.id
        fetch(urlCargarImagen +id + '.jpg')
         .then(response => response.blob())
        .then(img => {
        let imagen = document.getElementById('imgActualizarP')
        imagen.src = URL.createObjectURL(img);
        imagen.onload = function (evt) {
            URL.revokeObjectURL(this.src);
        }
    })
    .catch(err => console.log(err))

    })
    .catch(err=>{
        console.log(err)
    })

}
