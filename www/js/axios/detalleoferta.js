url = 'http://192.168.1.95:8000/';
oferta = 'api/oferta/';

GET_oferta = url + oferta;
//const axios = require('axios');
// GET_ofertas = 'http://capp.axo-corp.com/api/v1/getBranches';

function loadOfertas(oferta){
 axios.get(GET_oferta+oferta)
         .then(function(response){
             console.log(response);
             if(response.status == 204){
                 console.log('No se encontra la oferta.');
             }else{
                item=response.data;
                nombre = "";
                show ="";
                var estado = 1;
                for (tag of item.tags) {
                    //<span class="px-2 border rounded">Tag1</span>
                    nombre = '<span class="px-2 border rounded">'+tag.tag+'</span>';
                    show += nombre;
                }
                $('#titulo').html(item.titulo);
                $('#dcorta').html(item.d_corta);
                if(item.salario!=null){$('#salario').html('$'+ item.salario);}
                $('#ubicacion').html('<i class="material-icons align-text-bottom">room</i>'+item.id_ciudad+', '+ item.id_estado+','+item.id_pais);
                $('#d-larga').html(item.d_larga);
                $('.tags').html(show);
                $('#btn-postular').html('<button type="button" class="btn btn-info w-75">postularme</button>');
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

function $_GET(param)
{
    /* Obtener la url completa */
    url = document.URL;
    /* Buscar a partir del signo de interrogación ? */
    url = String(url.match(/\?+.+/));
    /* limpiar la cadena quitándole el signo ? */
    url = url.replace("?", "");
    /* Crear un array con parametro=valor */
    url = url.split("&");
    x = 0;
    while (x < url.length)
    {
        p = url[x].split("=");
        if (p[0] == param)
        {
            return decodeURIComponent(p[1]);
        }
        x++;
    }
}