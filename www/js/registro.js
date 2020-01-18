
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
    ocultar();
    mostrarCorreo();
    $(document).on('click', '#salir',function(){
        //redirect login
    });
    $(document).on('click', '#correoNext',function(){
        ocultar();
        mostrarPassword();
    });
    $(document).on('click', '#passwordBack',function(){
        ocultar();
        mostrarCorreo();
    });
    $(document).on('click', '#passwordNext',function(){
        ocultar();
        mostrarNombre();
    });
    $(document).on('click', '#nombreBack',function(){
        ocultar();
        mostrarPassword();
    });
    $(document).on('click', '#nombreNext',function(){
        ocultar();
        mostrarPersonal();
    });
    $(document).on('click', '#personalBack',function(){
        ocultar();
        mostrarNombre();
    });
    $(document).on('click', '#personalNext',function(){
        ocultar();
        mostrarAcademico();
    });
    $(document).on('click', '#academicoBack',function(){
        ocultar();
        mostrarPersonal();
    });
    $(document).on('click', '#registrarUser',function(){
        //POST registrar
    });

})