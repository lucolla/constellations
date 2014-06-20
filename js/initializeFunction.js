/**
 * Created by chu on 6/20/2014.
 */




function initialize(){




    // Change src for base layers of map and constellations
    //======================================================
    var mapBaseVar = $("#mapBase");
    try {   mapBaseVar.attr("src", "./Pictures/Background/BackgroundNew/printedSky.png");                               }catch(e){ alert('Error: '+ e.description); }
    //try {   $("#mapIllustrations").attr("src", "./Pictures/Background/BackgroundNew/consttellationsIllustrations.png"); }catch(e){ alert('Error: '+ e.description); }
    try {   $("#mapLines").attr("src", "./Pictures/Background/BackgroundNew/constellationsLines.png");                  }catch(e){ alert('Error: '+ e.description); }
    try {   $("#mapStars").attr("src", "./Pictures/Background/BackgroundNew/constellationStars.png");                   }catch(e){ alert('Error: '+ e.description); }

    mapBaseVar.attr("usemap","#areaMapping");
    $(".mapImages").css("visibility","visible");
    mapBaseVar.css("opacity","1");
    mapBaseVar = null;


    // Add transparent constellations to the constellations container
    //=================================================================
    try { for (var jj = 0; jj < constellationsArr.length; jj++) {
        addTransparentConstellation(constellationsArr[jj][0], constellationsArr[jj][1], constellationsArr[jj][2], trsnsparentcConstellationsPath);}
    }catch(e){alert('Error in addTransparentConstellation:'+ e.description)}


    // Define the img that holds the scroll as draggable
    //==================================================
    scrollContainer = $("#iphoneScrollContainer");
    $(function() {
        scrollContainer.draggable({axis: "y"});
    } );//,scrollSensitivity:100, scrollSpeed:100
    scrollContainer.draggable("disable");
    scrollModeOn = false;
    scrollHeight = scrollContainer.height();
    scrollWidth = scrollContainer.width();



    // Define the div holding the base maps as draggable
    //==================================================

    var mapCanvasElement = $("#map_canvas");
    var zoomableMapCanvas = $("#zoommable_map_canvas");

    mapBox =  mapCanvasElement.get(0).getBoundingClientRect();

    //hookWheelEvent(zoomableMapCanvas);

    $(function(){
            mapCanvasElement.draggable({scroll: true,//,scrollSensitivity:100, scrollSpeed:100
                    start: function(event,ui){  // function(event,ui){

                        //ui.helper.css("transform","translate(0,0)");
                        //console.log(ui.position);
                        //console.log(ui.offset);

                        var _this = $(this);
                        var box = _this.get(0).getBoundingClientRect();
                        console.log('dragging ' + event.type + '   ' + event.which);



                        if(illustrationsOn && constInFocus != 'none')  {$("#mapIllustrations").fadeTo(400,1);
                                                                        $(".transConstellations").fadeTo(400,1);
                                                                        toggleInfoButton();
                                                                        constInFocus = 'none';
                        }
                    }
                }
            );
        }
    );
    mapCanvasElement.dblclick(function(){
        zoomingIn = !zoomingIn;
        if(zoomingIn){mapCanvasElement.css("transform","scale(1) translate(0,0)");}else{mapCanvasElement.css("transform","scale(0.5) translate()");}
    });



    // Add to buttons hoover mode
    //=============================

    for (key in buttonImages){
        $('#'+key).css

    }


    //addWheelListener( document.getElementById("iphoneScrollContainer") , function( e ) { console.log( e.deltaY*2 + e.SCROLL_PAGE_UP  );e.preventDefault(); } ); //for (key in e){ console.log(key)}

    //{scroll: true,scrollSensitivity:100, scrollSpeed:100}  {containment:[-1000,-1000,2500,2500]}})

    //alert('Initializied!');
    /*
     <img  id="mapBase"          class="mapImages" src="./Pictures/Background/printedSky.png" >
     <img  id="mapLines"         class="mapImages" src="./Pictures/Background/constellationsLines.png">
     <img  id="mapStars"         class="mapImages" src="./Pictures/Background/constellationStars.png">
     <img  id="mapIllustrations" class="mapImages" src="./Pictures/Background/consttellationsIllustrations.png">
     */

}    // End of function Initialize()

//====================================================================================
//=========================End of function Initialize==================================
//====================================================================================
