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
            text: '! Cambio con exito!',
            timer: 3000,
            footer: '<p class="fw-bolder" >King Shoes CO</p>'
          })
          setTimeout(cargarPerfil,500)
        

      })
      .catch(errr=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡No se pudo Actualizar ! "Verifica la informacion" ',
            timer: 1500,
            footer: '<p class="fw-bolder" >King Shoes CO</p>'
          })

      })
  }

   

  function verificoExisteDireccion(){
    let idUs=JSON.parse(sessionStorage.getItem("tokenUser")).id;
    let token=localStorage.getItem("JWT")
    fetch('http://localhost:8080/usuarios/'+idUs+'/direccion',{
        headers:{
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response=>response.json())
    .then(data=>{
        sessionStorage.setItem("idDir",data[0].id)
        let direccion=data[0].direccion
        let barrio =data[0].barrio 
        let complemento=data[0].complemento
        let telefono=data[0].telefono
        let departamento=data[0].municipio.departamento.id
        let municipio=data[0].municipio.id
        document.getElementById("inputDireccion").value=direccion
        document.getElementById("inputBarrio").value=barrio
        document.getElementById("inputComplemento").value=complemento
        document.getElementById("inputTelefono").value=telefono
       
       $("#selectDepartamentos").val(departamento);
       //cargarMunicipios()
       verM(municipio,data[0].municipio.municipio)
       sessionStorage.setItem("direccion","si")
       
    })
    .catch(err=>{
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: '¡No Tienes una Direccion Registrada! ',
            timer: 1500,
            footer: '<p class="fw-bolder" >King Shoes CO</p>'
          })
          sessionStorage.setItem("direccion","no")
          //location.reload();
          //verificoExisteDireccion()
    })
    
    
  }

  function verM(id,nombre){
    var selectorDepartamentos=document.getElementById("selectMunicipio");
    var nombreData = nombre
            var index = id;
            selectorDepartamentos.options[0] = new Option(nombreData, index);
  }
 

  function saveDireccion(){
    let tieneDireccion=sessionStorage.getItem("direccion")
    let idU=JSON.parse(sessionStorage.getItem("tokenUser")).id;
    let nombre=JSON.parse(sessionStorage.getItem("tokenUser")).nombre
    let apellido=JSON.parse(sessionStorage.getItem("tokenUser")).apellido
    let direccion= document.getElementById("inputDireccion").value
    let barrio =document.getElementById("inputBarrio").value
    let complemento=document.getElementById("inputComplemento").value
    let telefono=document.getElementById("inputTelefono").value
    let municipio=document.getElementById("selectMunicipio").value
    if(tieneDireccion=="no"){
    
    fetch('http://localhost:8080/municipio/'+municipio)
    .then(res=>res.json())
    .then(muni=>{
        const dir={
            usuario_id:idU,
            nombre,
            apellido,
            direccion,
            complemento,
            barrio,
            telefono,
            municipio:muni
    
        }
        console.log(JSON.stringify(dir))
       
        

        fetch('http://localhost:8080/direccion/save',{
            method:'POST',
            body:JSON.stringify(dir),
            headers:{
                "Content-type":"Application/json"
            }
        })
        .then(response=>response.json)
        .then(newDireccion=>{
            sessionStorage.setItem("direccion","si")
            Swal.fire({
                icon: 'success',
                title: 'Todo Listo',
                text: '!Direccion registrada con exito!'+newDireccion.barrio,
                timer: 3000,
                footer: '<p class="fw-bolder" >King Shoes CO</p>'
              })
              setTimeout(cargarPerfil,500)
            
    
          })

        })
        .catch(err=>{
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: '¡No se pudo registrar la direccion! ',
                timer: 1500,
                footer: '<p class="fw-bolder" >King Shoes CO</p>'
              })

        })
    
    }else if (tieneDireccion=="si") {
        /*
        */
        fetch('http://localhost:8080/municipio/'+municipio)
    .then(res=>res.json())
    .then(muni=>{
        const dir={
            nombre,
            apellido,
            direccion,
            complemento,
            barrio,
            telefono,
            municipio:muni
    
        }
        let idDir=sessionStorage.getItem("idDir")
        fetch('http://localhost:8080/direccion/'+idDir,{
            method:'PUT',
            body:JSON.stringify(dir),
            headers:{
                "Content-type":"Application/json"
            }
        })
        .then(res=>res.json())
        .then(newDir=>{
            Swal.fire({
                icon: 'success',
                title: 'Kinshoes',
                text: '! Cambio con exito!',
                timer: 3000,
                footer: '<p class="fw-bolder" >King Shoes CO</p>'
              })
              setTimeout(cargarPerfil,500)
        })
        .catch(err=>{
            alert("No se pudo cambiar")
        })
    })
        
        
    }
    }
   
  
  

 
 function actualizarDireccion(){
    
    verificoExisteDireccion();
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


