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

function InicioConJQuery(){
	jQuery.ajax({
		url: POST_login,
		type: 'post',
		data: {
			email: $('#email').val(),
			password: $('#password').val(),
		}
	}).done(function(data){
		
		console.log(data.access_token);
		console.log('efectivamente logueado');
		console.log(data);
	}).fail(function(jqXHR, exception){
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
		console.log(msg);
	});
}


jQuery(document).on("click",'#login',function(e){

	console.log('IniciarSesion');
	console.log(POST_login);
	IniciarSesion();

	/*window.sqlitePlugin.echoTest(function(){
		alert("Prueba SQLite");
		console.log('done sqlite');
	});*/

	//var db=window.sqlitePlugin.openDatabase({name: 'acceso.db', location: 'default'});

});
jQuery(document).on("load",'.login-form', function(e){
	alert('Form cargado');
})
jQuery(document).ready(function(){
	alert('cargo.... done');

	/*// Store value on browser for duration of the session
	sessionStorage.setItem('key', 'value');

	// Retrieve value (gets deleted when browser is closed and re-opened) ...
	alert(sessionStorage.getItem('key'));

	// Store value on the browser beyond the duration of the session
	localStorage.setItem('key', 'value');*/

	// Retrieve value (persists even after closing and re-opening the browser)
	alert(localStorage.getItem('key'));

});