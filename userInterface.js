/**
 * Created by chu on 6/14/2014.
 */



function constellationPressed(constName){

    //alert(constName);
    if(illustrationsOn && constName != constInFocus){
        //$("#mapIllustrations").fadeTo(100,0);
        $(".transConstellations").not("#"+constName).fadeTo(100,constellationDimOpacity);
        $("#"+constName).fadeTo(400,constellationPressedOpacity);
        constInFocus = constName;
        toggleInfoButton();
    //$("#mapIllustrations").fadeTo(400,0).delay(600).fadeTo(400,1);
   // $(".transConstellations").not("#"+constName).fadeTo(400,0).delay(600).fadeTo(400,1);

    }


    //$("#"+constName).css("opacity","1");

}

function addTransparentConstellation(constName,xLeft,yTop,filePath,filename){ //width,height,
$("#mapConstellationsContainer").append('<img id="'+constName+'" class="transConstellations" src="'+filePath+filename+'" style="position:absolute; top:'+yTop+'px; left:'+xLeft+'px; "/>');// width:'+width+'px; height:'+height+'px
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

                        $("#menuLeftButtonSecond").css("top","24px");
                        $("#menuLeftButtonThird").css("top","24px");
                    }else {
                        leftButtonsOpen = !leftButtonsOpen;
                        $("#menuLeftButtonSecond").css("top", "105px");
                        $("#menuLeftButtonThird").css("top", "186px");
                    }
                    break;
                case 'illustrationsButton':
                    if(illustrationsOn){
                        //$("#mapIllustrations").css("opacity","0");
                        $(".transConstellations").css("opacity","0");
                    }else{
                        //$("#mapIllustrations").css("opacity","1");
                        $(".transConstellations").css( "opacity",constellationDefaultOpacity.toString() );
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
    console.log('toggle scroll: '+constInFocus);
    if( !scrollModeOn ) {
        scrollModeOn = !scrollModeOn;
        scrollContainer.draggable("enable");
        scrollContainer.attr("src",scrollsinfo[constInFocus] || scrollsinfo['none'] );
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
        //containment = [   upper limit on the upper part the upper part ]
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
