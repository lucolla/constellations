/**
 * Created by chu on 6/14/2014.
 */

var ContextMenu,starsOn,linesOn,illustrationsOn,leftButtonsOpen,infoButtonOn,scrollModeOn,scrollHeight,scrollWidth,zoomingIn,constInFocus;

function initialize(){

    var mapBaseVar = $("#mapBase");
    try {   mapBaseVar.attr("src", "./Pictures/Background/BackgroundNew/printedSky.png");                               }catch(e){ alert('Error: '+ e.description); }
    try {   $("#mapIllustrations").attr("src", "./Pictures/Background/BackgroundNew/consttellationsIllustrations.png"); }catch(e){ alert('Error: '+ e.description); }
    try {   $("#mapLines").attr("src", "./Pictures/Background/BackgroundNew/constellationsLines.png");                  }catch(e){ alert('Error: '+ e.description); }
    try {   $("#mapStars").attr("src", "./Pictures/Background/BackgroundNew/constellationStars.png");                   }catch(e){ alert('Error: '+ e.description); }

    mapBaseVar.attr("usemap","#areaMapping");
    $(".mapImages").css("visibility","visible");
    mapBaseVar.css("opacity","1");
    mapBaseVar = null;

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
    $(function(){
            $("#map_canvas").draggable({scroll: true,//,scrollSensitivity:100, scrollSpeed:100
                                        start: function(event,ui){
                                            if(illustrationsOn && constInFocus != 'none')  {$("#mapIllustrations").fadeTo(400,1);
                                                                                            $(".transConstellations").fadeTo(400,1);
                                                                                            constInFocus = 'none';
                                            }
                                        }
                }
            );
        }
    );
    $("#map_canvas").dblclick(function(){
        zoomingIn = !zoomingIn;
        if(zoomingIn){$("#map_canvas").css("transform","scale(1)");}else{$("#map_canvas").css("transform","scale(0.2)");}
    });
    //{scroll: true,scrollSensitivity:100, scrollSpeed:100}  {containment:[-1000,-1000,2500,2500]}})


    // Initialize the bool that holds the state of the base maps and contextMenu
    //==========================================================================
    ContextMenu = 'stars' ; //['stars','scroll','stories']
    starsOn = false;
    linesOn = false;
    illustrationsOn = false;
    leftButtonsOpen = false;
    infoButtonOn = false;
    zoomingIn = false;
    constInFocus = 'none';

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


function constellationPressed(constName){

    //alert(constName);
    if(illustrationsOn && constName != constInFocus){
        $("#mapIllustrations").fadeTo(100,0);
        $(".transConstellations").not("#"+constName).fadeTo(100,0.6);
        $("#"+constName).fadeTo(400,1);
        constInFocus = constName;
        toggleInfoButton();
    //$("#mapIllustrations").fadeTo(400,0).delay(600).fadeTo(400,1);
   // $(".transConstellations").not("#"+constName).fadeTo(400,0).delay(600).fadeTo(400,1);

    }


    //$("#"+constName).css("opacity","1");

}

function addTransparentConstellation(constName,xLeft,yTop,filePath){ //width,height,
$("#mapConstellationsContainer").append('<img id="'+constName+'" class="transConstellations" src="'+filePath+constName+'.png'+'" style="position:absolute; top:'+yTop+'px; left:'+xLeft+'px; "/>');// width:'+width+'px; height:'+height+'px
}

// If the window is resized then the form of the smartphone layer is changed
$(window).bind('resize',handleDiffRatio);

function handleDiffRatio(){
    var windowWidth = $(window).width();
    var windowHeight = $(window).height();

    if (windowHeight > windowWidth){
        $("#UpperPartBlackFrameLayerImg").show();
        $("#LowerPartBlackFrameLayerImg").show();
        $("#phoneLayerImg").attr("src","./Pictures/IPhoneLayer/phoneLayerPortrait.png");
    }else{
        $("#UpperPartBlackFrameLayerImg").hide();
        $("#LowerPartBlackFrameLayerImg").hide();
        $("#phoneLayerImg").attr("src","./Pictures/IPhoneLayer/phoneLayerLandscape.png");
    }
}

function defineRectangleForScrolling(obj){
// alert("hi"+obj.css("width"));

    var offset = obj.offset();
    var top = offset.top;
    var left = offset.left;
    var pheight = obj.parent().height();
    var pwidth = obj.parent().width();
    var height = obj.height();
    var width = obj.width();


    //alert( [left,top - (height - pheight)  ,left + width,top + pheight ]);
    //return [left,top - (height - pheight) ,left + width,top + pheight ];
    //return [left,top - (height - pheight)  ,left + width,top + pheight ];
    return [left,top - (height - pheight)  ,left + width,top  ];

}

function menuButtonPressedDown(pressedButton){
    switch (ContextMenu){
        case 'stars':
            switch (pressedButton){
                case 'starsButton':
                    if (leftButtonsOpen){
                        leftButtonsOpen = !leftButtonsOpen;

                        if(starsOn){$("#mapStars").css("opacity","0");
                        }else{$("#mapStars").css("opacity","1");}
                        starsOn=!starsOn;

                        $("#menuLeftButtonSecond").css("top","0px");
                        $("#menuLeftButtonThird").css("top","0px");
                    }else {
                        leftButtonsOpen = !leftButtonsOpen;
                        $("#menuLeftButtonSecond").css("top", "60px");
                        $("#menuLeftButtonThird").css("top", "120px");
                    }
                    break;
                case 'illustrationsButton':
                    if(illustrationsOn){
                        $("#mapIllustrations").css("opacity","0");
                        $(".transConstellations").css("opacity","0");
                    }else{
                        $("#mapIllustrations").css("opacity","1");
                        $(".transConstellations").css("opacity","0");
                    }
                    illustrationsOn=!illustrationsOn;
                    break;
                case 'linesButton':
                    if(linesOn){$("#mapLines").css("opacity","0");
                    }else{$("#mapLines").css("opacity","1");}
                    linesOn=!linesOn;
                    break;
            }
            break;
        case 'scroll':
            alert('scroll stae');
            break;
        case 'stories':
            alert('stories stae');
            break;
    }
}

function toggleInfoButton(){
    var infoButtonObj = $("#menuInfoButton");
    if (infoButtonOn){
        infoButtonObj.css("visibility", "hidden");
        infoButtonObj.css("pointer-events", "none");
    }else {
        infoButtonObj.css("visibility", "visible");
        infoButtonObj.css("pointer-events", "auto");
    }
    infoButtonOn =! infoButtonOn;
}


function toggleTaurusScroll(){

    if( !scrollModeOn ) {
        scrollModeOn = !scrollModeOn;
        scrollContainer.draggable("enable");
        scrollContainer.attr("src","./Pictures/Scrolls/taurusScrollNew.jpg");
        scrollContainer.attr("width","387px");//400px
        //scrollContainer.attr("height","1334px");
        scrollContainer.css("top","0px");
        scrollContainer.css("left","0px");
        //scrollContainer.attr("height","621px");
        $("#iphoneContent").css("overflow","hidden");//"auto"
        $("#phoneLayer").css("pointer-events","auto");

        var scrollOffset = scrollContainer.offset();
        var scrollTop = scrollOffset.top;
        var scrollLeft = scrollOffset.left;
        var parentHeight = scrollContainer.parent().height();

        //alert([scrollLeft,scrollTop - (scrollHeight*2 - parentHeight)  ,scrollLeft + scrollWidth,scrollTop ,parentHeight,scrollHeight ]);
        // Multiplied by 2, not sure why but it does the trick?
        scrollContainer.draggable("option",{containment : [scrollLeft,scrollTop - (scrollHeight*2 - parentHeight)  ,scrollLeft + scrollWidth,scrollTop  ]});
       // scrollContainer.draggable({axis:"y",containment : [left,top - (height - pheight)  ,left + width,top  ]});//axis:"y",,containment:defineRectangleForScrolling(scrollContainer)


    } else {
        scrollModeOn = !scrollModeOn;
        scrollContainer.draggable("disable");
        scrollContainer.attr("src","./Pictures/IphoneLayer2/iphoneContentTransperent.png");
        scrollContainer.css("top","0px");
        scrollContainer.css("left","0px");
        $("#phoneLayer").css("pointer-events","none")
    }
}

