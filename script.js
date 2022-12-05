
const usuarios=document.querySelector("#Usuarios");

$("#Usuarios").click(function(event){
    
    
     
   
});

$("#informacion").click(function(event){
    $("#contenedor").load('informacion/comprar.html')
})



$("#cuentaAdmin").click(function(event){
    $("#contenedor").load('cuenta/admin.html')
    $("#menu").load('cuenta/menuAdmin.html')

   
});

//cargo formulario Registrarse
$("#rUsuario").click(function(event){
    $("#contenedor").load('login/login.html')
});

$("#cuentaTienda").click(function(event){
    $("#contenedor").load('tienda/tienda.html')
    $("#menu").load('tienda/menuTienda.html')
});

$("#cuentaTienda2").click(function(event){
    $("#contenedor").load('tienda/tienda.html')
    $("#menu").load('tienda/menuTienda.html')
});

/*
var boton = document.getElementById('agregar_p');
var guardar = document.getElementById('guardar');
var lista = document.getElementById('lista');
var data = [];
var cant = 0;
boton.addEventListener("click", agregar_producto);
guardar.addEventListener("click", save);

function agregar_producto() {
    var nombre = document.getElementById('nombre').value;
    var precio = parseFloat(document.getElementById('precio').value);
    var cantidad = parseFloat(document.getElementById('cantidad').value);
    var color = document.getElementById('color').value;
    var talla = parseFloat(document.getElementById('talla').value);

    if(cantidad>=0){
    var total = precio * cantidad;
    data.push(
        {
            "id": cant,
            "nombre": precio,
            "cantidad": cantidad,
            "total": total,
            "color":color,
            "talla":talla

        }
    );
    var id_row = 'row' + cant;
    var fila = '<tr id=' + id_row + '><td>' + nombre + '</td><td>' + precio + '</td><td>' + cantidad + '</td><td>'+color+'</td><td>'+talla+'</td><td>' + total + '</td><td><a hrf="#" class="btn btn-danger" onclick="eliminar('
        + cant + ')";>Eliminar</a><a href"#" class="btn btn-warning" onclick="cantidad(' + cant + ')";>Cantidad</a></td></tr>';

      

    $("#lista").append(fila);
    $("#nombre").val('');
    $("#precio").val('');
    $("#cantidad").val('');
    $("#color").val('');
    $("#talla").val('');
    
    $("#nombre").focus();
    cant++;
    sumar();
    }else{
        alert("Informacion Incompleta")
    }
    

}
function save() {

}
function sumar(){
    var tot=0;
    for(x of data){
        tot=tot+x.total;
        document.getElementById('total').innerHTML="total "+tot;
    }
}
function eliminar(row){
    $("#row"+row).remove();
    var i=0;
    var pos=0;
    for(x of data){
        if(x.id==row){
            pos=i;
        }
        i++;
    }
    data.splice(pos,1);
    sumar();
}
function cantidad(row){
    var canti=parseFloat(prompt("Nueva Cantidad"));
    data[row].cantidad=canti;
    data[row].total=data[row].cantidad*data[row].precio;
    var filaid=document.getElementById("row"+row);
    celda=filaid.getElementsByTagName('td');
    celda[2].innerHTML=canti;
    celda[3].innerHTML=data[row].total;
    sumar();
}



*/
