/**
 * Created by chu on 6/14/2014.
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
};


//$(".selector").draggable("enable");
//$(".selector").draggable({axis:"y" }); //; appendTo:scrollContainer

function defineRectangleForScrolling(obj){
// alert("hi"+obj.css("width"));

    var offset = obj.offset();
    var top = offset.top;
    var left = offset.left;
    var pheight = obj.parrent().height();
    var pwidth = obj.parrent().width();
    var height = obj.height();
    var width = obj.width();


    //alert( [left,top - (height - pheight)  ,left + width,top + pheight ]);
    //return [left,top - (height - pheight) ,left + width,top + pheight ];
    //return [left,top - (height - pheight)  ,left + width,top + pheight ];
    return [200,400,200,1080];

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
        scrollContainer.draggable({axis:"y",containment : [200,-500,6000,200]});//axis:"y",,containment:defineRectangleForScrolling(scrollContainer)


    } else {
        scrollContainer.attr("src","./Pictures/iphoneLayer/transparentScrollContainer.png");

        scrollContainer.css("top","0px");
        scrollContainer.css("left","0px");
        $("#phoneLayer").css("pointer-events","none")
    }
}

