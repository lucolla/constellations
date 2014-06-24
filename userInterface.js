/**
 * Created by chu on 6/14/2014.
 */



function constellationPressed(constName){

    //alert(constName);
    console.log('constellationPressed:'+constName);
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
                        $("#menuLeftButtonThird").attr("src","./Pictures/newiconsthreestates/drawings_icon.png");
                        $(".constTitles").css("opacity","0");
                    }else{
                        //$("#mapIllustrations").css("opacity","1");
                        $(".transConstellations").css( "opacity",constellationDefaultOpacity.toString() );
                        $(".constTitles").css( "opacity",constellationDefaultOpacity.toString() );
                        $("#menuLeftButtonThird").attr("src","./Pictures/newiconsthreestates/drawings_inverse.png");

                    }
                    illustrationsOn=!illustrationsOn;
                    break;
                case 'linesButton':
                    if(linesOn){
                        $("#mapLines").css("opacity","0");
                        $("#menuLeftButtonSecond").attr("src","./Pictures/newiconsthreestates/const_icon.png");
                        //if (!illustrationsOn) $(".constTitles").css("opacity","0");
                    }else{
                        $("#mapLines").css("opacity","1");
                        $("#menuLeftButtonSecond").attr("src","./Pictures/newiconsthreestates/const_inverse.png");
                        //$(".constTitles").css("opacity",constellationDefaultOpacity.toString());
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
                    scrollModeOn = false;
                    scrollContainer.draggable("disable");

                    $("#scroll1").css("opacity","0");
                    $("#scroll2").css("opacity","0");
                    scrollContainer.css({top:0,left:0});

                    $(".transConstellations").fadeTo(200,constellationDefaultOpacity);
                    $('.constTitles').fadeTo(200,constellationDefaultOpacity);

                    //scrollContainer.attr("src","./Pictures/IphoneLayer2/iphoneContentTransperent.png");
                    //scrollContainer.css("top","0px");
                    //scrollContainer.css("left","0px");
                    $("#phoneLayer").css("pointer-events","none");
                    $(".scrolls").css("pointer-events","none");
                    console.log('been in starsbutton case under scroll context');
                    break;
                case 'scrollMenu':
                    scrollContainer.css({top:0,left:0});
                    $("#scroll2").attr("src",scrollsinfo['scrollsMenu'][0]).css("opacity","1");
                    $("#scroll1").css("opacity","0");



                    //scrollContainer.css("top","0px");
                    //scrollContainer.css("left","0px");
                    var scrollHeight = scrollsinfo['scrollsMenu'][1];
                    var scrollOffset = scrollContainer.offset();
                    var scrollTop = scrollOffset.top;
                    var scrollLeft = scrollOffset.left;
                    var scrollWidth = 387;
                    var parentHeight = scrollContainer.parent().height();
                    var rect = [scrollLeft,scrollTop -(scrollHeight-parentHeight)  ,scrollLeft + scrollWidth,scrollTop ]; //[scrollLeft,(scrollTop + parentHeight - scrollHeight ) ,scrollLeft + scrollWidth,scrollTop+Math.round(parentHeight/2)  ];
                    scrollContainer.draggable("option","containment",rect );
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


function translateConstLoc(const1){
    var const2 = 2;
    return const1;
}

function restoreAnimatedImg(){
    animaConstImg.css("opacity","0");

}


function toggleTaurusScroll(){
    console.log('toggle scroll: '+constInFocus);
    if( scrollModeOn == false ) {
        // Makes Info Button disapear
        toggleInfoButton();
        toggleLeftButtons('close');
        //$("#taurus").addClass("animatedConst");
        if (typeof(scrollsinfo[constInFocus]) == "undefined") constInFocus = 'taurus';

        var ConstObj = $("#" + constInFocus);

        //mapLocX = $("#map_canvas").css("left");
        //mapLocY = $("#map_canvas").css("top");

        constLocY = ConstObj.offset().top;
        constLocX = ConstObj.offset().left;
        animaConstImg.attr("src",animationConstellationsJson[constInFocus].src);
        animaConstImg.css("top",constLocY);
        animaConstImg.css("left",constLocX);
        animaConstImg.css("opacity","1");
        ConstObj.css("opacity","0");


        $(".transConstellations").not("#" + constInFocus).fadeTo(100, 0);
        //ConstObj.fadeTo(400, 1);
        $(".constTitles").not("#" + constInFocus + '-title').fadeTo(100, 0);

        console.log('animaConst loc: left:'+constLocX+' top: '+constLocY);

        createConstAnimation('.animateMe');
        var temp =['.animateMe',constInFocus,//startWidth,startHeight,
            animationConstellationsJson[constInFocus].endWidth,animationConstellationsJson[constInFocus].endHeight,
            animationConstellationsJson[constInFocus].endLocationX,animationConstellationsJson[constInFocus].endLocationY].join();
        console.log(temp);
        createConstAnimation('.animateMe',constInFocus,//startWidth,startHeight,
            animationConstellationsJson[constInFocus].endWidth,animationConstellationsJson[constInFocus].endHeight,
            animationConstellationsJson[constInFocus].endLocationX,animationConstellationsJson[constInFocus].endLocationY);

        timeouID = window.setTimeout(restoreAnimatedImg,animationDuration+200);//
        ConstObj.css("z-index", "44");

        console.log('dimming enviroment');
        //$("#"+constName+'-title').fadeTo(400,constellationPressedOpacity);


        ContextMenu = 'scroll';
        scrollModeOn = true;
        $("#phoneLayer").css("pointer-events","auto");
        $(".scrolls").css("pointer-events","auto");
        scrollContainer.draggable("enable");
        console.log('scrollcontainer draggable enabled');

        $("#scroll1").attr("src",scrollsinfo[constInFocus][0]).css("opacity","1").delay(300); //

        //if (constInFocus=='taurus') $("#taurus").resetKeyframe(function(){});

        //scrollContainer.attr("width","387px");//400px
        //scrollContainer.attr("height","1334px");
        //scrollContainer.css("top","0px");
        //scrollContainer.css("left","0px");
        //scrollContainer.attr("height","621px");
        //$("#iphoneContent").css("overflow","hidden");//"auto"

        //var scrollHeight = $("#scroll1").css("height");
        //var scrollHeight = $("#scroll1").height();
        var scrollHeight = scrollsinfo[constInFocus][1];
        var scrollWidth = 387;
        console.log('Opening scroll, scroll height: '+scrollHeight.toString());
        var scrollOffset = scrollContainer.offset();
        var scrollTop = scrollOffset.top;
        var scrollLeft = scrollOffset.left;
        var parentHeight = scrollContainer.parent().height();

        //alert([scrollLeft,scrollTop - (scrollHeight*2 - parentHeight)  ,scrollLeft + scrollWidth,scrollTop ,parentHeight,scrollHeight ]);
        // Multiplied by 2, not sure why but it does the trick?
        //scrollContainer.draggable("option","containment","parent");

        var rect = [scrollLeft,scrollTop -(scrollHeight-parentHeight)  ,scrollLeft + scrollWidth,scrollTop ]; //[scrollLeft,(scrollTop + parentHeight - scrollHeight ) ,scrollLeft + scrollWidth,scrollTop+Math.round(parentHeight/2)  ];

        console.log([scrollHeight,scrollWidth,scrollOffset,parentHeight,constInFocus].join());
        console.log(parentHeight);
        console.log(rect.join());
        //scrollContainer.draggable("option",{containment : [scrollLeft,scrollTop -(scrollHeight - 681),scrollLeft + scrollWidth,scrollTop  ]});
        scrollContainer.draggable("option","containment",rect );
        //containment = [   upper limit on the upper part the upper part ]
        //scrollContainer.draggable({axis:"y",containment : [left,top - (height - pheight)  ,left + width,top  ]});//axis:"y",,containment:defineRectangleForScrolling(scrollContainer)
        constInFocus = 'none';


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