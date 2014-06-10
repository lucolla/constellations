 var constants = {
   infoWindowWidth: 300
};
 function addInfoMarker(titleString, myLatlng, map, contentString) {
		  var infowindow = new google.maps.InfoWindow({
			  content: contentString
		  });
		  
		  var marker = new google.maps.Marker({
			  position: myLatlng,
			  map: map,
			  title: titleString
		  });
		  google.maps.event.addListener(marker, 'click', function() {infowindow.open(map,marker)});
	}
  function addInfoImage(imageBounds, map, contentString) {
		  var infowindow = new google.maps.InfoWindow();
		  var infowindowOptions = {
		   content: contentString,
		   position: imageBounds.getCenter(),
		   maxWidth: constants.infoWindowWidth
		  }
		  infowindow.setOptions(infowindowOptions);
		  
		  rectangle = new google.maps.Rectangle();
		  
		  var rectangleOptions = {
			  map: map,
			  bounds: imageBounds
			};
		  rectangle.setOptions(rectangleOptions);
	
		  google.maps.event.addListener(rectangle, 'click', function() {infowindow.open(map)});
	}