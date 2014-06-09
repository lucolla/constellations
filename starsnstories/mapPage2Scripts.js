
alert("starting");

var ge;
google.load("earth","1",{"other_params":"key=AIzaSyC9rd3yzQZfbq_T4vGl_KpeqzqvmtaeuuE&sensor={true}"});

function init(){
    google.earth.createInstance('map3d',initCB,failureCB);
}

function initCB(instance){
    ge = instance;
    ge.getOptions().setMapType(ge.MAP_TYPE_SKY);
    ge.getWindow().setVisibility(true);
}


function failureCB(errorCode){
    alert("error" + errorCode);
}

google.setOnLoadCallback(init);



alert("ending");

















/*

function initialize()
{
    var mapProp = {
        center:new google.maps.LatLng(51.508742,-0.120850),
        zoom:5,
        mapTypeId:google.maps.MapTypeId.ROADMAP
    };
    var map=new google.maps.Map(document.getElementById("googleMap")
        ,mapProp);
}

google.maps.event.addDomListener(window, 'load', initialize);



function showSky() {
    ge.getOptions().setMapType(ge.MAP_TYPE_SKY);

    setTimeout(function() {
        // Zoom in on a nebula.
        var oldFlyToSpeed = ge.getOptions().getFlyToSpeed();
        ge.getOptions().setFlyToSpeed(.2);  // Slow down the camera flyTo speed.
        var lookAt = ge.getView().copyAsLookAt(ge.ALTITUDE_RELATIVE_TO_GROUND);
        lookAt.set(41.28509187215, -169.2448684551622, 0,
            ge.ALTITUDE_RELATIVE_TO_GROUND, 262.87, 0, 162401);
        // Also try:
        //   lookAt.set(-59.65189337195337, -18.799770300376053, 0,
        //              ge.ALTITUDE_RELATIVE_TO_GROUND, 0, 0, 36817);
        ge.getView().setAbstractView(lookAt);
        ge.getOptions().setFlyToSpeed(oldFlyToSpeed);
    }, 1000);  // Start the zoom-in after one second.
}
*/