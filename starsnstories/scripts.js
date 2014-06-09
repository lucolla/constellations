/**
 * Created by pi on 19/05/14.
 */



var buttonTwo = document.getElementById("buttonTwo");

alert(buttonTwo);

var handleClick = function (event) {
    alert("changing colors");
};

buttonTwo.addEventListener('click', handleClick);


var name = 'starsNstories';
var age = 2;
name = 'Something';
alert("Hello, world! "+name);

if (name == 'Something') {
    alert("Hello once again");
}

people= ['dssd','fdsfsd','sdfsdfds'];

function helloFrom(name){
    return 'Hello from '+name;
}
/*
for (var i=0; i < people.length; i++) {
    var greeting = helloFrom(people[i]);
    alert(greeting);
}
*/


/*
$('.btn').click(
    function(){
        alert("hi");
    }
);

$('p.intro').css('background', 'red').height(100);
*/
alert("been there done that");