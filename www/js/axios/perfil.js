
url = 'http://192.168.1.68:8000/';
perfil = 'api/perfil';

POST_perfil = url + perfil;
	

jQuery(document).ready(function(){
	console.log("perfil");

	//axios.defaults.headers.common['Authorization'] = 'Bearer '+localStorage.getItem('token');
	axios.post(url+'/api/ofertas')
		.then(function(response){
			console.log(response);
		})
		.catch(function(error){
			console.log(error);
		});

});