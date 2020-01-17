 	url = 'http://192.168.1.72:8000/';
   login = 'api/login';
   
   POST_login = url + login;

function IniciarSesion(){
	axios({
		method: 'post',
		url: POST_login,
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
		if(error.response.status == 401){
			alert('Usuario y/o contraseña invalidos.');
		}else {
			console.log(error);
		}
		
	})
}


jQuery(document).on("click",'#login',function(e){
	console.log('IniciarSesion');
	console.log(POST_login);
	IniciarSesion();
	/*window.sqlitePlugin.echoTest(function(){
		alert("Prueba SQLite");
		console.log('done sqlite');
	});*/
});
jQuery(document).on("load",'.login-form', function(e){
	alert('Form cargado');
})
jQuery(document).ready(function(){
	alert('cargo.... done');
});