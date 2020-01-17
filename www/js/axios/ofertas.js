   url = 'http://192.168.1.95:8000/';
   ofertas = 'api/ofertas';
   
  GET_ofertas = url + ofertas;
   //const axios = require('axios');
  // GET_ofertas = 'http://capp.axo-corp.com/api/v1/getBranches';

function loadOfertas(buscar){
	axios.get(GET_ofertas,{
			params:{
				search: buscar,
			}
		})
			.then(function(response){
				console.log(response);
				if(response.status == 204){
					console.log('No se encontraron ofertas.');
				}else{

				contenido = '';
				for(item of response.data){
			 		icono = '<i class="fas fa-tags"></i>';
					nombre = "";
					coma = "";
					show ="";
					var estado = 1;
					for (tag of item.tags) {

					nombre = '<span>'+tag.tag+'</span>';
					coma = '<span>,</span>';

					show += nombre+coma;
					//console.log(show);
					}
					show = icono + show;

					 out = '<div class="div-oferta mb-3 no-gutters border rounded overflow-hidden flex-md-row shadow-sm h-md-250" onclick="" novalidate>'+
								'<div class="col-sm-12 px-3 pt-3"><h4 class="mb-0">'+item.titulo+'</h4></div>'+
								'<div class="col-sm-12 px-3 mt-0 pt-0"><small class="text-muted text-uppercase">'+item.id_emp+'</small></div>'+
								'<div class="col-sm-12 px-3 mt-1">'+
									'<p>'+item.d_corta+'</p>'+
								'</div>'+
								'<div class="row col-sm-12 px-3">'+
									'<div class="col-sm-6">'+
										'<p class="text-muted"><i class="fas fa-map-marker-alt"></i> '
											+item.id_ciudad+','+item.id_estado+','+item.id_pais+
										'</p>'+
									'</div>'+
									'<div class="tags  col-sm-6 text-right pb-3 pr-0 mr-0">'+
										show+
									'</div>'+
								'</div>'+
							'</div>';
                 	contenido += out;
                  //console.log(contenido);
				}
   				out = contenido;
   				$('#oferta').html(out);
				}
			})
			.catch(function(error){
				console.log(error);
				alert(error);
			})
	}

jQuery(document).ready(function(){
	console.log("load");
	loadOfertas();
});

jQuery('#search').change(function(data){
	cadena = $('#search').val();
	console.log(cadena);
	loadOfertas(cadena);
})

   