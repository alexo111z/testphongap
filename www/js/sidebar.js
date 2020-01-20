url = 'http://192.168.1.72:8000/';
// SIDEBAR
$(document).ready(function(){
   $('#user-name').html(localStorage.getItem('nombre')+' '+ localStorage.getItem('apellido') );
   $('#user-email').html(localStorage.getItem('email'));
    $('#user-img').attr('src',url +'api/usuarios/fotos/'+localStorage.getItem('id'));
    // SIDE OPTIONS
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 300
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true, // Choose whether you can drag to open on touch screens,
        onOpen: function(el) { /* Do Stuff */ }, // A function to be called when sideNav is opened
        onClose: function(el) { /* Do Stuff */ }, // A function to be called when sideNav is closed
    }
    );
    $(document).on("click",'#logout',function(e){
        localStorage.clear();
        document.location.href = 'index.html';
    });


    // START OPEN
    //$('.button-collapse').sideNav('show');
    $(".button-collapse").sideNav();// Initialize collapsible (uncomment the line below if you use the dropdown variation)
    //$('.collapsible').collapsible();
  });



