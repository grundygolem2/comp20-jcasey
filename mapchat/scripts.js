var map;

function loadPage() {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      renderMap(position.coords.latitude, position.coords.longitude);
    });}
  else {
    alert("No Geolocation");
  }
}

function renderMap(lat,lng)
{
  var myPos = new google.maps.LatLng(lat, lng);
  map = new google.maps.Map(document.getElementById("map"),
                            {center:myPos,
                             zoom:15});
  map.panTo(myPos);
  var req = new XMLHttpRequest();
  req.onreadystatechange = function()
  {
    if(req.readyState == 4)
    {
      data = JSON.parse(req.responseText);
      placeMarkers(data, lat, lng);
    }
  };
  req.open("POST", "https://secret-about-box.herokuapp.com/sendLocation",true);
  req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  req.send("login=HarleyRhoden&lat="+lat+"&lng="+lng+"&message=Mr_Spooky_Skeletal");
}

function placeMarkers(data, lat, lng)
{
  for (var i = 0; i < data.length; i++)
  {
     var pos = new google.maps.LatLng(data[i].lat, data[i].lng);
     var marker = new google.maps.Marker({
                              title: data[i].login,
                              position:pos,
                              map: map,
                              });
     var content = "<div id='content'>" +
                     "<div id='login'>Name: " + data[i].login + "</div>" +
                     "<div id='lat'>Latitude: " + data[i].lat + "</div>" +
                     "<div id='lng'>Longitude: " + data[i].lng + "</div>" +
		     "<div id='message'>Message: "+ data[i].message+ "</div>" +
		     "<div id='distance'>Distance: " + haversine(data[i].lat, data[i].lng, lat, lng) + "</div>"+
                   "</div>"
     var infowindow = new google.maps.InfoWindow();
     if (marker.title == "HarleyRhoden") {
       var image = "special.png";
       marker.setIcon(image);
     }
     google.maps.event.addListener(marker, 'click', (function(marker, content, infowindow) {  
           return function() { 
               var info = content; 
               infowindow.setContent(info);  
               infowindow.open(map, marker);  
           }  
     })(marker, content, infowindow));
  } 
}

function haversine(lat, lng, lat2, lng2) 
{
  Number.prototype.toRad = function() {
    return (this*Math.PI)/180;
  }
  var R = 3961;
  var dLat = lat - lat;
  var dLng = lng - lng2;
  var dLatR = dLat.toRad();
  var dLngR = dLng.toRad();
  var a = Math.sin(dLatR/2) * Math.sin(dLatR/2) + 
                Math.cos(lat.toRad()) * Math.cos(lat2.toRad()) * 
                Math.sin(dLngR/2) * Math.sin(dLngR/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R*c;
}
