url = 'http://192.168.1.68:8000/';
var app = angular.module('mainModule', []);

app.controller('mainController', function($scope, $http){ //o scope liga o js e o template
  $scope.nome = 'Valor Inicial';
  //$http.get().success();
  $scope.reset = function()
  {
    $scope.nome = '';
  }
});

$(document).on("click",'#login',function(e){
  //const res = axios.post(url +'api/login')
  /*var data= {
    email: $('#email').val(),
    password: $('#password').val()
  };*/
  var data= {
    email: $('#email').val(),
    password: $('#password').val()
  }

  axios.post(url + 'api/login',$.param(data,true))
    .then(function(response){
      console.log(response);
    })
    .catch(function(error){
      console.log(error);
    });
});

