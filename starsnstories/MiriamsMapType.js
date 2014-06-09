/**
 * Created by chu on 5/22/2014.
 */

illuskyTypeOptions = {
    getTileUrl: function(coord,zoom){
        //return "/StarsNStories/Pictures/map.jpg";
        //return "starfield.jpg"


        var numTiles = null;
        //if ( zoom == 1 ) numTiles = 48;
        //if ( zoom == 3 ) numTiles =  1728 ;
        // var numTiles = 1 << zoom; //  1 << x = 1 * 2 ** x
        numTiles =( zoom - 1 ) * 18 + 48;




        // Don't wrap tiles vertically.
        if (coord.y < 0 || coord.y >= numTiles) {
            return null;
        }



        return "mapMiriam.jpg";
    },
    tileSize: new google.maps.Size(256,256),
    maxZoom: 9
    ,minZoom: 2
    ,radius: 1738000
    ,name: "illuSky"

};

var illuskyMapType = new google.maps.ImageMapType(illuskyTypeOptions);

function initialize(){
    var myLatLng = new google.maps.LatLng(0,0);
    var mapOptions = {
        center: myLatLng,
        zoom: 1,
        streetViewControl: false,
        mapTypeControlOptions:{
            mapTypeIds:["illuSky"]
        }

    };
    var map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);
    map.mapTypes.set('illuSky',illuskyMapType);
    map.setMapTypeId('illuSky');
}


google.maps.event.addDomListener(window, 'load', initialize);


