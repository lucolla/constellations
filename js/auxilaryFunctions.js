/**
 * Created by chu on 6/19/2014.
 */


function bringToCenter(jqueryObject){

    var tempBox = jqueryObject.get(0).getBoundingClientRect();
    var parentBox = jqueryObject.parent()[0].getBoundingClientRect();
    console.log('parent: '+ [parentBox.left,parentBox.top,parentBox.right,parentBox.bottom].join());
    console.log('self: '+ [tempBox.left,tempBox.top,tempBox.right,tempBox.bottom].join());

    var loc = {
        left: (parentBox.right - parentBox.left)/2 - (tempBox.right - tempBox.left)/2  ,
        top:   (parentBox.bottom - parentBox.top)/2 - (tempBox.bottom - tempBox.top)/2

    };
    jqueryObject.css( "transform", 'translate('+(loc.left).toString() +'px ,'+ (loc.top).toString()  +'px)');
    jqueryObject.css(loc);
    //jqueryObject.css('transform','translate('+ loc.left +','+ loc.top +')');
}



function zoomOnPointerTranslation(jqueryObject,pointerOffset,zoom){

    var tempBox = jqueryObject.get(0).getBoundingClientRect();
    var parentBox = jqueryObject.parent()[0].getBoundingClientRect();

    //console.log('parent: '+ [parentBox.left,parentBox.top,parentBox.right,parentBox.bottom].join());
    //console.log('self: '+ [tempBox.left,tempBox.top,tempBox.right,tempBox.bottom].join());

    var loc = {
        // distance of pointer from top left location of object
        //left: (pointerOffset.pointerX -  jqueryObject.css('left')).toString()+'px ' ,
        //top:   (pointerOffset.pointerY - jqueryObject.css('top')).toString()+'px '
        // pointer location from bounding box of object
        left: (pointerOffset.pointerX -  tempBox.left).toString()+'px ' ,
        top:   (pointerOffset.pointerY - tempBox.top).toString()+'px '

    };
    jqueryObject.css( "transform", 'translate('+loc.left+','+loc.top+')' );
    jqueryObject.css(loc);
    //jqueryObject.css('transform','translate('+ loc.left +','+ loc.top +')');
}



function hookWheelEvent(mapCanvasElement){

    var support;
    support = "onwheel" in document.createElement("div") ? "wheel" : // Modern browsers support "wheel"
            document.onmousewheel !== undefined ? "mousewheel" : // Webkit and IE support at least "mousewheel"
        "DOMMouseScroll"; // let's assume that remaining browsers are older Firefox

    if (support == "wheel"){
        //document.getElementById("iphoneScrollContainer").addEventListener(support,function(e){console.log( e.deltaY.toString() + '  ' + e.SCROLL_PAGE_UP.toString() + '   ' + e.SCROLL_PAGE_DOWN.toString())});
        //document.getElementById("map_canvas").addEventListener(support,function(e){console.log(e.deltaY)});//mapZooming(e)
        //mapCanvasElement.get(0).addEventListener(support,function(e){});//mapZooming(e)
        mapCanvasElement.get(0).addEventListener(support,mapZooming);//mapZooming(e)
        //
    }
}



function mapZooming(event){

    //console.log('reeachedthispoint1' + event.deltaY.toString());

    var direction;
    //if (event.SCROLL_PAGE_UP == -32765) {direction = 'in'}else{direction = 'out'}
    //if (event.deltaY < 0) {direction = 'in'}else{direction = 'out'}
    //var currentZoom = this.css('scale');

    var futureZoom = currentZoom + (-1)*0.1*event.deltaY/Math.abs(event.deltaY); ///
    if (futureZoom <= maxZoom && futureZoom >= minZoom) {
        var eventKeys=[];
        var eventValues =[];
        for (key in event) {eventKeys.push(key);eventValues.push(event[key])}
        console.log(eventKeys.join());
        console.log([event.screenX,event.screenY,event.clientX,event.clientY].join('-'));
        //this.css("transform",'scale('+futureZoom.toString()+')');
        var _this = $(this);
        //console.log('changing zoom');
        _this.css("transform",'scale('+futureZoom.toString()+')'); //translateX() translateY()
        //console.log('brinign ot center');

        bringToCenter(_this);

        //var pointerOffset = {pointerX:event.screenX,pointerY:event.screenY};
        //zoomOnPointerTranslation(_this,pointerOffset,currentZoom);


        this.style.transform='scale('+futureZoom.toString()+')';

        currentZoom = futureZoom;
        console.log('reeachedthispoint');

    }
    //event.deltaY
}

/*
function toggleButton(buttonObject,state){
    buttonObject.attr("src",buttonImages[])
}

    */