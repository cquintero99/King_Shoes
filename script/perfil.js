function cargarPerfil(){
    $("#contenedor").load('login/perfil.html')
}

 
 function actualizarPerfil(){
   // $("#actualizarPerfil").load('login/login.html')
   let cedula=JSON.parse(sessionStorage.getItem("tokenUser")).cedula;
   let nombre=JSON.parse(sessionStorage.getItem("tokenUser")).nombre;
   let apellido=JSON.parse(sessionStorage.getItem("tokenUser")).apellido;
   let sexo=JSON.parse(sessionStorage.getItem("tokenUser")).sexo;
   let fechaNacimiento=JSON.parse(sessionStorage.getItem("tokenUser")).fecha_nacimiento;
   let email=JSON.parse(sessionStorage.getItem("tokenUser")).correo;

   document.getElementById("inputCedula").value=cedula;
   document.getElementById("inputNombre").value=nombre;
   document.getElementById("inputApellidos").value=apellido;
    if(sexo=="Masculino"){
        $("#selectGenero").val("1");
    }else if(sexo=="Femenino"){
        $("#selectGenero").val("2");
    }else{
        $("#selectGenero").val("3");
    }
    document.getElementById("inputFecha").value=fechaNacimiento;
    document.getElementById("inputEmail").value=email;
    

 
 }
 function cambiarInformacion2(){
    let select = document.getElementById("selectGenero");
    let value = select.value;
    let sexo = select.options[select.selectedIndex].text;
    let cedula = document.getElementById("inputCedula").value;
    let nombre = document.getElementById("inputNombre").value;
    let apellido = document.getElementById('inputApellidos').value;
    let correo = document.getElementById('inputEmail').value;
    let contraseña = document.getElementById('inputPassword').value;
    let fechaNacimiento = document.getElementById('inputFecha').value;
      const user={
          cedula: cedula,
      nombre: nombre,
      apellido: apellido,
      fecha_nacimiento: fechaNacimiento,
      correo: correo,
      contraseña: contraseña,
      sexo: sexo
  
      }
      let id=JSON.parse(sessionStorage.getItem("tokenUser")).id;
      fetch('http://localhost:8080/usuarios/update/'+id,{
        method:'PUT',
        body:JSON.stringify(user),
        headers:{
            "Content-type":"Application/json"
        }
      })
      .then(response=>response.json())
      .then(newUser=>{
        
        sessionStorage.setItem("tokenUser",JSON.stringify(newUser))
        Swal.fire({
            icon: 'success',
            title: 'Kinshoes',
            text: '! Bienvenido!',
            timer: 1500,
            footer: '<a href="../index.html">Why do I have this issue?</a>'
          })
        $("#contenedor").load('login/perfil.html')

      })
  }

 
 function actualizarDireccion(){
    cargarDepartamentos();
    
 }

 function cargarDepartamentos(){
    fetch('http://localhost:8080/departamentos')
    .then(response=>response.json())
    .then(data=>verDerpartamentos(data))
    
    const verDerpartamentos=(data)=>{
        
        var selectorDepartamentos=document.getElementById("selectDepartamentos");

        for (let i = 0; i < data.length; i++){
            var nombreData = data[i].departamento
            var index = data[i].id;
            selectorDepartamentos.options[i] = new Option(nombreData, index);
        }
    
    }
    
       
    
 }
 function cargarMunicipios(){
    var select = document.getElementById("selectDepartamentos");
  var value = select.value;
    if(value!=null){
    fetch('http://localhost:8080/departamentos/'+value+'/municipios')
    .then(response=>response.json())
    .then(data=>verMunicipios(data))
    const verMunicipios=(data)=>{
        let selectorMunicipios=document.getElementById('selectMunicipio')
        for (let i = 0; i < data.length; i++){
            var nombreData = data[i].municipio
            var index = data[i].id;
            selectorMunicipios.options[i] = new Option(nombreData, index);
        }
    }
}
    
 }


