   url = 'http://127.0.0.1:8000/';
   ofertas = 'api/ofertas';
   
   GET_ofertas = url + ofertas;
   //const axios = require('axios');

jQuery(document).ready(function(){
	console.log("load");
	axios.get(GET_ofertas)
			.then(function(response){
				console.log(response);
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
				
			})
			.catch(function(error){
				console.log(error);
			})
});

      /*jQuery.ajax({
            url: GET_ofertas,
            method: 'GET',
            success: function(result){
               console.log(result);

               var contenido = "";
               var out = "";
               for(item of result) {

                  icono = '<i class="fas fa-tags"></i>';
                  nombre = "";
                  coma = "";
                  show ="";
                  var estado = 1;
                  for (tag of item.tags) {
                  
                  nombre = '<span>'+tag.tag+'</span>';
                  coma = '<span>,</span>';

                  show += nombre+coma;
                  console.log(show);
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

            },
            error: function(jqXHR, exception){
               var msg = '';
               if (jqXHR.status === 0) {
                     msg = 'Not connect.\n Verify Network.';
               } else if (jqXHR.status == 404) {
                     msg = 'Requested page not found. [404]';
               } else if (jqXHR.status == 500) {
                     msg = 'Internal Server Error [500].';
               } else if (exception === 'parsererror') {
                     msg = 'Requested JSON parse failed.';
               } else if (exception === 'timeout') {
                     msg = 'Time out error.';
               } else if (exception === 'abort') {
                     msg = 'Ajax request aborted.';
               } else {
                     msg = 'Uncaught Error.\n' + jqXHR.responseText;
               }
               alert("Error al actualizar, intentelo más tarde: "+msg);
               console.lgo('error');
            }
         });        
   })*/
   

   