/**
 * Created by chu on 6/14/2014.
 */

var mapTypes = {};

//Keep track of version of the file
function sayHello() {
    var msg = 'MiriamGreekSky 1.1 \n'+
        '1.12 Added constellations separated images - https://productforums.google.com/forum/#!topic/earth/alXEPxkK3g0  \n'+
        '1.11 Added Miriam map of the sky - jpg  \n'+
        '1.10 Added pop-up Info Area  \n'+
        '1.9  Added pop-up Info Marker  \n'+
        '1.8  Added opacity knob \n'+
        '1.3  Added Map type G_SKY_MAP_TYPES \n'+
        '1.2  Added Google Maps Java Script API v3 Key from Sergiu \n'+
        '1.1  Added example from google maps tutorial ';
    alert(msg);
}

// set up the map types


mapTypes['illusky'] = {
    getTileUrl: function(coord,zoom){
        //return "/StarsNStories/Pictures/map.jpg";
        //return "starfield.jpg"

        var xTile =    coord.x ;
        var yTile = coord.y ;

        //if ( zoom == 1 ) numTiles = 48;
        //if ( zoom == 3 ) numTiles =  1728 ;
        // var numTiles = 1 << zoom; //  1 << x = 1 * 2 ** x

        //var numTiles = ( zoom - 1 ) * 18 + 48;

        var numTiles = 1 << zoom ;
        // Don't wrap tiles vertically.
        if (coord.y < 0 || coord.y >= numTiles) return null;
        if (coord.x < 0 || coord.x >= numTiles) return null;

        if (zoom == 3) {
            var num = yTile * 8 + xTile + 1;
            num = num.toString();
            if (num.length == 1) num = '0' + num;
            return './Pictures/zoom1/miriams_celectial_map_zoom1_' + num + '.png';
        }

        if (zoom == 6){
            if (coord.x >= 48) return null;
            if (coord.y >= 36) return null;

            return './Pictures/zoom3/slice_' + yTile.toString() + '_' + xTile.toString() + '.png';
        }
        //return './Pictures/mapMiriam256.jpg';
    }
    ,tileSize: new google.maps.Size(256,256)
    ,maxZoom: 6
    ,minZoom: 3
    ,radius: 1738000
    ,name: "illuSky"
};

mapTypes['sky'] = {
    getTileUrl: function(coord, zoom) {

        // if (coord.x < 0 || coord.y < 0) return null;
        // var tileNum = 1 << zoom;
        // if (coord.x >= tileNum || coord.y >= tileNum) return null;

        return getHorizontallyRepeatingTileUrl(coord, zoom, function(coord, zoom) {
            return "http://mw1.google.com/mw-planetary/sky/skytiles_v1/" +
                coord.x + "_" + coord.y + '_' + zoom + '.jpg';

        });
    },
    releaseTile: function(tile){return null;},
    tileSize: new google.maps.Size(256, 256),
    isPng: false,
    maxZoom: 13,
    minZoom: 2,
    radius: 57.2957763671875,
    name: 'Sky',
    credit: 'Image Credit: SDSS, DSS Consortium, NASA/ESA/STScI'
};

// Normalizes the tile URL so that tiles repeat across the x axis (horizontally) like the
// standard Google map tiles.
function getHorizontallyRepeatingTileUrl(coord, zoom, urlfunc) {
    var y = coord.y;
    var x = coord.x;

    // tile range in one direction range is dependent on zoom level
    // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
    var tileRange = 1 << zoom;

    // don't repeat across y-axis (vertically)
    if (y < 0 || y >= tileRange) {
        return null;
    }

    // repeat across x-axis
    if (x < 2 || x >= tileRange * 2 - 2) {
        return null;// Stop repeat on the x-axis
    }else{x = (x % tileRange + tileRange) % tileRange;}

    return urlfunc({x:x,y:y}, zoom)
}

var map;
var mapTypeIds = [];

// Setup a copyright/credit line, emulating the standard Google style
var creditNode = document.createElement('div');
creditNode.id = 'credit-control';
creditNode.style.fontSize = '11px';
creditNode.style.fontFamily = 'Arial, sans-serif';
creditNode.style.margin = '0 2px 2px 0';
creditNode.style.whitespace = 'nowrap';
creditNode.index = 0;

function setCredit(credit) {
    creditNode.innerHTML = credit + ' -';
}


function translateRAtoLng(RA){

    if (RA > 12) return ( 24 - RA + 12 ) * 15 ;
    if (RA < 12) return ( 12 - RA ) * 15 ;

};



function initialize() {

    // push all mapType keys in to a mapTypeId array to set in the mapTypeControlOptions
    for (var key in mapTypes) {
        mapTypeIds.push(key);
    }

    var mapOptions = {
        zoom: 3,
        center: new google.maps.LatLng(0, translateRAtoLng(8.5)),
        mapTypeControlOptions: {
            mapTypeIds: mapTypeIds,
            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU
        }
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

    // push the credit/copyright custom control
    map.controls[google.maps.ControlPosition.BOTTOM_RIGHT].push(creditNode);

    // add the new map types to map.mapTypes
    for (key in mapTypes) {
        map.mapTypes.set(key, new google.maps.ImageMapType(mapTypes[key]));
    }

    // handle maptypeid_changed event to set the credit line
    google.maps.event.addListener(map, 'maptypeid_changed', function () {
        setCredit(mapTypes[map.getMapTypeId()].credit);
    });

    // start with the sky map type
    map.setMapTypeId('sky');

    //Add constellation overlay
    for (key in constellation) {
        var bottomX = constellation[key].leftBottomCornerX;
        var bottomY = constellation[key].leftBottomCornerY;
        var topX = constellation[key].rightTopCornerX;
        var topY = constellation[key].rightTopCornerY;
        var imageBounds = new google.maps.LatLngBounds(
            new google.maps.LatLng(bottomX, translateRAtoLng(bottomY)),
            new google.maps.LatLng(topX, translateRAtoLng(topY))
        );
        var overlay = new google.maps.GroundOverlay('./Pictures/smallConstellations/' + key + '.png', imageBounds);
        overlay.setMap(map);
        //Info box
        var infoHeading = constellation[key].infoHeading;
        var infoContent = constellation[key].infoContent;
        var infoWikiLink = constellation[key].infoWikiLink;
        var infoBox = '<div id="content">' +
            '<div id="siteNotice">' +
            '</div>' +
            '<h1 id="firstHeading" class="firstHeading">' + infoHeading + '</h1>' +
            '<div id="bodyContent">' +
            '<p><b>' + infoHeading + '</b>,' + infoContent + '</p>' +
            '<p>Attribution: ' + key + ', <a href="' + infoWikiLink + '">' + infoWikiLink + '</a> ' + '.</p>' +
            '</div>' +
            '</div>';
        addInfoImage(imageBounds, map, infoBox);
    }




}

