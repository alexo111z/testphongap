url = 'http://192.168.1.95:8000/';
datos = 'api/registro';
registrar= 'api/registrar'
GET_datos = url+datos
function loadDatos(){
    const res =  axios.post(GET_datos)
            .then(function(response){
                console.log(response);
                if(response.status == 204){
                    console.log('Datos vación');
                }else{
                   item=response.data;
                   for(var i=0; i< item.nestudios.length;i++){
                    document.getElementById("nestudio").innerHTML += "<option value='"+item.nestudios[i].id+"'>"+item.nestudios[i].nivel+"</option>";
                   }
                   for(var i=0; i< item.areas.length;i++){
                    document.getElementById("area").innerHTML += "<option value='"+item.areas[i].id+"'>"+item.areas[i].area+"</option>";
                   }
               }
            })
            .catch(function(error){
                console.log(error);
                alert(error);
            });
    
    }


 /*document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, options);
  });

  // Or with jQuery

  $(document).ready(function(){
    $('select').formSelect();
  });*/
function mostrarCorreo(){
    jQuery('.correo').show();
}

function mostrarPassword(){
    jQuery('.contrasena').show();
}

function mostrarNombre(){
    jQuery('.nombre').show();
}

function mostrarPersonal(){
    jQuery('.personal').show();
}

function mostrarAcademico(){
    jQuery('.academico').show();
}

function ocultar(){
    jQuery('.correo').hide();
    jQuery('.contrasena').hide();
    jQuery('.nombre').hide();
    jQuery('.personal').hide();
    jQuery('.academico').hide();
} 
  
jQuery(document).ready(function(){
    loadDatos();
    ocultar();
    $(function(){
        $('.datepicker').pickadate({
            monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            selectMonths: true,
            selectYears: 100, // Puedes cambiarlo para mostrar más o menos años
            format: 'yyyy/mm/dd',
            today: 'Hoy',
            clear: 'Limpiar',
            close: 'Ok',
            labelMonthNext: 'Siguiente mes',
            labelMonthPrev: 'Mes anterior',
            labelMonthSelect: 'Selecciona un mes',
            labelYearSelect: 'Selecciona un año',
        });
    });
    mostrarCorreo();
    $(document).on('click', '#salir',function(){
        window.location.href = 'index.html';
    });
    $(document).on('click', '#correoNext',function(){
      
        if($('#email').val()!="" && $('#email').val()!=null ){
            ocultar();
            mostrarPassword();
        }
        else{
            alert('Introduce un email');
        }
    });
    $(document).on('click', '#passwordBack',function(){
        ocultar();
            mostrarCorreo();

    });
    $(document).on('click', '#passwordNext',function(){
        if($('#password').val()=="" || $('#password').val()==null ){
            alert('Introduce tu contraseña');

        }else if($('#password').val()!=$('#password2').val()){
            alert('Las contraseñas no coinciden');
        }
        else{
            ocultar();
            mostrarNombre();
        }

    });
    $(document).on('click', '#nombreBack',function(){
        ocultar();
        mostrarPassword();
    });
    $(document).on('click', '#nombreNext',function(){
        if($('#nombre').val()=="" || $('#nombre').val()==null ){
            alert('Introduce tu nombre.');
        }else if($('#apellido').val()=="" || $('#apellido').val()==null){
            alert('Introduce tu apellido');
        }
        else{
            ocultar();
            mostrarPersonal();
        }
        
    });
    $(document).on('click', '#personalBack',function(){
        ocultar();
        mostrarNombre();
    });
    $(document).on('click', '#personalNext',function(){
        if($('#fecha').val()=="" || $('#fecha').val()==null ){
            alert('Introduce tu fecha de nacimiento.');
        }else if($('input[name="genero"]:checked').val()!=0 && $('input[name="genero"]:checked').val()!=1){
            alert('Introduce tu genero');
        }
        else{
            ocultar();
            mostrarAcademico();
        }
        
    });
    $(document).on('click', '#academicoBack',function(){
        ocultar();
        mostrarPersonal();
    });
    $(document).on('click', '#registrarUser',function(){
        if($('#nestudio').val()=="" || $('#nestudio').val()==null ){
            alert('Introduce tu nivel de estudios.');
        }else if($('#area').val()=="" || $('#area').val()==null ){
            alert('Introduce tu area');
        }
        else{
            var data= {
                email: $('#email').val(),
                password: $('#password').val(),
                nombre: $('#nombre').val(),
                apellido: $('#apellido').val(),
                born_date:$('#fecha').val(),
                sexo: $('input[name="genero"]:checked').val(),
                estudios:$('#nestudio').val(),
                area:$('#area').val(),
            }
            console.log(JSON.stringify(data));
            axios.post(url + registrar,JSON.stringify(data))
            .then(function(response){
              console.log(response);
              if(response==1){
                alert('Usuario registrado con éxito');
                window.location.href = 'index.html';
              }else{
                ocultar();
                mostrarCorreo();
                alert('Este correo ya está registrado, verifiquelo');
              }
            })
            .catch(function(error){
                if (error.response.status == 401) {
                    alert('Datos incorrecots');
                }
              console.log(error.response);
        
            });
        }

    });

});