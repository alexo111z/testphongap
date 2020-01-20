url = 'http://192.168.1.72:8000/';
oferta = 'api/oferta/';

GET_oferta = url + oferta;
GET_logo = url+'api/logos/';
//const axios = require('axios');
// GET_ofertas = 'http://capp.axo-corp.com/api/v1/getBranches';

function loadOfertas(oferta){
 axios.get(GET_oferta+oferta,{
                params:{
                    id_user: localStorage.getItem('id')
                }
            })
         .then(function(response){
             console.log(response);
             if(response.status == 204){
                 console.log('No se encontra la oferta.');
             }else{
                item=response.data;
                nombre = "";
                show='';
                if(item.tags.length<=0){
                    show ='<span><i class="material-icons grey-text align-text-bottom icon-info">info</i>Esta oferta no tiene tags que mostrar.</span>';
                }
               var estado = 1;
                for (tag of item.tags) {
                    //<span class="px-2 border rounded">Tag1</span>
                    nombre = ' <div class="chip">'+tag.tag+'</div>';
                    show += nombre;
                }
                $('#titulo').html(item.titulo);
                $('#dcorta').html(item.d_corta);
                if(item.salario!=null){$('#salario').html('$'+ item.salario);}
                $('#ubicacion').html('<i class="material-icons align-text-bottom">room</i>'+item.id_ciudad+', '+ item.id_estado+','+item.id_pais);
                $('#d-larga').html(item.d_larga);
                $('.tags').html(show);
                $('#nombre-empresa').html(item.id_emp);
                if(item.logo==null){
                $('#imglogo').attr("src",url + "api/logos/empresa.png");
                }else{$('#imglogo').attr("src",url + "api/logos/"+item.logo);}
                if(item.estado=='1'){
                    $('#btn-postular').html('<button id="btn-cancelar" type="button" class="btn btn-danger w-75">Cancelar Postulación</button>');
                }else{
                    $('#btn-postular').html('<button id="btn-postularme" type="button" class="btn btn-info w-75">postularme</button>');
                }
                    $('#divcargando').hide();
            }
         })
         .catch(function(error){
             console.log(error);
             alert(error);
         })
 }

jQuery(document).ready(function(){
    var oferta=$_GET("oferta");
    loadOfertas(oferta);
});


$(document).on("click",'#btn-postularme',function(e){
 //const res = axios.post('http://192.168.1.95:8000/api/postular/'+$_GET("oferta") );
 var data= {
    id_user: localStorage.getItem('id')
  };

axios.post(url + 'api/postular/'+$_GET("oferta"),$.param(data,true))
    .then(function(response){
        location.reload();
        console.log(response);
    })
    .catch(function(error){
        if (error.response.status == 401) {
            alert('Datos incorrectos');
        }
    console.log(error.response);

    });

});
$(document).on("click",'#btn-cancelar',function(e){
    //const res = axios.post('http://192.168.1.95:8000/api/postular/'+$_GET("oferta") );
    var data= {
       id_user: localStorage.getItem('id')
     };
   
   axios.post(url + 'api/cancelar/'+$_GET("oferta"),$.param(data,true))
       .then(function(response){
           location.reload();
           console.log(response);
       })
       .catch(function(error){
           if (error.response.status == 401) {
               alert('Datos incorrectos');
           }
       console.log(error.response);
   
       });
   
   });
   

function $_GET(param)
{
    /* Obtener la url completa */
    url1 = document.URL;
    /* Buscar a partir del signo de interrogación ? */
    url1 = String(url1.match(/\?+.+/));
    /* limpiar la cadena quitándole el signo ? */
    url1 = url1.replace("?", "");
    /* Crear un array con parametro=valor */
    url1 = url1.split("&");
    x = 0;
    while (x < url1.length)
    {
        p = url1[x].split("=");
        if (p[0] == param)
        {
            return decodeURIComponent(p[1]);
        }
        x++;
    }
}