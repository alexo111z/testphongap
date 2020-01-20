

url = 'http://192.168.1.95:8000/';
perfil = 'api/perfil';


var id = localStorage.getItem('id');

POST_perfil = url + perfil+id;
	

jQuery(document).ready(function(){
	console.log("perfil");
	//axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
	axios.get(POST_perfil)
		.then(function(response){
			console.log(response.data);
			$('#nombre').text(response.data.nombre+' '+response.data.apellido);
			$('#email').text(response.data.email);
			if (response.data.telefono == null) {
				$('#telefono').text('No has registrado numero telefonico.');
			}else{
				$('#telefono').text(response.data.telefono);
			}
			if (response.data.genero == 1) {
				$('#genero').text('Mujer');
			}else{
				$('#genero').text('Hombre');
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
			
		}).catch(function(error){
			console.log(error);
			alert('Sucedio un error al cargar.');
		});

});