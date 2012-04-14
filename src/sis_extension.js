/*
 * name: sis_extension.js
 *
 * description: This javascript file is responsible for 
 *				making requests to retrieve the various other
 *				files required, such as the CSS files.
 *
 * author: Thomas DeMeo
 *			thomasdemeo@gmail.com
 */

/*  var $ = jQuery; // shortcut  */

var $ = document;

// Adds support for jQuery
// a function that loads jQuery and calls a callback function when jQuery has finished loading
function addJQuery(callback) {
    
    var jQueryId = "jQuery";  // you could encode the css path itself to generate id..
	if (!$.getElementById(jQueryId)) {
	    var head  = $.getElementsByTagName('head')[0];
	    var link  = $.createElement('script');
	    link.id   = jQueryId;
	    link.language  = 'JavaScript';
	    link.type = 'text/javascript';
	    link.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js';
	    head.appendChild(link);
	}
    
}

function addCSS() {
	var mainCSSId = "mainCSS";  // you could encode the css path itself to generate id..
	if (!$.getElementById(mainCSSId)) {
	    var head  = $.getElementsByTagName('head')[0];
	    var link  = $.createElement('link');
	    link.id   = mainCSSId;
	    link.rel  = 'stylesheet';
	    link.type = 'text/css';
	    link.href = 'https://people.rit.edu/~tjd9961/SIS/src/css/sis_main.css';
	    link.media = 'all';
	    head.appendChild(link);
	}
}

function addJavascript() {
	var mainJavascript = "mainJavascript";  // you could encode the css path itself to generate id..
	if (!$.getElementById(mainJavascript)) {
	    var head  = $.getElementsByTagName('head')[0];
	    var link  = $.createElement('script');
	    link.id   = mainJavascript;
	    link.language  = 'JavaScript';
	    link.type = 'text/javascript';
	    link.src = 'https://people.rit.edu/~tjd9961/SIS/src/js/main.js';
	    head.appendChild(link);
	}

}

// load jQuery, css and javascript and execute the callback function
addJQuery();
addCSS();
addJavascript();