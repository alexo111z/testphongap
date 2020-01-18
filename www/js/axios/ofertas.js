   url = 'http://192.168.1.68:8000/';
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
					out='<div class="alert alert-info" role="alert">'+
					'<i class="fa fa-info-circle" aria-hidden="true"></i> No hay empleos que mostrar que coincidan con tu búsqueda.<br><br>'+
					'<p>Te sugerimos:</p>'+
					'<ul>'+
						'<li>Utilizar palabras comunes o sinónimos</li>'+
						'<li>Revisar la ortografía</li>'+
						'<li>Realizar una nueva búsqueda</li>'+
					'</ul>'+
				  '</div>';
   				$('#oferta').html(out);
				}else{

				contenido = '';
				for(item of response.data){
			 		icono = '<span><i class="material-icons align-text-bottom" >local_offer</i></span>';
					nombre = "";
					coma = '<span>,</span>';
					show ="";
					var estado = 1;
					if(item.tags.length>0){
						for (tag of item.tags) {
								nombre = '<small>'+tag.tag+'</small>';
								show +=nombre;
								if(tag != item.tags[item.tags.length-1]){
									show += coma;
								}
						}
						show = icono + show;
					}
					 out = '<div class="div-oferta mb-3 no-gutters border rounded overflow-hidden flex-md-row shadow-sm h-md-250" data-href="./detalleoferta.html?oferta='+item.id+'" novalidate>'+
								'<div class="col-sm-12 px-3 pt-3"><h4 class="mb-0">'+item.titulo+'</h4></div>'+
								'<div class="col-sm-12 px-3 mt-0 pt-0"><small class="text-muted text-uppercase">'+item.id_emp+'</small></div>'+
								'<div class="col-sm-12 px-3 mt-1">'+
									'<p>'+item.d_corta+'</p>'+
								'</div>'+
								'<div class="row col-sm-12 px-3">'+
									'<div class="col-sm-6 ml-0 pl-0">'+
										'<p class="text-muted"><i class="fas fa-map-marker-alt"></i> '
											+item.id_ciudad+','+item.id_estado+','+item.id_pais+
										'</p>'+
									'</div>'+
									'<div class="tags col-sm-6 text-right pb-3 pr-0 mr-0">'+
										show+
									'</div>'+
								'</div>'+
							'</div>';
							contenido += out;
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
});
$(document).on("click",'.div-oferta',function(e){
	document.location.href = $(this).data('href');
});

   