/* global $ L */
var socket = io.connect()

$(document).ready(function () {
  // loading the base map
  var mymap = L.map('mapid').setView([1.3481, 103.8208], 12)

  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: '<a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    zoomControl: false,
    accessToken: 'pk.eyJ1IjoiZGF2aWZpZWQiLCJhIjoiY2lxYWoxMnF3MDF0Z2Z2bTZ6MHl3cWdiMyJ9.JhNjMNWSTxbGzp7ck3ahMA'
  }).addTo(mymap)

  $('button#submit').click(function() {
    var searchTerm = $('input#search').val()
    console.log(searchTerm);
    socket.emit('search', searchTerm)
  })

  socket.on('geocoded latlong', function(data) {
    var marker = L.marker([data.latlng.lat, data.latlng.lng]).addTo(mymap);
    console.log(data.latlng.lat);
    console.log(data.latlng.lng);

    $('ul#list').append('<li>' + data.place + '</li>')
  })


  // making ajax request to our own api
  // function getData () {
  //   $.ajax({
  //     url: 'https://carparks-sg.herokuapp.com/api',
  //     // url: 'http://localhost:3000/api',
  //     type: 'GET',
  //     success: function (data) {
  //       visualiseData(data)
  //     }
  //   })
  // }
  //
  // // adding all circles to a layer so that we can remove and re-add the circles every time the API call is made (once per minute)
  // var circlesGroup = new L.FeatureGroup()
  //
  // //  DEFINE FUNCTION FOR VISUALISING DATA RETURNED FROM AJAX CALL
  // function visualiseData (data) {
  //   data.sort(function (b, a) { return (a.Development > b.Development) ? 1 : ((b.Development > a.Development) ? -1 : 0) })
  //
  //   for (var i = 0; i < data.length; i++) {
  //     var lon = data[i].Longitude
  //     var lat = data[i].Latitude
  //     var lots = data[i].Lots
  //     var message = data[i].Development + ': ' + data[i].Lots + ' lots left'
  //
  //     // appending class properties so that we can manipulate each data point in the DOM
  //     $('ul.dropdown-menu').prepend('<li class="carpark" name="' + data[i].Development + '" lon="' + data[i].Longitude + '" lat="' + data[i].Latitude + '" lots="' + data[i].Lots + '"><a href="#">' + data[i].Development + '</a></li>')
  //
  //     var intensity = lots / 600
  //
  //     if (lots > 50) {
  //       var circle = L.circle([lat, lon], 80, {
  //         fillColor: '#09AD83',
  //         fillOpacity: intensity,
  //         stroke: false,
  //         className: 'animate'
  //       })
  //       circle.bindPopup(message)
  //       circlesGroup.addLayer(circle)
  //     } else {
  //       circle = L.circle([lat, lon], 80, {
  //         fillColor: '#FF6A59',
  //         fillOpacity: 0.8,
  //         stroke: false,
  //         className: 'animate'
  //       })
  //       circle.bindPopup(message)
  //       circlesGroup.addLayer(circle)
  //     }
  //   }
  //   mymap.addLayer(circlesGroup)
  //   setTimeout(function () {
  //     mymap.removeLayer(circlesGroup)
  //   }, 59500)
  // }
})
