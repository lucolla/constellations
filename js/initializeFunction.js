/**
 * Created by chu on 6/20/2014.
 */




function initialize(){


    initializeConstellationsNames();
    initializeTitleNames();

    // Change src for base layers of map and constellations
    //======================================================
    var mapBaseVar = $("#mapBase");
    try {   mapBaseVar.attr("src", "./Pictures/Background/BackgroundNew/printedSky.png");                               }catch(e){ alert('Error: '+ e.description); }
    //try {   $("#mapIllustrations").attr("src", "./Pictures/Background/BackgroundNew/consttellationsIllustrations.png"); }catch(e){ alert('Error: '+ e.description); }
    try {   $("#mapLines").attr("src", "./Pictures/Background/BackgroundNew/only_lines3.png");                  }catch(e){ alert('Error: '+ e.description); }
    try {   $("#mapStars").attr("src", "./Pictures/Background/BackgroundNew/constellationStarsNew.png");                   }catch(e){ alert('Error: '+ e.description); }

    mapBaseVar.attr("usemap","#areaMapping");
    $(".mapImages").css("visibility","visible");
    mapBaseVar.css("opacity","1");
    mapBaseVar = null;


    // Add transparent constellations to the constellations container
    //=================================================================

    function addTransparentConstellation(className,constName,xLeft,yTop,filePath,filename){ //width,height,
        $("#mapConstellationsContainer").append('<img id="'+constName+'" class="'+className+'" src="'+filePath+filename+'" style="position:absolute; top:'+yTop+'px; left:'+xLeft+'px; "/>');// width:'+width+'px; height:'+height+'px
    }

    try { for (var jj = 0; jj < constellationsArr.length; jj++) {
        addTransparentConstellation('transConstellations',constellationsArr[jj][0], constellationsArr[jj][1], constellationsArr[jj][2], trsnsparentcConstellationsPath,constellationsArr[jj][3]);}//constName,xLeft,yTop,filePath,filename
    }catch(e){alert('Error in addTransparentConstellation:'+ e.description)}

    try { for (var jj = 0; jj < constellationsArr.length; jj++) {
        addTransparentConstellation('constTitles',titlesArr[jj][0], titlesArr[jj][1], titlesArr[jj][2], titlePath,titlesArr[jj][3]);}//constName,xLeft,yTop,filePath,filename
    }catch(e){alert('Error in addTransparentConstellation:'+ e.description)}


    // Define the img that holds the scroll as draggable
    //==================================================
    scrollContainer = $("#iphoneScrollContainer");
    scrollContainer.draggable({axis: "y"});
    //,scrollSensitivity:100, scrollSpeed:100
    scrollContainer.draggable("option","disabled",true);
    $(".scrolls").css("pointer-events","none");
    scrollModeOn = false;





    // Define the div holding the base maps as draggable
    //==================================================

    var mapCanvasElement = $("#map_canvas");
    var zoomableMapCanvas = $("#zoommable_map_canvas");

    mapBox =  mapCanvasElement.get(0).getBoundingClientRect();

    hookWheelEvent(zoomableMapCanvas);

    $(function(){
            mapCanvasElement.draggable({
                    //containment:[],
                    //scroll: true,//,scrollSensitivity:100, scrollSpeed:100
                    start: function(event,ui){  // function(event,ui){

                        //ui.helper.css("transform","translate(0,0)");
                        //ui.helper.css("transition","top 0.1 linear, left 0.1 linear");
                        //console.log(ui.position);
                        //console.log(ui.offset);

                        //var _this = $(this);
                        //var box = _this.get(0).getBoundingClientRect();
                        //console.log('dragging ' + event.type + '   ' + event.which + event.timeStamp);
                        startDraggingTime = event.timeStamp;

                        if(beginning) clearBeginningScreen();

                        if(leftButtonsOpen) toggleLeftButtons();

                        if(illustrationsOn )  {//$("#mapIllustrations").fadeTo(400,1); //&& constInFocus != 'none'
                                                                        $(".transConstellations").fadeTo(200,constellationDefaultOpacity);
                                                                        $('.constTitles').fadeTo(200,constellationDefaultOpacity);

                                                                        toggleInfoButton('off');
                                                                        constInFocus = 'none';
                        }
                    },
                    //stop:function(event,ui){var eventKeys=[]; for (key in event.originalEvent) {eventKeys.push(key)} console.log(eventKeys.join())}
                    stop:function(event,ui){
                        var _this = $(this);
                        lastMapCanvasLocation = currentMapCanvasLocation;
                        currentMapCanvasLocation = ui.offset;
                        endDraggingTime = event.timeStamp;
                        var diffMapCanvasLocX = currentMapCanvasLocation.left - lastMapCanvasLocation.left;//pixel's
                        var diffMapCanvasLocY = currentMapCanvasLocation.top - lastMapCanvasLocation.top; //pixel's
                        var diffDistance = (Math.pow(diffMapCanvasLocX,2)+Math.pow(diffMapCanvasLocY,2)); //pixel's
                        var diffTime = endDraggingTime - startDraggingTime; //milliseconds
                        var speed = diffDistance/diffTime; // pixel/milliseconds
                        var extraTimeOfMovement  =  speed/mapNegativeAcceleration; //millisecond, assuming the resistance is always parallel to the direction of change
                        var extraDistanceX = speed*(diffMapCanvasLocX/diffDistance)*extraTimeOfMovement+mapNegativeAcceleration*(diffMapCanvasLocX/diffDistance)*Math.pow(extraTimeOfMovement,2)/2; //pixel's
                        var extraDistanceY = speed*(diffMapCanvasLocY/diffDistance)*extraTimeOfMovement+mapNegativeAcceleration*(diffMapCanvasLocY/diffDistance)*Math.pow(extraTimeOfMovement,2)/2; //pixel's
                        //console.log(lastMapCanvasLocation,currentMapCanvasLocation,diffTime);
                        //var eventKeys=[];
                        //for (key in event.originalEvent) {eventKeys.push(key)}
                        //console.log(eventKeys.join());
                        extraTimeOfMovement = extraTimeOfMovement*2;
                        ui.helper.css({
                            transition: 'top '+extraTimeOfMovement.toString()+' cubic-bezier(0, 0.5, 0.5, 1),left '+extraTimeOfMovement.toString()+' cubic-bezier(0, 0.5, 0.5, 1)',
                            top: (currentMapCanvasLocation.top + extraDistanceX).toString()+'px'  ,
                            left: (currentMapCanvasLocation.left + extraDistanceY).toString() +'px'
                                            });
                        //_this.css("transition",'top 0.2 linear,left 0.2 linear');

                    }
                }
            );
        }
    );

    //double-click function
    //===========================

 /*
    mapCanvasElement.dblclick(function(){
        zoomingIn = !zoomingIn;
        if(zoomingIn){mapCanvasElement.css("transform","scale(1) translate(0,0)");}else{mapCanvasElement.css("transform","scale(0.5) translate(0,0)");}
    });
*/


    // Add to buttons hoover mode
    //=============================
/*
    for (key in buttonImages){
        $('#'+key).css

    }
*/

    //addWheelListener( document.getElementById("iphoneScrollContainer") , function( e ) { console.log( e.deltaY*2 + e.SCROLL_PAGE_UP  );e.preventDefault(); } ); //for (key in e){ console.log(key)}

    //{scroll: true,scrollSensitivity:100, scrollSpeed:100}  {containment:[-1000,-1000,2500,2500]}})

    //alert('Initializied!');
    /*
     <img  id="mapBase"          class="mapImages" src="./Pictures/Background/printedSky.png" >
     <img  id="mapLines"         class="mapImages" src="./Pictures/Background/constellationsLines.png">
     <img  id="mapStars"         class="mapImages" src="./Pictures/Background/constellationStars.png">
     <img  id="mapIllustrations" class="mapImages" src="./Pictures/Background/consttellationsIllustrations.png">
     */


        console.log('End of function Initialize()');
}    // End of function Initialize()

//====================================================================================
//=========================End of function Initialize==================================
//====================================================================================
