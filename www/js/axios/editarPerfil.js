
url = 'http://192.168.1.95:8000/';
perfil = 'api/perfil/';

var id = localStorage.getItem('id');

POST_perfil = url + perfil+id;
POST_personal = url + '/api/edit/personales/' + id;
POST_localidad = url + '/api/edit/localidad/' + id;
POST_laboral = url + '/api/edit/laboral/' + id;
POST_academica = url + '/api/edit/academica/' + id;
GET_lugares = url+'/api/localidades';
	

jQuery(document).ready(function(){
	console.log("editar perfil");
	$(function(){
        $('.datepicker').pickadate({
            monthsFull: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            monthsShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            weekdaysFull: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
            weekdaysShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
            selectMonths: true,
            selectYears: 100, // Puedes cambiarlo para mostrar más o menos años
            format: 'yyyy-mm-dd',
            today: 'Hoy',
            clear: 'Limpiar',
            close: 'Ok',
            labelMonthNext: 'Siguiente mes',
            labelMonthPrev: 'Mes anterior',
            labelMonthSelect: 'Selecciona un mes',
            labelYearSelect: 'Selecciona un año',
        });
    });
	//axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
	// consultas de radios https://www.anerbarrena.com/value-radio-button-jquery-checked-1580/
	var lugares = [];
	axios.get(GET_lugares)
		.then(function(response){
			lugares = response.data;
			console.log(response.data);
		});
	console.log(lugares);
	axios.get(POST_perfil)
		.then(function(response){
			console.log(response.data);
			$('#editNombre').val(response.data.nombre);
			$('#editApellido').val(response.data.apellido);
			$('#editTelefono').val(response.data.telefono);
			$('#editFecha').val(response.data.nacimiento)
			if (response.data.genero == 1) {
				$('#generoF').attr('checked', true);
			}else{
				$('#generoH').attr('checked', true);
			}


			$('#edad').text(response.data.edad);
			if (response.data.id_ciudad == null || response.data.id_estado == null || response.data.id_pais == null) {
				$('#localidad').text('No has llenado o completado esta sección.');
			}else{
				$('#localidad').text(response.data.id_ciudad.municipio+','+response.data.id_estado.estado+','+response.data.id_pais.pais);
			}
			if (response.data.id_estudios == null){
				$('#estudio').text('Vacio');
			}else{
				$('#estudio').text(response.data.id_estudios.estudios);
			}
			if (response.data.id_area == null) {
				$('#area').text('Vacio');
			}else{
				$('#area').text(response.data.id_area.area);
			}
			if (response.data.conocimientos == null) {
				$('#Bconocimientos').text('No tienes conocimientos registrados.');
			}else{
				$('#Bconocimientos').text(response.data.conocimientos);
			}
			var show = '', lista = '';
			//console.log(response.data.tags);
			if(response.data.tags != null){
				for (tag of response.data.tags) {
					//console.log(tag.tag);
						lista = '<div class="chip" id="tags-chips">'
			              + tag.tag +
			            '</div>';
			            show += lista;
			            //out = '';
						//contenido += out;
				}
				//show = + show;
				//console.log(show);
				$('#tags-message').hide();
				$('#tags-chips').html(show);
			}else{
				$('#tags-message').text('No tienes habilidades(tags) registradas.');
			}
			Materialize.updateTextFields();
		}).catch(function(error){
			console.log(error);
			alert('Sucedio un error al cargar.');
		});

});
jQuery(document).on("click",'#SavePersonal',function(e){
	console.log('editar: '+POST_personal);
	var data = {
		nombre: $('#editNombre').val(),
		apellido: $('#editApellido').val(),
		telefono: $('#editTelefono').val(),
		fecha: $('#editFecha').val(), 
    	genero: $('input:radio[name=genero]:checked').val(),
		password: $('#password').val(),
  	};
  	axios.post(POST_personal ,JSON.stringify(data))
    .then(function(response){
      console.log(response);
      //alert(response.data.access_token);
      alert('Cambios realizados');
      //console.log(tok, id);
      //window.location.href = './../../perfil.html';
    })
    .catch(function(error){
      console.log(error.response);
      alert('Sucedio un problema, no se realizaron los cambios.');
    });

});