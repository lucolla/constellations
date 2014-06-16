/**
 * Created by chu on 6/14/2014.
 */

var ContextMenu,starsOn,linesOn,illustrationsOn,leftButtonsOpen,infoButtonOn,scrollModeOn,scrollHeight,scrollWidth,zoomingIn;

function initialize(){

    var mapBaseVar = $("#mapBase");
    mapBaseVar.attr("src","./Pictures/Background/BackgroundNew/printedSky.png");
    $("#mapIllustrations").attr("src","./Pictures/Background/BackgroundNew/consttellationsIllustrations.png");
    $("#mapLines").attr("src","./Pictures/Background/BackgroundNew/constellationsLines.png");
    $("#mapStars").attr("src","./Pictures/Background/BackgroundNew/constellationStars.png");

    $(".mapImages").css("visibility","visible");
    mapBaseVar.css("opacity","1");
    mapBaseVar = null;


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
            $("#mapCanvasImg").draggable({scroll: true});//,scrollSensitivity:100, scrollSpeed:100
        }
    );
    $("#mapCanvasImg").dblclick(function(){
        zoomingIn = !zoomingIn;
        if(zoomingIn){$("#mapCanvasImg").css("transform","scale(1)");}else{$("#mapCanvasImg").css("transform","scale(0.2)");}
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

    alert('Initializied!');
    /*
    <img  id="mapBase"          class="mapImages" src="./Pictures/Background/printedSky.png" >
        <img  id="mapLines"         class="mapImages" src="./Pictures/Background/constellationsLines.png">
            <img  id="mapStars"         class="mapImages" src="./Pictures/Background/constellationStars.png">
                <img  id="mapIllustrations" class="mapImages" src="./Pictures/Background/consttellationsIllustrations.png">
    */

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
};

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
                    if(illustrationsOn){$("#mapIllustrations").css("opacity","0");
                    }else{$("#mapIllustrations").css("opacity","1");}
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

        alert([scrollLeft,scrollTop - (scrollHeight*2 - parentHeight)  ,scrollLeft + scrollWidth,scrollTop ,parentHeight,scrollHeight ]);
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

