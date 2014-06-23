/**
 * Created by chu on 6/23/2014.
 */

function createConstAnimation(selector){

    $.keyframe.define([{
        name: 'constAnimation',
        '0%': {
            'width': '957px',
            'height': '756px',
            'x':'2844px',
            'y':'2184px'

        },
        //'30%': {'height': '10px'},
        //'60%': {'height': '30px'},
        '100%': {
            'width': '339px',
            'height': '268px',
            'x':'1500px',
            'y':'1500px'
        }
    }]);


$(selector).playKeyframe({
    name: 'constAnimation', // name of the keyframe you want to bind to the selected element
    duration: 3000, // [optional, default: 0, in ms] how long you want it to last in milliseconds
    timingFunction: 'linear', // [optional, default: ease] specifies the speed curve of the animation
    delay: 0, //[optional, default: 0, in ms]  how long you want to wait before the animation starts in milliseconds, default value is 0
    repeat: 'infinite', //[optional, default:1]  how many times you want the animation to repeat, default value is 1
    direction: 'alternate', //[optional, default: 'normal']  which direction you want the frames to flow, default value is normal
    fillMode: 'forwards', //[optional, default: 'forward']  how to apply the styles outside the animation time, default value is forwards
    complete: function(){} //[optional]  Function fired after the animation is complete. If repeat is infinite, the function will be fired every time the animation is restarted.
});

}