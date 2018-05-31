var extendDeep = AFRAME.utils.extendDeep;

let onload = function() {
    var numListeners = 0;


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

            this.el.addEventListener('click', function(evt) {
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

$(document).ready(onload);