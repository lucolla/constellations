		var OPACITY_MAX_PIXELS = 57; // Width of opacity control image
		var transparentOverlay;
		
		function createOpacityControl(map, overlay, opacity) {
			var sliderImageUrl = "OpacityControl/opacity-slider3d14.png";
			transparentOverlay = overlay;
			
			// Create main div to hold the control.
			var opacityDiv = document.createElement('DIV');
			opacityDiv.setAttribute("style", "margin:5px;overflow-x:hidden;overflow-y:hidden;background:url(" + sliderImageUrl + ") no-repeat;width:71px;height:21px;cursor:pointer;");

			// Create knob
			var opacityKnobDiv = document.createElement('DIV');
			opacityKnobDiv.setAttribute("style", "padding:0;margin:0;overflow-x:hidden;overflow-y:hidden;background:url(" + sliderImageUrl + ") no-repeat -71px 0;width:14px;height:21px;");
			opacityDiv.appendChild(opacityKnobDiv);

			var opacityCtrlKnob = new ExtDraggableObject(opacityKnobDiv, {
				restrictY: true,
				container: opacityDiv
			});

			google.maps.event.addListener(opacityCtrlKnob, "dragend", function () {
				setOpacity(opacityCtrlKnob.valueX());
			});

			google.maps.event.addDomListener(opacityDiv, "click", function (e) {
				var left = findPosLeft(this);
				var x = e.pageX - left - 5; // - 5 as we're using a margin of 5px on the div
				opacityCtrlKnob.setValueX(x);
				setOpacity(x);
			});

			map.controls[google.maps.ControlPosition.TOP_RIGHT].push(opacityDiv);

			// Set initial value
			//var initialValue = OPACITY_MAX_PIXELS / (100 / opacity);
			var initialValue = OPACITY_MAX_PIXELS;
			opacityCtrlKnob.setValueX(initialValue);
			setOpacity(initialValue);
		}

		function setOpacity(pixelX) {
			// Range = 0 to OPACITY_MAX_PIXELS
			//var value = (100 / OPACITY_MAX_PIXELS) * pixelX;
			var value = pixelX / OPACITY_MAX_PIXELS;
			if (value < 0) value = 0;
			if (value == 0) {
				if (transparentOverlay.visible == true) {
					transparentOverlay.hide();
				}
			}
			else {
				transparentOverlay.setOpacity(value);
				//if (transparentOverlay.visible == false) {
					transparentOverlay.visible = true;
					transparentOverlay.setMap(transparentOverlay.map)
				//}
			}
		}

		function findPosLeft(obj) {
			var curleft = 0;
			if (obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
				} while (obj = obj.offsetParent);
				return curleft;
			}
			return undefined;
		}
		