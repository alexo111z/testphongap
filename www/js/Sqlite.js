 	url = 'http://192.168.1.72:8000/';
   login = 'api/login';
   
   POST_login = url + login;

function IniciarSesion(){
	axios({
		method: 'post',
		url: POST_login,
		timeout: 6000,
		headers: { 
			'Accept': 'application/json', 'Content-Type': 'application/json; charset=UTF-8', 
		},
		data: {
			email: $('#email').val(),
			password: $('#password').val(),
		}
	})
	.then(function(response){
		if(response.status == 401){
			alert('Usuario y/o contraseña invalidos.');
		}
		alert(response.data.access_token);
		console.log(response);
	})
	.catch(function(error){
		console.log(error);
		/*if(error.response.status == 401){
			alert('Usuario y/o contraseña invalidos.');
		}else {
			console.log(error);
		}*/
		
	})
}


jQuery(document).on("click",'#login',function(e){

	 var data= {
    	email: $('#email').val(),
		password: $('#password').val(),
  	};

  axios.post(url + '/api/login',JSON.stringify(data))
    .then(function(response){
      console.log(response);
      //alert(response.data.access_token);
      var tok = response.data.access_token;
      var id = response.data.id;
      localStorage.setItem('token', tok)
      localStorage.setItem('id', id)
      //console.log(tok, id);
      //window.location.href = 'perfil.html';
    })
    .catch(function(error){
    	if (error.response.status == 401) {
    		alert('Datos incorrecots');
    	}
      console.log(error.response);

    });

});
jQuery(document).on("load",'.login-form', function(e){
	alert('Form cargado');
})
jQuery(document).ready(function(){
	//alert('cargo.... done');

	/*// Store value on browser for duration of the session
	sessionStorage.setItem('key', 'value');

	// Retrieve value (gets deleted when browser is closed and re-opened) ...
	alert(sessionStorage.getItem('key'));

	// Store value on the browser beyond the duration of the session
	localStorage.setItem('key', 'value');

	// Retrieve value (persists even after closing and re-opening the browser)
	alert(localStorage.getItem('key'));*/

});