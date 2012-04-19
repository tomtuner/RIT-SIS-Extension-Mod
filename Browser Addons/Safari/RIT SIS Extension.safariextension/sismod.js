// @name               RIT SIS Modifications
// @description        Adds enhancements to the RIT SIS system such as an RIT color theme.
// @namespace          demeo.rit.sisextension
// @author             Thomas DeMeo
// @author             Dan Fenton

// @version            1.0

function loadExtensionScript(callback) {
    var script = document.createElement("script");
    var head  = document.getElementsByTagName('head')[0];

    script.setAttribute("src", "https://people.rit.edu/~tjd9961/SIS/src/sis_extension.js");
    script.addEventListener('load', function () {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    head.appendChild(script);
}

// Used as a callback after the extension is loaded
function mainCallback() {

}

loadExtensionScript(mainCallback);
