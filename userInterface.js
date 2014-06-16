/**
 * Created by chu on 6/14/2014.
 */



function initialize(){

    var mapBaseVar = $("#mapBase");
    mapBaseVar.attr("src","./Pictures/Background/printedSky.png");
    $("#mapIllustrations").attr("src","./Pictures/Background/consttellationsIllustrations.png");
    $("#mapLines").attr("src","./Pictures/Background/constellationsLines.png");
    $("#mapStars").attr("src","./Pictures/Background/constellationStars.png");

    $(".mapImages").css("visibility","visible");
    mapBaseVar.css("opacity","1");
    mapBaseVar = null;


    /*alert('Initializing!');*/
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


$(function(){
    $("#mapCanvasImg").draggable({scroll: true});//,scrollSensitivity:100, scrollSpeed:100
}
);//{scroll: true,scrollSensitivity:100, scrollSpeed:100}  {containment:[-1000,-1000,2500,2500]}})

var ContextMenu = 'stars' ; //['stars','scroll','stories']

var starsOn = false;
var linesOn = false;
var illustrationsOn = false;

var leftButtonsOpen = false;



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


function toggleTaurusScroll(){
    var scrollContainer = $("#scrollContainer");
    if( scrollContainer.attr("src").indexOf("transparent") != -1 ) {

        scrollContainer.attr("src","./Pictures/Scrolls/taurusScroll.jpg");
        scrollContainer.attr("width","370px");//400px
        scrollContainer.css("top","0px");
        scrollContainer.css("left","0px");
        //scrollContainer.attr("height","621px");
        $("#midPhoneLayerMidScrollContainer").css("overflow","hidden");//"auto"
        $("#phoneLayer").css("pointer-events","auto");

        var offset = scrollContainer.offset();
        var top = offset.top;
        var left = offset.left;
        var pheight = scrollContainer.parent().height();
        var pwidth = scrollContainer.parent().width();
        var height = scrollContainer.height();
        var width = scrollContainer.width();
        alert([left,top - (height - pheight)  ,left + width,top  ]);

        scrollContainer.draggable({axis:"y",containment : [left,top - (height - pheight)  ,left + width,top  ]});//axis:"y",,containment:defineRectangleForScrolling(scrollContainer)


    } else {
        scrollContainer.attr("src","./Pictures/iphoneLayer/transparentScrollContainer.png");
        scrollContainer.css("top","0px");
        scrollContainer.css("left","0px");
        $("#phoneLayer").css("pointer-events","none")
    }
}

