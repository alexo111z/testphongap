
jQuery(document).on("click",'#login',function(e){
	document.getElementById("texto").innerHTML = "Hola Marte!!!!";
       window.sqlitePlugin.echoTest(function(){
		alert("Prueba SQLite");
		
		document.getElementById("texto").innerHTML = "Hola Marte!!!!";
		});
    });
jQuery(document).ready(function(){
	window.sqlitePlugin.echoTest(function(){
		alert("Prueba SQLite");
	});
});