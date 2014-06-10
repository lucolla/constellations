// Copyright 2008 Google Inc.
// All Rights Reserved.
/**
 * @fileoverview Coordinate Display Control
 *
 * @extends Control
 *
 * @author  ( )
 */

/**
 * Coordinate Display Constructor
 * @constructor CoordDisplay
 * @return {Object} The control
 */
function CoordDisplay() {
    this.initialize();
    return this;
}

/**
 * Initialize function
 * @return {Object} The CoordDisplay Control
 */
CoordDisplay.prototype.initialize = function() {
    this.containerDiv = document.createElement('div');
    var containerDiv = this.containerDiv;
    containerDiv.innerHTML = '<input type="text" id="skyra" value="" ' +
        'readonly="true" class="fakeDivDown">' +
        '&nbsp;<input type="text" id="skydec" value="" ' +
        'readonly="true" class="fakeDivDown">' +
        '&nbsp;&nbsp;<input type="text" id="skystartitle" ' +
        'value="" readonly="true" class="fakeDivDownB">';
    // (cmhubertchen): This is doing nothing in Chrome.
    // google.maps.event.addListener(map, "mouseout", eraseInfo);
    google.maps.event.addListener(map, "mouseover", displayInfo);
    google.maps.event.addListener(map, "mousemove", displayInfo);
    return containerDiv;
};

CoordDisplay.prototype.getContainer = function() {
    return this.containerDiv;
}

/**
 * Returns the default position for the Coverage control
 * @return {ControlPosition} The Coverage control default position.
 */
CoordDisplay.prototype.getDefaultPosition = function() {
    return google.maps.ControlPosition.BOTTOM_LEFT;
}

