
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


