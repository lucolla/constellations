/**
 * Created by chu on 6/19/2014.
 */






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

    console.log('reeachedthispoint1');

    var direction;
    //if (event.SCROLL_PAGE_UP == -32765) {direction = 'in'}else{direction = 'out'}
    //if (event.deltaY < 0) {direction = 'in'}else{direction = 'out'}
    //var currentZoom = this.css('scale');

    var futureZoom = currentZoom + 0.1 *(-1)* event.deltaY/Math.abs(event.deltaY); ///
    if (futureZoom <= maxZoom && futureZoom >= minZoom) {

        //this.css("transform",'scale('+futureZoom.toString()+')');
        this.style.transform='scale('+futureZoom.toString()+')';

        currentZoom = futureZoom;
        console.log('reeachedthispoint');

    }
    //event.deltaY




}
