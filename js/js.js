var extendDeep = AFRAME.utils.extendDeep;

let onload = function() {
    var numListeners = 0;

    makeBox(0,0,0.01);
    // The mesh mixin provides common material properties for creating mesh-based primitives.
    // This makes the material component a default component and maps all the base material properties.
    var meshMixin = AFRAME.primitives.getMeshMixin();

    AFRAME.registerComponent('log-cursor-listener', {
        init: function() {
            var isMoused = false;
            var isMoved = false;

            element = this.el;
            element.setAttribute("id", "C-listener-" + numListeners);

            function move() {
                if (!isMoved) {
                    element.emit("move");
                    isMoved = true;
                } else {

                    element.emit("return");
                    isMoved = false;
                }
            }

            element.addEventListener('click', function(evt) {
                if (!isMoved) {
                    move();
                }
            });

            element.addEventListener('mouseleave', function(evt) {
                isMoused = false;
                if (isMoved == true) {
                    setTimeout(function() {
                        if (isMoved == true && isMoused == false) {
                            move();
                        }
                    }, 1000);
                }
            });
            element.addEventListener('mouseenter', function(evt) {
                isMoused = true;
                console.log("mouseenter");
            });
        }
    });
}


var generateGrid = function(boxSize,boxSpacing){

}

var makeBox = function(x,y,siz){
	var z = 0;
	var moveDist = siz*2.5;
	var moveSpeed = 1200;

	var marker = document.getElementById("marker");
	var a_box =  document.createElement("a-box");
	var anim_move = document.createElement("a-animation");
	var anim_return;

	var scaleString = ""+siz+" "+siz+" "+siz;
	var posString = ""+x+" "+y+" "+z;
	console.log(typeof scaleString);
	console.log(scaleString);

	
    //TODO: not setting these attribs for some reason    
	a_box.setAttribute("scale", scaleString+"");
	a_box.setAttribute("position", posString+"");

	a_box.setAttribute("class","C-listener");
    a_box.setAttribute("log-cursor-listener","");

	anim_move.setAttribute("easing","ease-in");
	anim_move.setAttribute("attribute","position");
	anim_move.setAttribute("dur",""+moveSpeed);

	anim_return = anim_move.cloneNode();

	anim_move.setAttribute("begin", "move");
	anim_return.setAttribute("begin", "return");
	anim_move.setAttribute("class", "anim-move");
	anim_return.setAttribute("class", "anim-return");

	a_box.appendChild(anim_move);
	a_box.appendChild(anim_return);

	console.log(a_box);
}


$(document).ready(onload);