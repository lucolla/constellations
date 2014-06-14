/**
 * Created by chu on 6/13/2014.
 */

var ge;

google.load("earth", "1", {"other_params":"sensor=false"});

function init() {
    google.earth.createInstance('map_canvas', initCB, failureCB); //google.earth.createInstance('map3d', initCB, failureCB,{database: 'sky'})
}

function initCB(instance) {
    ge = instance;
    ge.getWindow().setVisibility(true);
    ge.getOptions().setMapType(ge.MAP_TYPE_SKY);

}

function failureCB(errorCode) {
    alert("Failed to load google earth")
}

google.setOnLoadCallback(init);

// ge.getOptions().setMapType(ge.MAP_TYPE_SKY);

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


    //ge.getLayerRoot().enableLayerById(ge.Constellations, false);
    //ge.getFeatures().getFirstChild()
}

function doNumber(){


    var link = ge.createLink('');
    var href = './short_tour.kml'
    link.setHref(href);

    var networkLink = ge.createNetworkLink('');
    networkLink.set(link, true, true); // Sets the link, refreshVisibility, and flyToView

    ge.getFeatures().appendChild(networkLink);
    /*
    var features = ge.getFeatures();
    while (features.getFirstChild())
        features.removeChild(features.getFirstChild());
        */

}




