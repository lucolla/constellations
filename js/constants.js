/**
 * Created by chu on 6/20/2014.
 */

    // Initialize the bool that holds the state of the base maps and contextMenu
    //==========================================================================
var scrollModeOn,scrollHeight,scrollWidth;
var
ContextMenu = 'stars' , //['stars','scroll','stories']
starsOn = false,
linesOn = false,
illustrationsOn = false,
leftButtonsOpen = false,
infoButtonOn = false,
zoomingIn = false,
constInFocus = 'none',
maxZoom = 1,
minZoom = 0.4,
currentZoom = 1
    ;

var mapBox ;//left,top,right,bottom;

var buttonImages ={
    'menuLeftButtonThird':{
        'onImage':'stars_inverse',
        'offImage':'stars_icon',
        'onImagePressed':'stars_inverse_pressed',
        'offImagePressed':'stars_icon_pressed'},
    menuLeftButtonSecond:{
        'onImage':'null',
        'offImage':'null',
        'onImagePressed':'null','offImagePressed':'null'},
    menuLeftButtonFirst:{
        'onImage':'null',
        'offImage':'null',
        'onImagePressed':'null','offImagePressed':'null'},
    menuMiddleButton:{
        'onImage':'null',
        'offImage':'null',
        'onImagePressed':'null','offImagePressed':'null'},
    menuRightButton:{
        'onImage':'null',
        'offImage':'null',
        'onImagePressed':'null','offImagePressed':'null'},
    menuInfoButton:{
        'onImage':'null',
        'offImage':'null',
        'onImagePressed':'null','offImagePressed':'null'}
};
