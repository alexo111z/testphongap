
url = 'http://192.168.1.95:8000/';
perfil = 'api/perfil/';

var id = localStorage.getItem('id');

var borrar = [];
var addTags = [];

POST_perfil = url + perfil+id;
POST_personal = url + '/api/edit/personales/' + id;
POST_localidad = url + '/api/edit/localidad/' + id;
POST_laboral = url + '/api/edit/laboral/' + id;
POST_academica = url + '/api/edit/academica/' + id;
GET_lugares = url+'/api/localidades';
	

jQuery(document).ready(function(){
	console.log("editar perfil");
	//Calendario
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
			var elements = '', show = '';
			for(pais of response.data.pais){
				elements =  '<p><label><input name="pais" value="'+pais.id+'" type="radio" id="pais'+pais.id+'" />'+
                        '<label for="pais'+pais.id+'">'+pais.pais+'</label></label></p>';
               	show += elements;
			}
			$('.container.pais').html(show);

			elements = '', show = '';
			for(estudio of response.data.nivel){
				elements = '<p><label><input name="estudio" value="'+estudio.id+'" type="radio" id="estudio'+estudio.id+'" />'+
                        '<label for="estudio'+estudio.id+'">'+estudio.nivel+'</label></label></p>';
				show += elements;
			}
			$('.container.estudios').html(show);

			elements = '', show = '';
			for(area of response.data.area){
				elements = '<p><label><input name="area" value="'+area.id+'" type="radio" id="area'+area.id+'" />'+
                        '<label for="area'+area.id+'">'+area.area+'</label></label></p>';
				show += elements;
			}
			$('.container.areas').html(show);

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

			$('input:radio[id=estudio'+response.data.id_estudios.id+']').attr('checked', true);
			$('input:radio[id=area'+response.data.id_area.id+']').attr('checked', true);

			$('#editConocimientos').text(response.data.conocimientos);
			var show = '', lista = '';
			//console.log(response.data.tags);
			if(response.data.tags != null){
				for (tag of response.data.tags) {
					//console.log(tag.tag);
						lista = '<div class="chip">'
                      				+'<label class="tag">'+tag.tag+'</label>'+
                      				'<i class="close material-icons cerrar" id="'+tag.id+'">close</i>'+
                      			'</div>';
			            show += lista;
			            //out = '';
						//contenido += out;
				}
				//show = + show;
				//console.log(show);
				$('.tags-elemnt').html(show);
			}else{
				$('#tags-message').text('No tienes habilidades(tags) registradas.');
			}
			$('#editConocimientos').attr('disabled', false);
			$('#newTag').attr('disabled', false);
			Materialize.updateTextFields();
		}).catch(function(error){
			console.log(error);
			alert('Sucedio un error al cargar.');
		});

});
jQuery(document).on("click",'input[name=pais]',function(e){ //Actualizar estadis
	axios.get(GET_lugares)
		.then(function(response){
			//console.log(response.data.pais);
			var elements = '', show = '';
			for(estado of response.data.estado){
				if(estado.id_pais == $('input:radio[name=pais]:checked').val()){
					elements =  '<p><label><input name="estado" value="'+estado.id+'" type="radio" id="estado'+estado.id+'" />'+
	                        '<label for="estado'+estado.id+'">'+estado.estado+'</label></label></p>';
	            	show += elements;
                }
			}
			$('.container.estado').html(show);
			var ciudad = '<p><label><input name="ciudad" value="" type="radio" id="ciudad" disabled="" /><label for="ciudad">esperando...</label></label></p>';
			$('input[name=ciudad]').attr('checked', false);
			$('.container.ciudad').html(ciudad);
		});
})
jQuery(document).on("click",'input[name=estado]',function(e){ //Actualizar ciudades
	axios.get(GET_lugares)
		.then(function(response){
			//console.log(response.data.pais);
			var elements = '', show = '';
			for(ciudad of response.data.ciudad){
				if(ciudad.id_estado == $('input:radio[name=estado]:checked').val()){
					elements =  '<p><label><input name="ciudad" value="'+ciudad.id+'" type="radio" id="estado'+ciudad.id+'" />'+
	                        '<label for="estado'+ciudad.id+'">'+ciudad.municipio+'</label></label></p>';
	            	show += elements;
                }
			}
			$('.container.ciudad').html(show);
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
      window.location.href = './../../perfil.html';
    })
    .catch(function(error){
      console.log(error.response);
      alert('Sucedio un problema, no se realizaron los cambios.');
      location.reload();
    });

});
jQuery(document).on("click",'#SaveLocalidad',function(e){
	console.log('editar: '+POST_localidad);
	var data = {
		pais: $('input:radio[name=pais]:checked').val(),
		estado: $('input:radio[name=estado]:checked').val(),
		ciudad: $('input:radio[name=ciudad]:checked').val(),
	}
	axios.post(POST_localidad ,JSON.stringify(data))
	.then(function(response){
		console.log(response);
		alert('Cambios realizados');
		window.location.href = './../../perfil.html';
	})
	.catch(function(error){
      console.log(error.response);
      alert('Sucedio un problema, no se realizaron los cambios.');
      location.reload();
    });
});
jQuery(document).on("click",'#SaveAcademica',function(e){
	console.log('editar: '+POST_academica);
	var data = {
		estudios: $('input:radio[name=estudio]:checked').val(),
		area: $('input:radio[name=area]:checked').val(),
	}
	axios.post(POST_academica ,JSON.stringify(data))
	.then(function(response){
		console.log(response);
		alert('Cambios realizados');
		window.location.href = './../../perfil.html';
	})
	.catch(function(error){
      console.log(error.response);
      alert('Sucedio un problema, no se realizaron los cambios.');
      location.reload();
    });
});

jQuery(document).on("click",'.material-icons.cerrar',function(e){ //Al eliminar
	if (parseInt( $(this).attr('id')) != 0 ){
		borrar.push(parseInt( $(this).attr('id') ));
	}else{
		//console.log($(this).attr('name'));
		removeItemFromArr(addTags, $(this).attr('name'));
	}
	console.log(borrar);
	if (contarTags() < 10) {
		//$('#editConocimientos').attr('disabled', false);
		$('#newTag').attr('disabled', false);
	}
	
})
jQuery(document).on("change",'#newTag',function(e){ //Al agregar
	var nuevo = '';
	if ($('#newTag').val().trim() != '') {
		//alert($('#newTag').val());
		nuevo = '<div class="chip">'
  				+'<label class="tag">'+$('#newTag').val()+'</label>'+
  				'<i class="close material-icons cerrar" name="'+$('#newTag').val()+'" id="0">close</i>'+
  			'</div>';
		$('.tags-elemnt').append(nuevo);
		addTags.push($('#newTag').val());
		console.log(addTags);
		$('#newTag').val('');
	}

	if (contarTags() == 10) {
		//$('#editConocimientos').attr('disabled', false);
		$('#newTag').attr('disabled', true);
	}

});
function contarTags(){
		var x = {}; 
		x =$('label.tag').length;
		console.log(x);
		return x;
}
function removeItemFromArr ( arr, item ) {
    var i = arr.indexOf( item );
 
    if ( i !== -1 ) {
        arr.splice( i, 1 );
    }
}


jQuery(document).on("click",'#SaveLaboral',function(e){
	console.log(borrar);
	console.log(addTags);
	var data = {
		delete: borrar,
		add: addTags,
		conoc: $('#editConocimientos').val(),
	}
	console.log('editar: '+POST_laboral);
	
	axios.post(POST_laboral ,JSON.stringify(data))
	.then(function(response){
		console.log(response);
		alert('Cambios realizados');
		window.location.href = './../../perfil.html';
	})
	.catch(function(error){
      console.log(error.response);
      alert('Sucedio un problema, no se realizaron los cambios.');
      location.reload();
    });

})