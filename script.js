
const usuarios=document.querySelector("#Usuarios");

$("#Usuarios").click(function(event){
    
    
     
   
});

$("#informacion").click(function(event){
    $("#contenedor").load('informacion/comprar.html')
})


function vender(){
    Swal.fire({
        title: 'King Shoes Colombia ',
        width: 600,
        padding: '3em',
        color: '#716add',
        background: '#fff url(/images/trees.png)',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `,
        footer: '<a href="index.html" type="button" >contacto</a>'
      })
}



//cargo formulario Registrarse
$("#rUsuario").click(function(event){
    $("#contenedor").load('login/login.html')
});


/*
$("#cuentaTienda").click(function(event){
    $("#contenedor").load('tienda/tienda.html')
    $("#menu").load('tienda/menuTienda.html')
});

$("#cuentaTienda2").click(function(event){
    $("#contenedor").load('tienda/tienda.html')
    $("#menu").load('tienda/menuTienda.html')
});
*/


