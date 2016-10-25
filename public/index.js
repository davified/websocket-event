$(function() {
  var socket = io.connect();
  var $messageForm = $('#messageForm');
  var $message = $('#message');
  var $chat = $('#chat');
  var $messageArea = $('#messageArea');
  var $userFormArea = $('#userFormArea');
  var $userForm = $('#userForm');
  var $users = $('#users');
  var $username = $('#username');


  $messageForm.submit(function(e){
      e.preventDefault();
      console.log('submitted');
      socket.emit('send message', $message.val());
      $message.val(' ');
  });

  socket.on('new message', function(data){
    $chat.append('<div class="well"><strong>'+data.user+'</strong>: '+data.msg+'</div>');
  });


  //submit username
  $userForm.submit(function(e){
      e.preventDefault();
      console.log('submitted');
      socket.emit('new user', $username.val(), function(data){
        if(data){
          $userFormArea.hide();
          $messageArea.show();
        }
      });
      $username.val(' ');
  });

  //show username on the left
  socket.on('get users', function(data){
    var html = '';
    for(i = 0; i < data.length;i++){
      html += '<li class="list-group-item">'+data[i]+'</li>'
          ;
    }
    $users.html(html);
  })

});﻿

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 14,
    center: {lat: 1.3033321, lng: 103.8346003}
  });
  var geocoder = new google.maps.Geocoder();

  document.getElementById('submit').addEventListener('click', function() {
    geocodeAddress(geocoder, map);
  });
  console.log("map is loaded")
}

function geocodeAddress(geocoder, resultsMap) {
  var address = document.getElementById('address').value;
  geocoder.geocode({'address': address}, function(results, status) {
    if (status === 'OK') {
      resultsMap.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: resultsMap,
        position: results[0].geometry.location
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
  });
}
