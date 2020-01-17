
jQuery(document).on("click",'#login',function(e){
       window.sqlitePlugin.echoTest(function(){
		alert("Prueba SQLite");
		console.log('done sqlite');
		document.getElementById("texto").innerHTML = "Hola Marte!!!!";
		});
    });
jQuery(document).ready(function(){
	 window.sqlitePlugin.echoTest(function(){
		alert("Prueba SQLite");
		
		});
});