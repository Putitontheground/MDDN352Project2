var extendDeep = AFRAME.utils.extendDeep;

let onload = function() {
// var marker = document.getElementById("marker");
// let boxSize = 0.1;
// let spacing = 0.02;
// for(let x = 1; x<=4;x++){
//     for(let y = 1; y<=4;y++){
//     var name = "box_"+x+"-"+y;
//     regBox(name);
//     let xpos = (x-2)*(boxSize+spacing);
//     let ypos = (y-2)*(boxSize+spacing);
//     marker.appendChild(makeBox(xpos,ypos,boxSize,name));
// }}
    regBox();
    // The mesh mixin provides common material properties for creating mesh-based primitives.
    // This makes the material component a default component and maps all the base material properties.
    var meshMixin = AFRAME.primitives.getMeshMixin();


}

var regBox= function(){
    AFRAME.registerComponent("anim-listener", {
        init: function() { 
            this.mouseleaveTimeout = 250; 
            this.isMoused = false;
            this.isMoved = false;
            this.name = this.id; 
            this.el.parent = this;


            this.move = function(t) {
                if (!t.isMoved) {
                    t.el.emit("move-"+t.name);
                    console.log("move-"+t.name);
                    t.isMoved = true;
                } else {

                    t.el.emit("return-"+t.name);
                    t.isMoved = false;
                    console.log("return-"+t.name);
                }
            }

            this.el.addEventListener('click', function(evt) {
                console.log("click");
                if (!this.parent.isMoved) {
                    this.parent.move(this.parent);
                }
            });

            this.el.addEventListener('mouseleave', function(evt) {
                parent = this.parent;   

                parent.isMoused = false;
                if (parent.isMoved == true) {
                    setTimeout(function() {
                        if (parent.isMoved == true && parent.isMoused == false) {
                            parent.move(parent);
                        }
                    }, this.mouseleaveTimeout);
                }
            });
            this.el.addEventListener('mouseenter', function(evt) {
                this.parent.isMoused = true;
                console.log("mouseenter");
            });
        }
    });
}
var makeBox = function(x,y,siz, name){
	var z = y;
    y=0;
	var moveDist = siz*2.5;
	var moveSpeed = 700;

    var scaleString = ""+siz+" "+siz+" "+siz;
    var startPos = ""+x+" "+y+" "+z;
    var endPos = ""+x+" "+y+moveDist+" "+z;
    
	var a_box =  document.createElement("a-entity");
    a_box.setAttribute("id",name);
    a_box.setAttribute("geometry","primitive:box");

	var anim_move = document.createElement("a-animation");


	a_box.setAttribute("scale", scaleString+"");
	a_box.setAttribute("position", startPos+"");

	a_box.setAttribute("class","C-listener");
    a_box.setAttribute(name,"");

	anim_move.setAttribute("easing","ease-out-elastic");
	anim_move.setAttribute("attribute","position");
	anim_move.setAttribute("dur",""+moveSpeed);

	var anim_return = anim_move.cloneNode();

	anim_move.setAttribute("begin", "move-"+name);
    anim_move.setAttribute("from",startPos);
    anim_move.setAttribute("to",endPos);
    anim_move.setAttribute("class", "anim-move");

	anim_return.setAttribute("begin", "return-"+name);
    anim_return.setAttribute("from",endPos);
    anim_return.setAttribute("to",startPos);
	anim_return.setAttribute("class", "anim-return");

	a_box.appendChild(anim_move);
	a_box.appendChild(anim_return);

    return a_box;

}

var addText = function(text){
    var Tentity = document.createElement("a-entity");

}


//$(document).ready(onload);