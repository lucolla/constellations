/**
 * Created by chu on 6/14/2014.
 */



function constellationPressed(constName){

    //alert(constName);
    if(illustrationsOn && constName != constInFocus){
        //$("#mapIllustrations").fadeTo(100,0);
        $(".transConstellations").not("#"+constName).fadeTo(100,constellationDimOpacity);
        $("#"+constName).fadeTo(400,constellationPressedOpacity);

        $(".constTitles").not("#"+constName+'-title').fadeTo(100,constellationDimOpacity);
        $("#"+constName+'-title').fadeTo(400,constellationPressedOpacity);

        constInFocus = constName;
        toggleInfoButton();
    //$("#mapIllustrations").fadeTo(400,0).delay(600).fadeTo(400,1);
   // $(".transConstellations").not("#"+constName).fadeTo(400,0).delay(600).fadeTo(400,1);

    }


    //$("#"+constName).css("opacity","1");

}
/*
function addTransparentConstellation(constName,xLeft,yTop,filePath,filename){ //width,height,
$("#mapConstellationsContainer").append('<img id="'+constName+'" class="transConstellations" src="'+filePath+filename+'" style="position:absolute; top:'+yTop+'px; left:'+xLeft+'px; "/>');// width:'+width+'px; height:'+height+'px
}
*/
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

function toggleLeftButtons(state){
    if (leftButtonsOpen || state == 'close') {
        $("#menuLeftButtonSecond").css("top", "24px");
        $("#menuLeftButtonThird").css("top", "24px");
    }else{
        $("#menuLeftButtonSecond").css("top", "105px");
        $("#menuLeftButtonThird").css("top", "186px");
    }
    leftButtonsOpen = !leftButtonsOpen;
}

function menuButtonPressedDown(pressedButton){
    switch (ContextMenu){
        case 'stars':
            switch (pressedButton){
                case 'starsButton':
                    toggleLeftButtons();
                    /*
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
                     */
                    break;
                case 'illustrationsButton':
                    if(illustrationsOn){
                        //$("#mapIllustrations").css("opacity","0");
                        $(".transConstellations").css("opacity","0");
                        if (!linesOn) $(".constTitles").css("opacity","0");
                    }else{
                        //$("#mapIllustrations").css("opacity","1");
                        $(".transConstellations").css( "opacity",constellationDefaultOpacity.toString() );
                        $(".constTitles").css( "opacity",constellationDefaultOpacity.toString() );
                    }
                    illustrationsOn=!illustrationsOn;
                    break;
                case 'linesButton':
                    if(linesOn){
                        $("#mapLines").css("opacity","0");
                        if (!illustrationsOn) $(".constTitles").css("opacity","0");
                    }else{
                        $("#mapLines").css("opacity","1");
                        $(".constTitles").css("opacity",constellationDefaultOpacity.toString());
                    }
                    linesOn=!linesOn;
                    break;
            }
            break;
        case 'scroll':
            switch (pressedButton){
                case 'starsButton':
                    ContextMenu = 'stars';
                    //alert('scroll stae');
                    scrollModeOn = !scrollModeOn;
                    scrollContainer.draggable("disable");
                    $("#scroll1").css("opacity","0");
                    $("#scroll2").css("opacity","0");
                    //scrollContainer.attr("src","./Pictures/IphoneLayer2/iphoneContentTransperent.png");
                    //scrollContainer.css("top","0px");
                    //scrollContainer.css("left","0px");
                    $("#phoneLayer").css("pointer-events","none");
                    $(".scrolls").css("pointer-events","none");
                    console.log('been in starsbutton case under scroll context');
                    break;
                case 'scrollMenu':
                    $("#scroll2").attr("src",'./Pictures/Screens/tableOfContentStories.jpg').css("opacity","1");
                    $("#scroll1").css("opacity","0");



                    //scrollContainer.css("top","0px");
                    //scrollContainer.css("left","0px");
                    var scrollOffset = scrollContainer.offset();
                    var scrollTop = scrollOffset.top;
                    var scrollLeft = scrollOffset.left;
                    var parentHeight = scrollContainer.parent().height();
                    //scrollContainer.draggable("option",{containment : [scrollLeft,scrollTop - (scrollHeight*2 - parentHeight)  ,scrollLeft + scrollWidth,scrollTop  ]});
                    break;

            }

            break;
        case 'stories':
            alert('stories stae');
            break;
    }
}

function toggleInfoButton(action){
    var infoButtonObj = $("#menuInfoButton");
    if (infoButtonOn || action == 'off'|| !iphoneOn ){
        infoButtonObj.css("visibility", "hidden");
        infoButtonObj.css("pointer-events", "none");
        infoButtonOn = false;
    }else {
        infoButtonObj.css("visibility", "visible");
        infoButtonObj.css("pointer-events", "auto");
        infoButtonOn = true;
    }

}


function toggleTaurusScroll(){
    console.log('toggle scroll: '+constInFocus);
    if( !scrollModeOn ) {
        // Makes Info Button disapear
        toggleInfoButton();
        toggleLeftButtons('close');
        ContextMenu = 'scroll';
        scrollModeOn = true;
        $("#phoneLayer").css("pointer-events","auto");
        $(".scrolls").css("pointer-events","auto");
        scrollContainer.draggable("enable");
        console.log('scrollcontainer draggable enabled');
        $("#scroll1").attr("src",scrollsinfo[constInFocus] || scrollsinfo['none']).css("opacity","1");
        constInFocus = 'none';
        //scrollContainer.attr("width","387px");//400px
        //scrollContainer.attr("height","1334px");
        //scrollContainer.css("top","0px");
        //scrollContainer.css("left","0px");
        //scrollContainer.attr("height","621px");
        //$("#iphoneContent").css("overflow","hidden");//"auto"


        var scrollOffset = scrollContainer.offset();
        var scrollTop = scrollOffset.top;
        var scrollLeft = scrollOffset.left;
        var parentHeight = scrollContainer.parent().height();

        //alert([scrollLeft,scrollTop - (scrollHeight*2 - parentHeight)  ,scrollLeft + scrollWidth,scrollTop ,parentHeight,scrollHeight ]);
        // Multiplied by 2, not sure why but it does the trick?
        //scrollContainer.draggable("option",{containment : [scrollLeft,scrollTop - (scrollHeight*2 - parentHeight)  ,scrollLeft + scrollWidth,scrollTop  ]});
        //containment = [   upper limit on the upper part the upper part ]
       // scrollContainer.draggable({axis:"y",containment : [left,top - (height - pheight)  ,left + width,top  ]});//axis:"y",,containment:defineRectangleForScrolling(scrollContainer)


    }
}

function toggleIPhoneFrame(){

    if (iphoneOn){
    $("#frameLayer").addClass('invisible');
    $("#phoneLayer").addClass('invisible');
    $("#beginningScreen").addClass('invisible');

    }else{
    $("#frameLayer").removeClass('invisible');
    $("#phoneLayer").removeClass('invisible');
    $("#beginningScreen").removeClass('invisible');
    beginning = true;
    }
    iphoneOn =!iphoneOn;
}

function clearBeginningScreen(){
    $("#beginningScreen").addClass('invisible');
    beginning =false;
}